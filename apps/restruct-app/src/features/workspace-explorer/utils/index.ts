import { createDefaultWorkspace, IWorkspaceSnapshot } from "@structurizr/dsl";
import { Workspace, WorkspaceInfo, IWorkspaceInfo } from "@structurizr/y-workspace";
import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import { v4 } from "uuid";
import { WorkspaceApi } from "../services";

export const getGroupInfo = (workspaces: IWorkspaceInfo[], name?: string) => {
    const sorted = workspaces.sort((left, right) => {
        const leftTime = new Date(right.lastModifiedDate).getTime();
        const rightTime = new Date(left.lastModifiedDate).getTime();
        return leftTime - rightTime;
    });

    return {
        name: name ?? sorted.at(0)?.group,
        lastModifiedDate: sorted.at(0)?.lastModifiedDate,
        lastModifiedBy: sorted.at(0)?.lastModifiedBy,
        workspaces: sorted
    };
}

export const groupWorkspaces = (workspaces: IWorkspaceInfo[]) => {
    const groups = Array.from(workspaces.reduce((groups, workspace) => {
        groups.has(workspace.group)
            ? groups.get(workspace.group)?.push(workspace)
            : groups.set(workspace.group, [workspace]);
        return groups;
    }, new Map<string, IWorkspaceInfo[]>()));

    return groups
        .map(([name, workspaces]) => getGroupInfo(workspaces, name))
        .filter(group => group.name !== undefined);
}

export const withTimeout = <T>(promise: Promise<T>, timeout: number): Promise<T> => {
    const delay = new Promise(resolve => setTimeout(resolve, timeout));
    return Promise.all([promise, delay]).then(([result]) => result);
}

export const createExplorerDocument = (): [Y.Doc] => {
    const explorerDocument = new Y.Doc();
    return [explorerDocument];
}

export const createExplorerPersistance = (document: Y.Doc): [IndexeddbPersistence] => {
    const explorerPersistanceId = "workspaces";
    const explorerPersistance = new IndexeddbPersistence(explorerPersistanceId, document);
    return [explorerPersistance];
}

export const createWorkspaceDocument = (workspaceId: string): [Y.Doc] => {
    // intialize empty workspace from the persisted document
    const workspaceDocument = new Y.Doc({ guid: workspaceId });
    return [workspaceDocument];
}

export const createWorkspacePersistance = (workspaceId: string, document: Y.Doc): [IndexeddbPersistence] => {
    const workspacePersistanceId = `workspace-${workspaceId}`;
    const workspacePersistance = new IndexeddbPersistence(workspacePersistanceId, document);
    return [workspacePersistance];
}

export const createWorkspaceConnection = (workspaceId: string, document: Y.Doc): [WebrtcProvider] => {
    const signaling = { signaling: [ "wss://restruct-webrtc-signaling-7452bb784b0b.herokuapp.com" ] };
    const workspaceConnection = new WebrtcProvider(workspaceId, document, signaling);
    return [workspaceConnection];
}

export const getWorkspaces = (explorerDocument: Y.Doc) => {
    const workspacesMap = explorerDocument.getMap<Y.Map<unknown>>("workspaces");
    
    const workspaces = Array
        .from<Y.Map<unknown>>(workspacesMap.values())
        .map(workspaceInfoMap => new WorkspaceInfo(workspaceInfoMap));

    return workspaces;
}

export const create = async (explorerDocument: Y.Doc, author: string, workspaceSnapshot?: IWorkspaceSnapshot) => {
    const workspacesMap = explorerDocument.getMap("workspaces");
    const workspaceId = v4();
    
    // initialize empty workspace document and set up persistance
    const [ workspaceDocument ] = createWorkspaceDocument(workspaceId);
    const [ workspacePersistance ] = createWorkspacePersistance(workspaceId, workspaceDocument);

    await workspacePersistance.whenSynced;
    
    // initialize workspace document with values from the snapshot
    const workspace = new Workspace(workspaceDocument);
    workspace.fromSnapshot(workspaceSnapshot ?? createDefaultWorkspace());

    // add workspace documents to the root document
    const workspaceInfoMap = new Y.Map([["workspaceId", workspaceId]]);
    const workspaceInfo = new WorkspaceInfo(workspaceInfoMap);
    workspaceInfo.name = workspaceSnapshot?.name ?? "New Workspace";
    workspaceInfo.status = "private";
    
    // add workspace content to the 'workspaces' collection
    workspacesMap.set(workspaceId, workspaceInfoMap);
    workspacePersistance.destroy();

    return workspaceInfo;
}

export const remove = async (explorerDocument: Y.Doc, workspaceId: string) => {
    const workspacesMap = explorerDocument.getMap("workspaces");

    // initialize empty workspace document and set up persistance
    const [ workspaceDocument ] = createWorkspaceDocument(workspaceId);
    const [ workspacePersistance ] = createWorkspacePersistance(workspaceId, workspaceDocument);

    // remove workspace content from the 'workspaces' collection
    // remove workspace document from the persistance
    await workspacePersistance.whenSynced
    workspacesMap.delete(workspaceId);
    workspacePersistance.clearData();

    return workspaceId;
}

export const rename = async (explorerDocument: Y.Doc, workspaceId: string, name: string) => {
    const workspacesMap = explorerDocument.getMap("workspaces");

    const [ workspaceDocument ] = createWorkspaceDocument(workspaceId);
    const [ workspacePersistance ] = createWorkspacePersistance(workspaceId, workspaceDocument);

    await workspacePersistance.whenSynced;
    
    // rename workspace in the file
    const workspace = new Workspace(workspaceDocument);
    workspace.name = name;

    // rename worksapce info from the 'workspaces' collection
    const workspaceInfoMap = workspacesMap.get(workspaceId) as Y.Map<unknown>;
    const workspaceInfo = new WorkspaceInfo(workspaceInfoMap);
    workspaceInfo.name = name;

    workspacePersistance.destroy();
    
    return workspaceInfo;
}

export const clone = async (explorerDocument: Y.Doc, author: string, workspaceId: string) => {    
    const [ workspaceDocument ] = createWorkspaceDocument(workspaceId);
    const [ workspacePersistance ] = createWorkspacePersistance(workspaceId, workspaceDocument);

    await workspacePersistance.whenSynced;

    const workspace = new Workspace(workspaceDocument);
    workspacePersistance.destroy();
        
    const workspaceSnapshot = workspace.toSnapshot();
    const clonedWorksapceInfo = await create(explorerDocument, author, workspaceSnapshot);

    return clonedWorksapceInfo;
}

export const archive = (explorerDocument: Y.Doc, workspaceId: string) => {
    const workspacesMap = explorerDocument.getMap("workspaces");

    const workspaceInfoMap = workspacesMap.get(workspaceId) as Y.Map<unknown>;
    const workspaceInfo = new WorkspaceInfo(workspaceInfoMap);
    workspaceInfo.status = "archived";

    return workspaceInfo;
}

export const restore = (explorerDocument: Y.Doc, workspaceId: string) => {
    const workspacesMap = explorerDocument.getMap("workspaces");
    
    const workspaceInfoMap = workspacesMap.get(workspaceId) as Y.Map<unknown>;
    const workspaceInfo = new WorkspaceInfo(workspaceInfoMap);
    workspaceInfo.status = "private";

    return workspaceInfo;
}

export const stack = (explorerDocument: Y.Doc, stack: Array<IWorkspaceInfo>, groupName: string) => {
    const workspacesMap = explorerDocument.getMap("workspaces");

    return stack.forEach(workspace => {
        const workspaceInfoMap = workspacesMap.get(workspace.workspaceId) as Y.Map<unknown>;
        const workspaceInfo = new WorkspaceInfo(workspaceInfoMap);
        workspaceInfo.group = groupName;

        return workspaceInfo;
    });
}

export const unstack = (explorerDocument: Y.Doc, stack: Array<IWorkspaceInfo>) => {
    const workspacesMap = explorerDocument.getMap("workspaces");

    return stack.forEach(workspace => {
        const workspaceInfoMap = workspacesMap.get(workspace.workspaceId) as Y.Map<unknown>;
        const workspaceInfo = new WorkspaceInfo(workspaceInfoMap);
        workspaceInfo.group = undefined;

        return workspaceInfo;
    });
}

export const getBookmarked = (explorerDocument: Y.Doc) => {
    const workspacesMap = explorerDocument.getMap("bookmarked");
    return Array.from(workspacesMap.keys());
}

export const bookmark = (explorerDocument: Y.Doc, workspaceId: string) => {
    const workspacesMap = explorerDocument.getMap("bookmarked");
    workspacesMap.set(workspaceId, true);
}

export const unbookmark = (explorerDocument: Y.Doc, workspaceId: string) => {
    const workspacesMap = explorerDocument.getMap("bookmarked");
    workspacesMap.delete(workspaceId);
}

export const getLiked = (explorerDocument: Y.Doc) => {
    const workspacesMap = explorerDocument.getMap("liked");
    return Array.from(workspacesMap.keys());
}

export const like = (explorerDocument: Y.Doc, workspaceId: string) => {
    const workspacesMap = explorerDocument.getMap("liked");
    workspacesMap.set(workspaceId, true);
}

export const unlike = (explorerDocument: Y.Doc, workspaceId: string) => {
    const workspacesMap = explorerDocument.getMap("liked");
    workspacesMap.delete(workspaceId);
}

export const sync = (workspaceId: string, workspace: Workspace) => {
    const workspaceApi = new WorkspaceApi();
    const controller = new AbortController();

    // TODO: save content, save metadata
    // workspaceApi.saveWorkspaceContent(workspaceId, workspace)
    //     .then(workspace => {

    //     })
    //     .catch(error => {

    //     });
};

export const createCommentsPersistance = (commentsDocument: Y.Doc, workspaceId: string): [IndexeddbPersistence] => {
    // initialize workspace comments from the persisted document
    const commentsPersistanceId = `comments-${workspaceId}`;
    const commentsPersistance = new IndexeddbPersistence(commentsPersistanceId, commentsDocument);
    return [commentsPersistance];
}

export const createStructurizrPersistance = (structurizrDocument: Y.Doc, workspaceId: string): [IndexeddbPersistence] => {
    // initialize structurizr code from the persisted document
    const structurizrPersistanceId = `structurizr-${workspaceId}`;
    const structurizrPersistance = new IndexeddbPersistence(structurizrPersistanceId, structurizrDocument);
    return [structurizrPersistance];
}
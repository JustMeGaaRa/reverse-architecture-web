import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import { v4 } from "uuid";
import { Workspace, WorkspaceInfo } from "../types";
import { IWorkspaceSnapshot } from "../interfaces";

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

export const create = (explorerDocument: Y.Doc, workspaceContent?: string) => {
    const workspacesMap = explorerDocument.getMap("workspaces");
    const workspaceId = v4();
    
    // initialize empty workspace document and set up persistance
    const [ workspaceDocument ] = createWorkspaceDocument(workspaceId);
    const [ workspacePersistance ] = createWorkspacePersistance(workspaceId, workspaceDocument);

    const workspaceInfoPromise = workspacePersistance.whenSynced.then(persistance => {
        // initialize workspace document with values from the snapshot
        const workspaceSnapshot = workspaceContent
            ? parseStructurizr(workspaceContent)
            : emptyWorkspace();
        
        const workspace = new Workspace(workspaceDocument);
        workspace.fromSnapshot(workspaceSnapshot);

        // add workspace documents to the root document
        const workspaceInfoMap = new Y.Map([["workspaceId", workspaceId]]);
        const workspaceInfo = new WorkspaceInfo(workspaceInfoMap);
        
        // add workspace content to the 'workspaces' collection
        workspacesMap.set(workspaceId, workspaceInfoMap);
        persistance.destroy();

        return workspaceInfo;
    });

    return workspaceInfoPromise;
}

export const remove = (explorerDocument: Y.Doc, workspaceId: string) => {
    const workspacesMap = explorerDocument.getMap("workspaces");

    // initialize empty workspace document and set up persistance
    const [ workspaceDocument ] = createWorkspaceDocument(workspaceId);
    const [ workspacePersistance ] = createWorkspacePersistance(workspaceId, workspaceDocument);

    const workspaceInfoPromise = workspacePersistance.whenSynced.then(persistance => {
        // remove workspace content from the 'workspaces' collection
        workspacesMap.delete(workspaceId);
        
        // remove workspace document from the persistance
        persistance.clearData();
    });

    return workspaceInfoPromise;
}

export const sync = (workspaceId: string, workspace: Workspace) => {
    const workspaceApi = new WorkspaceApi();
    const controller = new AbortController();

    // TODO: save content, save metadata
    workspaceApi.saveWorkspaceContent(workspaceId, workspace)
        .then(workspace => {

        })
        .catch(error => {

        });
};

export class WorkspaceApi {
    public async saveWorkspaceContent(workspaceId: string, workspace: Workspace) {
        throw new Error("Not implemented");
    }
}

export const emptyWorkspace = (): IWorkspaceSnapshot => {
    return {
        version: 1,
        name: "Empty Workspace",
        description: "An empty workspace.",
        model: {
            people: [],
            softwareSystems: [],
            deploymentEnvironments: [],
            relationships: [],
            groups: []
        },
        views: {
            systemContexts: [],
            containers: [],
            components: [],
            deployments: [],
            configuration: {
                styles: {
                    elements: [],
                    relationships: []
                },
                themes: []
            },
        }
    }
}

export const parseStructurizr = (structurizr: string): IWorkspaceSnapshot => {
    throw new Error("Not implemented");
}

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
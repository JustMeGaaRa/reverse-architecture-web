import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { IWorkspaceInfo } from "@structurizr/y-workspace";
import { useYjsCollaborative } from "@yjs/react";
import { useContext, useCallback } from "react";
import { WorkspaceExplorerContext, WorkspaceSelectionContext } from "../contexts";
import * as Structurizr from "../utils";
import { getWorkspaces } from "../utils";

export interface IActionCallbacks {
    onSuccess?: (workspaceId: string) => void;
    onError?: (error: Error) => void;
}

export const useWorkspaceExplorer = () => {
    const { workspaces, setWorkspaces } = useContext(WorkspaceExplorerContext);
    const { setSelectedIds } = useContext(WorkspaceSelectionContext);
    const { document } = useYjsCollaborative();
    
    const create = useCallback((author: string, snapshot?: IWorkspaceSnapshot, callbacks?: IActionCallbacks) => {
        Structurizr
            .create(document, author, snapshot)
            .then(workspaceInfo => {;
                setWorkspaces(workspaces => [ ...workspaces, workspaceInfo ]);
                callbacks?.onSuccess?.(workspaceInfo.workspaceId);
            })
            .catch(error => {
                callbacks?.onError?.(error);
            });
    }, [document, setWorkspaces]);

    const rename = useCallback((workspaceId: string, name: string, callbacks?: IActionCallbacks) => {
        Structurizr
            .rename(document, workspaceId, name)
            .then(workspaceInfo => {;
                setWorkspaces(getWorkspaces(document));
                callbacks?.onSuccess?.(workspaceInfo.workspaceId);
            })
            .catch(error => {
                callbacks?.onError?.(error);
            });
    }, [document, setWorkspaces]);

    const clone = useCallback((author: string, workspaceId: string, callbacks?: IActionCallbacks) => {
        Structurizr
            .clone(document, author, workspaceId)
            .then(workspaceInfo => {;
                setWorkspaces(workspaces => [ ...workspaces, workspaceInfo ]);
                callbacks?.onSuccess?.(workspaceInfo.workspaceId);
            })
            .catch(error => {
                callbacks?.onError?.(error);
            });
    }, [document, setWorkspaces]);

    const archive = useCallback((workspace: IWorkspaceInfo, callbacks?: IActionCallbacks) => {
        Structurizr.archive(document, workspace.workspaceId)
        setSelectedIds([]);
        setWorkspaces(getWorkspaces(document));
    }, [document, setSelectedIds, setWorkspaces]);

    const restore = useCallback((workspace: IWorkspaceInfo, callbacks?: IActionCallbacks) => {
        Structurizr.restore(document, workspace.workspaceId)
        setSelectedIds([]);
        setWorkspaces(getWorkspaces(document));
    }, [document, setSelectedIds, setWorkspaces]);

    const remove = useCallback((workspace: IWorkspaceInfo, callbacks?: IActionCallbacks) => {
        Structurizr
            .remove(document, workspace.workspaceId)
            .then(workspaceId => {
                setSelectedIds([]);
                setWorkspaces(getWorkspaces(document));
                callbacks?.onSuccess?.(workspaceId);
            })
            .catch(error => {
                callbacks?.onError?.(error);
            });
    }, [document, setSelectedIds, setWorkspaces]);

    const removeMultiple = useCallback((workspaces: Array<IWorkspaceInfo>, callbacks?: IActionCallbacks) => {
        const deletePromises = workspaces.map(workspace => Structurizr
            .remove(document, workspace.workspaceId)
            .then(workspaceId => callbacks?.onSuccess?.(workspaceId))
            .catch(error => callbacks?.onError?.(error))
        );
        Promise.all(deletePromises).then(() => {
            setSelectedIds([]);
            setWorkspaces(getWorkspaces(document));
        });
    }, [document, setSelectedIds, setWorkspaces]);

    const stack = useCallback((stack: Array<IWorkspaceInfo>, groupName: string, callbacks?: IActionCallbacks) => {
        setSelectedIds([]);
        return Structurizr.stack(document, stack, groupName);
    }, [document, setSelectedIds]);

    const unstack = useCallback((stack: Array<IWorkspaceInfo>, callbacks?: IActionCallbacks) => {
        setSelectedIds([]);
        return Structurizr.unstack(document, stack);
    }, [document, setSelectedIds]);

    const bookmark = useCallback((workspaceId: string) => {
        // setBookmarkedIds(bookmarkedIds => ([ ...bookmarkedIds, workspaceId ]));
    }, []);

    const unbookmark = useCallback((workspaceId: string) => {
        // setBookmarkedIds(bookmarkedIds => bookmarkedIds.filter(bookmarkedId => workspaceId !== bookmarkedId));
    }, []);

    const like = useCallback((workspaceId: string) => {
        // setLikedIds(likedIds => ([ ...likedIds, workspaceId ]));
    }, []);

    const unlike = useCallback((workspaceId: string) => {
        // setLikedIds(likedIds => likedIds.filter(likedId => workspaceId !== likedId));
    }, []);

    return {
        workspaces,
        bookmarkedIds: [],
        likedIds: [],
        setWorkspaces,
        create,
        rename,
        clone,
        archive,
        restore,
        remove,
        removeMultiple,
        stack,
        unstack,
        bookmark,
        unbookmark,
        like,
        unlike
    };
}
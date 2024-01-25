import { useCallback } from "react";
import { StructurizrExportClient, Workspace } from "structurizr";
import { v4 } from "uuid";
import { useAccount } from "../../authentication";
import { useWorkspaceStore } from "../store";
import { WorkspaceInfo } from "../types";

export const useWorkspaceCollection = () => {
    // TODO: consider moving this outside
    const { account } = useAccount();
    const {
        workspaces,
        archived,
        bookmarkedIds,
        likedIds,
        setWorkspaces,
        setArchived,
        setSelectedIds,
        setBookmarkedIds,
        setLikedIds,
    } = useWorkspaceStore();

    const set = useCallback((workspaces: Array<WorkspaceInfo>) => {
        setWorkspaces(workspaces);
    }, [setWorkspaces]);
    
    const create = useCallback(() => {
        const structurizrExportClient = new StructurizrExportClient();
        const workspaceId = v4();
        const workspace: WorkspaceInfo = {
            workspaceId,
            name: "New Workspace",
            createdBy: account.username,
            createdDate: new Date().toLocaleString(),
            lastModifiedBy: account.username,
            lastModifiedDate: new Date().toLocaleString(),
            tags: [],
        };
        setWorkspaces(workspaces => ([
            ...workspaces.filter(existing => workspace.workspaceId !== existing.workspaceId),
            workspace
        ]));
    }, [account.username, setWorkspaces]);

    const rename = useCallback((workspace: WorkspaceInfo, name: string) => {
        const renamedWorkspace: WorkspaceInfo = {
            ...workspace,
            name: name,
        }
        setWorkspaces(workspaces => ([
            ...workspaces.filter(existing => workspace.workspaceId !== existing.workspaceId),
            renamedWorkspace
        ]));
    }, [setWorkspaces]);

    const clone = useCallback((workspace: WorkspaceInfo) => {
        const clonedWorkspace: WorkspaceInfo = {
            ...workspace,
            workspaceId: v4(),
            name: `${workspace.name} Copy`,
        }
        setWorkspaces(workspaces => ([
            ...workspaces.filter(existing => workspace.workspaceId !== existing.workspaceId),
            clonedWorkspace
        ]));
    }, [setWorkspaces]);

    const archive = useCallback((workspace: WorkspaceInfo) => {
        setWorkspaces(workspaces => workspaces.filter(existing => workspace.workspaceId !== existing.workspaceId));
        setArchived(archived => ([ ...archived, workspace ]));
    }, [setWorkspaces, setArchived]);

    const restore = useCallback((workspace: WorkspaceInfo) => {
        setWorkspaces(workspaces => workspaces.filter(existing => workspace.workspaceId !== existing.workspaceId));
        setArchived(archived => ([ ...archived, workspace ]));
    }, [setWorkspaces, setArchived]);

    const remove = useCallback((workspace: WorkspaceInfo) => {
        setWorkspaces(workspaces => workspaces.filter(existing => workspace.workspaceId !== existing.workspaceId));
        setArchived(archived => archived.filter(existing => workspace.workspaceId !== existing.workspaceId));
        setSelectedIds(selectedIds => selectedIds.filter(selectedId => workspace.workspaceId !== selectedId));
    }, [setWorkspaces, setArchived, setSelectedIds]);

    const stack = useCallback((stack: Array<WorkspaceInfo>, groupName: string) => {
        setWorkspaces(workspaces => workspaces.map(existing =>
            stack.some(changed => existing.workspaceId === changed.workspaceId)
                ? ({ ...existing, group: groupName })
                : existing
        ));
        setSelectedIds([groupName]);
    }, [setSelectedIds, setWorkspaces]);

    const unstack = useCallback((stack: Array<WorkspaceInfo>) => {
        setWorkspaces(workspaces => workspaces.map(existing =>
            stack.some(changed => existing.workspaceId === changed.workspaceId)
                ? ({ ...existing, group: undefined })
                : existing
        ));
        setSelectedIds([]);
    }, [setSelectedIds, setWorkspaces]);

    const bookmark = useCallback((workspaceId: string) => {
        setBookmarkedIds(bookmarkedIds => ([ ...bookmarkedIds, workspaceId ]));
    }, [setBookmarkedIds]);

    const unbookmark = useCallback((workspaceId: string) => {
        setBookmarkedIds(bookmarkedIds => bookmarkedIds.filter(bookmarkedId => workspaceId !== bookmarkedId));
    }, [setBookmarkedIds]);

    const like = useCallback((workspaceId: string) => {
        setLikedIds(likedIds => ([ ...likedIds, workspaceId ]));
    }, [setLikedIds]);

    const unlike = useCallback((workspaceId: string) => {
        setLikedIds(likedIds => likedIds.filter(likedId => workspaceId !== likedId));
    }, [setLikedIds]);

    return {
        workspaces,
        archived,
        bookmarkedIds,
        likedIds,
        set,
        create,
        rename,
        clone,
        archive,
        restore,
        remove,
        stack,
        unstack,
        bookmark,
        unbookmark,
        like,
        unlike
    }
}
import { useCallback } from "react";
import { parseStructurizr, StructurizrExportClient, Workspace } from "@structurizr/react";
import { v4 } from "uuid";
import { useWorkspaceSelectionStore } from "../hooks";
import { useWorkspaceStore } from "../store";
import { WorkspaceInfo } from "../types";

export const useWorkspaceExplorer = () => {
    const {
        workspaces,
        bookmarkedIds,
        likedIds,
        setWorkspaces,
        setBookmarkedIds,
        setLikedIds,
    } = useWorkspaceStore();
    const {
        setSelectedIds,
    } = useWorkspaceSelectionStore();
    
    const create = useCallback((author: string, info?: Partial<WorkspaceInfo>) => {
        const structurizrExportClient = new StructurizrExportClient();
        const workspaceId = v4();
        const workspace = info?.content?.structurizr
            ? parseStructurizr(info?.content?.structurizr)
            : Workspace.Empty;
        const workspaceInfo: WorkspaceInfo = {
            workspaceId,
            name: info?.name ?? workspace.name ?? "New Workspace",
            description: info?.description ?? workspace.description ?? "",
            createdBy: author,
            createdDate: info?.createdDate ?? new Date().toLocaleString(),
            lastModifiedBy: author,
            lastModifiedDate: info?.lastModifiedDate ?? new Date().toLocaleString(),
            tags: info?.tags ?? [],
            content: {
                structurizr: info?.content?.structurizr
                    ?? structurizrExportClient.export(workspace),
            },
        };
        setWorkspaces(workspaces => [ ...workspaces, workspaceInfo ]);

        return workspaceInfo;
    }, [setWorkspaces]);

    const rename = useCallback((workspace: WorkspaceInfo, name: string) => {
        const renamedWorkspace: WorkspaceInfo = {
            ...workspace,
            name: name,
        }
        setWorkspaces(workspaces => workspaces.map(existing => {
            return workspace.workspaceId !== existing.workspaceId
                ? existing
                : renamedWorkspace
        }));

        return renamedWorkspace;
    }, [setWorkspaces]);

    const clone = useCallback((workspace: WorkspaceInfo) => {
        const clonedWorkspace: WorkspaceInfo = {
            ...workspace,
            workspaceId: v4(),
            name: `${workspace.name} Copy`,
        }
        setWorkspaces(workspaces => [...workspaces, clonedWorkspace]);

        return clonedWorkspace;
    }, [setWorkspaces]);

    const archive = useCallback((workspace: WorkspaceInfo) => {
        const archivedWorkspace: WorkspaceInfo = { ...workspace, status: "archived" }
        setWorkspaces(workspaces => workspaces.map(existing => {
            return archivedWorkspace.workspaceId !== existing.workspaceId
                ? existing
                : archivedWorkspace
        }));
        setSelectedIds([]);

        return archivedWorkspace;
    }, [setWorkspaces, setSelectedIds]);

    const restore = useCallback((workspace: WorkspaceInfo) => {
        const restoredWorkspace: WorkspaceInfo = { ...workspace, status: "private" }
        setWorkspaces(workspaces => workspaces.map(existing => {
            return workspace.workspaceId !== existing.workspaceId
                ? existing
                : restoredWorkspace
        }));
        setSelectedIds([]);

        return restoredWorkspace;
    }, [setWorkspaces, setSelectedIds]);

    const remove = useCallback((workspace: WorkspaceInfo) => {
        setWorkspaces(workspaces => workspaces.filter(existing => workspace.workspaceId !== existing.workspaceId));
        setSelectedIds(selectedIds => selectedIds.filter(selectedId => workspace.workspaceId !== selectedId));
    }, [setWorkspaces, setSelectedIds]);

    const stack = useCallback((stack: Array<WorkspaceInfo>, groupName: string) => {
        setWorkspaces(workspaces => workspaces.map(existing => {
            return stack.some(changed => existing.workspaceId === changed.workspaceId)
                ? ({ ...existing, group: groupName })
                : existing
        }));
        setSelectedIds([groupName]);
    }, [setSelectedIds, setWorkspaces]);

    const unstack = useCallback((stack: Array<WorkspaceInfo>) => {
        setWorkspaces(workspaces => workspaces.map(existing => {
            return stack.some(changed => existing.workspaceId === changed.workspaceId)
                ? ({ ...existing, group: undefined })
                : existing
        }));
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
        bookmarkedIds,
        likedIds,
        setWorkspaces,
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
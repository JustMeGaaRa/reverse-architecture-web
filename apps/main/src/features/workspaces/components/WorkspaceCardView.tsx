import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import {
    WorkspaceStackCard,
    WorkspaceCard,
} from "../components";
import {
    useWorkspaceCollection,
    useWorkspaceSelection
} from "../hooks";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { groupWorkspaces } from "../utils";

export const WorkspaceCardView: FC<{
    workspaces: WorkspaceInfo[];
    groupped?: boolean;
    onOpen?: (selectedId: string) => void;
    onRename?: (selectedId: string, value: string) => void;
    onClone?: (selectedId: string) => void;
    onStack?: (selectedIds: string[]) => void;
    onUnstack?: (selectedIds: string[]) => void;
    onArchive?: (selectedId: string) => void;
    onRestore?: (selectedId: string) => void;
    onDelete?: (selectedId: string) => void;
}> = ({
    workspaces,
    groupped,
    onOpen,
    onRename,
    onClone,
    onStack,
    onUnstack,
    onArchive,
    onRestore,
    onDelete,
}) => {
    const { archived, clone, rename, stack, remove, archive, restore } = useWorkspaceCollection();
    const { selectedIds, toggleSelected } = useWorkspaceSelection();

    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });
    const groups = groupWorkspaces(workspaces);

    const handleOnSelectGroup = useCallback((group: WorkspaceGroupInfo) => {
        toggleSelected(group.name);
    }, [toggleSelected]);

    const handleOnOpenGroup = useCallback((group: WorkspaceGroupInfo) => {
        onOpen?.(group.name);
    }, [onOpen]);

    const handleOnRenameGroup = useCallback((group: WorkspaceGroupInfo, value: string) => {
        stack(group.workspaces, value);
        onStack?.(group.workspaces.map(workspace => workspace.workspaceId));
    }, [onStack, stack]);

    const handleOnCloneGroup = useCallback((group: WorkspaceGroupInfo) => {
        group.workspaces.forEach(workspace => {
            // TODO: clone both workspaces and group (with different ids)
            clone(workspace);
            onClone?.(workspace.workspaceId);
        });
    }, [onClone, clone]);

    const handleOnArhiveGroup = useCallback((group: WorkspaceGroupInfo) => {
        group.workspaces.forEach(workspace => {
            archive(workspace);
            onArchive?.(workspace.workspaceId);
        });
    }, [onArchive, archive]);

    const handleOnRestoreGroup = useCallback((group: WorkspaceGroupInfo) => {
        group.workspaces.forEach(workspace => {
            restore(workspace);
            onRestore?.(workspace.workspaceId);
        });
    }, [onRestore, restore]);

    const handleOnDeleteGroup = useCallback((group: WorkspaceGroupInfo) => {
        group.workspaces.forEach(workspace => {
            remove(workspace);
            onDelete?.(workspace.workspaceId);
        });
    }, [onDelete, remove]);

    const handleOnOpen = useCallback((workspace: WorkspaceInfo) => {
        onOpen?.(workspace.workspaceId);
    }, [onOpen]);

    const handleOnSelect = useCallback((workspace: WorkspaceInfo) => {
        toggleSelected(workspace.workspaceId);
    }, [toggleSelected]);

    const handleOnRename = useCallback((workspace: WorkspaceInfo, value: string) => {
        rename(workspace, value);
        onRename?.(workspace.workspaceId, value);
    }, [onRename, rename]);

    const handleOnClone = useCallback((workspace: WorkspaceInfo) => {
        clone(workspace);
        onClone?.(workspace.workspaceId);
    }, [onClone, clone]);

    const handleOnArhive = useCallback((workspace: WorkspaceInfo) => {
        archive(workspace);
        onArchive?.(workspace.workspaceId);
    }, [onArchive, archive]);

    const handleOnRestore = useCallback((workspace: WorkspaceInfo) => {
        restore(workspace);
        onRestore?.(workspace.workspaceId);
    }, [onRestore, restore]);

    const handleOnDelete = useCallback((workspace: WorkspaceInfo) => {
        remove(workspace);
        onDelete?.(workspace.workspaceId);
    }, [onDelete, remove]);

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {groupped && groups.map(group => (
                <WorkspaceStackCard
                    key={group.name}
                    group={group}
                    isSelected={selectedIds.some(selectedId => selectedId === group.name)}
                    onOpen={handleOnOpenGroup}
                    onRename={handleOnRenameGroup}
                    onSelect={handleOnSelectGroup}
                    onClone={handleOnCloneGroup}
                    onArchive={handleOnArhiveGroup}
                    onRestore={handleOnRestoreGroup}
                    onDelete={handleOnDeleteGroup}
                />
            ))}
            {groupped && workspaces.filter(workspace => !workspace.group).map(workspace => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                    isArchived={archived.some(archived => archived.workspaceId === workspace.workspaceId)}
                    onOpen={handleOnOpen}
                    onRename={handleOnRename}
                    onSelect={handleOnSelect}
                    onClone={handleOnClone}
                    onArchive={handleOnArhive}
                    onRestore={handleOnRestore}
                    onDelete={handleOnDelete}
                />
            ))}
            {!groupped && workspaces.map(workspace => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                    isArchived={archived.some(archived => archived.workspaceId === workspace.workspaceId)}
                    onOpen={handleOnOpen}
                    onRename={handleOnRename}
                    onSelect={handleOnSelect}
                    onClone={handleOnClone}
                    onArchive={handleOnArhive}
                    onRestore={handleOnRestore}
                    onDelete={handleOnDelete}
                />
            ))}
        </Grid>
    )
}
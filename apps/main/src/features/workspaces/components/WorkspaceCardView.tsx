import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import {
    WorkspaceStackCard,
    WorkspaceCard,
} from "../components";
import {
    useOnPressHold,
    useWorkspaceSelection
} from "../hooks";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { groupWorkspaces } from "../utils";

export const WorkspaceCardView: FC<{
    workspaces: WorkspaceInfo[];
    groupped?: boolean;
    onOpen?: (selectedId: string) => void;
    onDelete?: (selectedId: string) => void;
}> = ({
    workspaces,
    groupped,
    onOpen,
    onDelete,
}) => {
    const { selectedIds, toggleSelected } = useWorkspaceSelection();
    const { onStartHold, onCancelHold } = useOnPressHold();

    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });
    const groups = groupWorkspaces(workspaces);

    const handleOnWorkspaceTouchStart = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceTouchEnd = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceOpen = useCallback((selectedId: string) => {
        onOpen?.(selectedId);
    }, [onOpen]);

    const handleOnWorkspaceSelect = useCallback((selectedId: string) => {
        toggleSelected(selectedId);
    }, [toggleSelected]);

    const handleOnWorkspaceRename = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceClone = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceDelete = useCallback((selectedId: string) => {
        onDelete?.(selectedId);
    }, [onDelete]);

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {groupped && groups.map(group => (
                <WorkspaceStackCard
                    key={group.name}
                    group={group}
                    isSelected={selectedIds.some(selectedId => selectedId === group.name)}
                    onTouchStart={() => handleOnWorkspaceTouchStart(group)}
                    onTouchEnd={() => handleOnWorkspaceTouchEnd(group)}
                    onOpen={() => handleOnWorkspaceOpen?.(group.name)}
                    onSelect={() => handleOnWorkspaceSelect?.(group.name)}
                    onRename={() => handleOnWorkspaceRename?.(group)}
                    onClone={() => handleOnWorkspaceClone?.(group)}
                    onDelete={() => handleOnWorkspaceDelete?.(group.name)}
                />
            ))}
            {groupped && workspaces.filter(workspace => !workspace.group).map(workspace => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                    onTouchStart={() => handleOnWorkspaceTouchStart(workspace)}
                    onTouchEnd={() => handleOnWorkspaceTouchEnd(workspace)}
                    onOpen={() => handleOnWorkspaceOpen?.(workspace.workspaceId)}
                    onSelect={() => handleOnWorkspaceSelect?.(workspace.workspaceId)}
                    onRename={() => handleOnWorkspaceRename?.(workspace)}
                    onClone={() => handleOnWorkspaceClone?.(workspace)}
                    onDelete={() => handleOnWorkspaceDelete?.(workspace.workspaceId)}
                />
            ))}
            {!groupped && workspaces.map(workspace => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    isSelected={selectedIds.some(selectedId => selectedId === workspace.workspaceId)}
                    onTouchStart={() => handleOnWorkspaceTouchStart(workspace)}
                    onTouchEnd={() => handleOnWorkspaceTouchEnd(workspace)}
                    onOpen={() => handleOnWorkspaceOpen?.(workspace.workspaceId)}
                    onSelect={() => handleOnWorkspaceSelect?.(workspace.workspaceId)}
                    onRename={() => handleOnWorkspaceRename?.(workspace)}
                    onClone={() => handleOnWorkspaceClone?.(workspace)}
                    onDelete={() => handleOnWorkspaceDelete?.(workspace.workspaceId)}
                />
            ))}
        </Grid>
    )
}
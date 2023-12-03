import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import {
    WorkspaceStackCard,
    WorkspaceCard,
} from "../components";
import {
    useOnPressHold,
    useOnWorkspaceSelected,
    useWorkspaceCollection
} from "../hooks";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { groupWorkspaces, isWorkspace } from "../utils";

export const WorkspaceCardView: FC<{
    workspaces: WorkspaceInfo[];
    groupped?: boolean;
    onOpen?: (workspace: WorkspaceInfo | WorkspaceGroupInfo) => void;
    onDelete?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> = ({
    workspaces,
    groupped,
    onOpen,
    onDelete,
}) => {
    const { selected, toggleSelected } = useWorkspaceCollection();
    const { onStartHold, onCancelHold } = useOnPressHold();

    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });
    const groups = groupWorkspaces(workspaces);

    const handleOnWorkspaceTouchStart = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceTouchEnd = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceOpen = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {
        onOpen?.(data);
    }, [onOpen]);

    const handleOnWorkspaceSelect = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {
        toggleSelected(data);
    }, [toggleSelected]);

    const handleOnWorkspaceRename = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceClone = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {

    }, []);

    const handleOnWorkspaceDelete = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {
        onDelete?.([data]);
    }, [onDelete]);

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {groupped && groups.filter(group => group.name !== undefined).map(group => (
                <WorkspaceStackCard
                    key={group.name}
                    group={group}
                    isSelected={selected.some(x => x.name === group.name)}
                    onTouchStart={() => handleOnWorkspaceTouchStart(group)}
                    onTouchEnd={() => handleOnWorkspaceTouchEnd(group)}
                    onOpen={() => handleOnWorkspaceOpen?.(group)}
                    onSelect={() => handleOnWorkspaceSelect?.(group)}
                    onRename={() => handleOnWorkspaceRename?.(group)}
                    onClone={() => handleOnWorkspaceClone?.(group)}
                    onDelete={() => handleOnWorkspaceDelete?.(group)}
                />
            ))}
            {groupped && groups.filter(group => group.name === undefined).flatMap(group => group.workspaces).map(workspace => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    isSelected={selected.some(x => isWorkspace(x) && x.workspaceId === workspace.workspaceId)}
                    onTouchStart={() => handleOnWorkspaceTouchStart(workspace)}
                    onTouchEnd={() => handleOnWorkspaceTouchEnd(workspace)}
                    onOpen={() => handleOnWorkspaceOpen?.(workspace)}
                    onSelect={() => handleOnWorkspaceSelect?.(workspace)}
                    onRename={() => handleOnWorkspaceRename?.(workspace)}
                    onClone={() => handleOnWorkspaceClone?.(workspace)}
                    onDelete={() => handleOnWorkspaceDelete?.(workspace)}
                />
            ))}
            {!groupped && workspaces.map(workspace => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    isSelected={selected.some(x => isWorkspace(x) && x.workspaceId === workspace.workspaceId)}
                    onTouchStart={() => handleOnWorkspaceTouchStart(workspace)}
                    onTouchEnd={() => handleOnWorkspaceTouchEnd(workspace)}
                    onOpen={() => handleOnWorkspaceOpen?.(workspace)}
                    onSelect={() => handleOnWorkspaceSelect?.(workspace)}
                    onRename={() => handleOnWorkspaceRename?.(workspace)}
                    onClone={() => handleOnWorkspaceClone?.(workspace)}
                    onDelete={() => handleOnWorkspaceDelete?.(workspace)}
                />
            ))}
        </Grid>
    )
}
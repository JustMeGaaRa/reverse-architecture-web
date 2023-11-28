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
import { groupWorkspaces } from "../utils";

export const WorkspaceCardView: FC<{
    workspaces: WorkspaceInfo[];
    groupped?: boolean;
    onClick?: (workspace: WorkspaceInfo | WorkspaceGroupInfo) => void;
    onSelected?: (workspaces: Array<string>) => void;
    onRemove?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> = ({
    workspaces,
    groupped,
    onClick,
    onSelected,
    onRemove,
}) => {
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });
    const groups = groupWorkspaces(workspaces);
    
    const {
        isSelectionModeOn,
        selectedIndicies,
        turnOnSelectionMode,
        toggleSelected
    } = useWorkspaceCollection();
    
    useOnWorkspaceSelected(onSelected);

    const { onStartHold, onCancelHold } = useOnPressHold();

    const handleOnMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => {
        onStartHold(() => {
            turnOnSelectionMode();
        });
    }, [onStartHold, turnOnSelectionMode]);

    const handleOnMouseUp = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => {
        onCancelHold();
    }, [onCancelHold]);

    const handleOnPreviewClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string, data: WorkspaceInfo | WorkspaceGroupInfo) => {
        if (isSelectionModeOn) {
            toggleSelected(key);
        }
        else {
            onClick?.(data);
        }
    }, [isSelectionModeOn, onClick, toggleSelected]);

    const handleOnRemove = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: WorkspaceInfo | WorkspaceGroupInfo) => {
        onRemove?.([data]);
    }, [onRemove]);

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {groupped && groups.filter(group => group.name !== undefined).map(group => (
                <WorkspaceStackCard
                    key={group.name}
                    group={group}
                    isSelected={selectedIndicies.includes(group.name)}
                    onMouseDown={(event) => handleOnMouseDown(event, group.name)}
                    onMouseUp={(event) => handleOnMouseUp(event, group.name)}
                    onPreviewClick={(event) => handleOnPreviewClick?.(event, group.name, group)}
                    onRemove={(event) => handleOnRemove?.(event, group)}
                />
            ))}
            {groupped && groups.filter(group => group.name === undefined).flatMap(group => group.workspaces).map(workspace => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    isSelected={selectedIndicies.includes(workspace.workspaceId)}
                    onMouseDown={(event) => handleOnMouseDown(event, workspace.workspaceId)}
                    onMouseUp={(event) => handleOnMouseUp(event, workspace.workspaceId)}
                    onPreviewClick={(event) => handleOnPreviewClick?.(event, workspace.workspaceId, workspace)}
                    onRemove={(event) => handleOnRemove?.(event, workspace)}
                />
            ))}
            {!groupped && workspaces.map(workspace => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    isSelected={selectedIndicies.includes(workspace.workspaceId)}
                    onMouseDown={(event) => handleOnMouseDown(event, workspace.workspaceId)}
                    onMouseUp={(event) => handleOnMouseUp(event, workspace.workspaceId)}
                    onPreviewClick={(event) => handleOnPreviewClick?.(event, workspace.workspaceId, workspace)}
                    onRemove={(event) => handleOnRemove?.(event, workspace)}
                />
            ))}
        </Grid>
    )
}
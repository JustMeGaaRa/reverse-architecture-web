import { FC, useCallback } from "react";
import {
    SelectionContainerProvider,
    WorkspaceStackCard,
    WorkspaceCard,
    WorkspaceCardList
} from "../components";
import {
    useSelectionItem,
    useOnPressHold,
    useSelectionContainer
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
    const groups = groupWorkspaces(workspaces);
    
    const {
        isSelectionModeOn,
        selectedIndicies,
        turnOnSelectionMode,
        toggleSelected
    } = useSelectionContainer();

    const { onStartHold, onCancelHold } = useOnPressHold();

    const handleOnMouseDown = useCallback((key: string) => {
        onStartHold(() => {
            turnOnSelectionMode();
            toggleSelected(key);
        });
    }, [onStartHold, toggleSelected, turnOnSelectionMode]);

    const handleOnMouseUp = useCallback((key: string) => {
        onCancelHold();
    }, [onCancelHold]);

    const handleOnPreviewClick = useCallback((key: string, data: WorkspaceInfo | WorkspaceGroupInfo) => {
        if (isSelectionModeOn) {
            toggleSelected(key);
        }
        else {
            onClick?.(data);
        }
    }, [isSelectionModeOn, onClick, toggleSelected]);

    const handleOnRemove = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {
        onRemove?.([data]);
    }, [onRemove]);

    return (
        <WorkspaceCardList onSelected={onSelected}>
            {groupped && groups.filter(group => group.name !== undefined).map(group => (
                <WorkspaceStackCard
                    key={group.name}
                    group={group}
                    isSelected={selectedIndicies.includes(group.name)}
                    onMouseDown={() => handleOnMouseDown(group.name)}
                    onMouseUp={() => handleOnMouseUp(group.name)}
                    onPreviewClick={() => handleOnPreviewClick?.(group.name, group)}
                    onRemove={() => handleOnRemove?.(group)}
                />
            ))}
            {groupped && groups.filter(group => group.name === undefined).flatMap(group => group.workspaces).map(workspace => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    isSelected={selectedIndicies.includes(workspace.workspaceId)}
                    onMouseDown={() => handleOnMouseDown(workspace.workspaceId)}
                    onMouseUp={() => handleOnMouseUp(workspace.workspaceId)}
                    onPreviewClick={() => handleOnPreviewClick?.(workspace.workspaceId, workspace)}
                    onRemove={() => handleOnRemove?.(workspace)}
                />
            ))}
            {!groupped && workspaces.map(workspace => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    isSelected={selectedIndicies.includes(workspace.workspaceId)}
                    onMouseDown={() => handleOnMouseDown(workspace.workspaceId)}
                    onMouseUp={() => handleOnMouseUp(workspace.workspaceId)}
                    onPreviewClick={() => handleOnPreviewClick?.(workspace.workspaceId, workspace)}
                    onRemove={() => handleOnRemove?.(workspace)}
                />
            ))}
        </WorkspaceCardList>
    )
}
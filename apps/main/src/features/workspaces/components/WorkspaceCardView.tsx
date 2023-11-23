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
    onSelected?: (workspaces: Array<number>) => void;
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
        turnOnSelectionMode,
        toggleSelected
    } = useSelectionContainer();
    const { index, isSelected } = useSelectionItem();

    const { onStartHold, onCancelHold } = useOnPressHold(() => {
        turnOnSelectionMode();
        toggleSelected(index);
    });

    const handleOnMouseDown = useCallback(() => {
        onStartHold();
    }, [onStartHold]);

    const handleOnMouseUp = useCallback(() => {
        onCancelHold();
    }, [onCancelHold]);

    const handleOnPreviewClick = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {
        if (isSelectionModeOn) {
            toggleSelected(index);
        }
        else {
            onClick?.(data);
        }
    }, [index, isSelectionModeOn, onClick, toggleSelected]);

    const handleOnRemove = useCallback((data: WorkspaceInfo | WorkspaceGroupInfo) => {
        onRemove?.([data]);
    }, [onRemove]);

    return (
        <SelectionContainerProvider>
            <WorkspaceCardList onSelected={onSelected}>
                {groupped && groups.filter(group => group.name !== undefined).map(group => (
                    <WorkspaceStackCard
                        key={group.name}
                        group={group}
                        isSelected={isSelected}
                        onMouseDown={handleOnMouseDown}
                        onMouseUp={handleOnMouseUp}
                        onPreviewClick={() => handleOnPreviewClick?.(group)}
                        onRemove={() => handleOnRemove?.(group)}
                    />
                ))}
                {groupped && groups.filter(group => group.name === undefined).flatMap(group => group.workspaces).map(workspace => (
                    <WorkspaceCard
                        key={workspace.workspaceId}
                        workspace={workspace}
                        isSelected={isSelected}
                        onMouseDown={handleOnMouseDown}
                        onMouseUp={handleOnMouseUp}
                        onPreviewClick={() => handleOnPreviewClick?.(workspace)}
                        onRemove={() => handleOnRemove?.(workspace)}
                    />
                ))}
                {!groupped && workspaces.map(workspace => (
                    <WorkspaceCard
                        key={workspace.workspaceId}
                        workspace={workspace}
                        isSelected={isSelected}
                        onMouseDown={handleOnMouseDown}
                        onMouseUp={handleOnMouseUp}
                        onPreviewClick={() => handleOnPreviewClick?.(workspace)}
                        onRemove={() => handleOnRemove?.(workspace)}
                    />
                ))}
            </WorkspaceCardList>
        </SelectionContainerProvider>
    )
}
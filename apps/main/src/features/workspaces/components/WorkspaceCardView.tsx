import { FC } from "react";
import {
    SelectionContainerProvider,
    WorkspaceGroupPreview,
    WorkspacePreview,
    WorkspaceCardList
} from "../components";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { groupWorkspaces } from "../utils";

export const WorkspaceCardView: FC<{
    workspaces: WorkspaceInfo[];
    isGrouped?: boolean;
    onClick?: (workspace: WorkspaceInfo | WorkspaceGroupInfo) => void;
    onSelected?: (workspaces: Array<number>) => void;
    onRemove?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> = ({
    workspaces,
    isGrouped,
    onClick,
    onSelected,
    onRemove,
}) => {
    const groups = groupWorkspaces(workspaces);

    return (
        <SelectionContainerProvider>
            <WorkspaceCardList onSelected={onSelected}>
                {isGrouped && groups.filter(group => group.name !== undefined).map(group => (
                    <WorkspaceGroupPreview
                        key={group.name}
                        group={group}
                        onPreviewClick={() => onClick?.(group)}
                    />
                ))}
                {isGrouped && groups.filter(group => group.name === undefined).flatMap(group => group.workspaces).map(workspace => (
                    <WorkspacePreview
                        key={workspace.workspaceId}
                        workspace={workspace}
                        onPreviewClick={() => onClick?.(workspace)}
                    />
                ))}
                {!isGrouped && workspaces.map(workspace => (
                    <WorkspacePreview
                        key={workspace.workspaceId}
                        workspace={workspace}
                        onPreviewClick={() => onClick?.(workspace)}
                    />
                ))}
            </WorkspaceCardList>
        </SelectionContainerProvider>
    )
}
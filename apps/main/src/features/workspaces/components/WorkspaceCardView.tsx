import { FC } from "react";
import {
    SelectionContainerProvider,
    WorkspaceStackCard,
    WorkspaceCard,
    WorkspaceCardList
} from "../components";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { groupWorkspaces } from "../utils";

export const WorkspaceCardView: FC<{
    workspaces: WorkspaceInfo[];
    onClick?: (workspace: WorkspaceInfo | WorkspaceGroupInfo) => void;
    onSelected?: (workspaces: Array<number>) => void;
    onRemove?: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void;
}> = ({
    workspaces,
    onClick,
    onSelected,
    onRemove,
}) => {
    const groups = groupWorkspaces(workspaces);

    return (
        <SelectionContainerProvider>
            <WorkspaceCardList onSelected={onSelected}>
                {groups.filter(group => group.name !== undefined).map(group => (
                    <WorkspaceStackCard
                        key={group.name}
                        group={group}
                        onPreviewClick={() => onClick?.(group)}
                    />
                ))}
                {groups.filter(group => group.name === undefined).flatMap(group => group.workspaces).map(workspace => (
                    <WorkspaceCard
                        key={workspace.workspaceId}
                        workspace={workspace}
                        onPreviewClick={() => onClick?.(workspace)}
                    />
                ))}
            </WorkspaceCardList>
        </SelectionContainerProvider>
    )
}
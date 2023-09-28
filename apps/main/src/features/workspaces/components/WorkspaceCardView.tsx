import { FC } from "react";
import {
    SelectionContainerProvider,
    WorkspaceCard,
    WorkspaceGroupPreview,
    WorkspacePreview,
    WorkspaceCards
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
            <WorkspaceCards onSelected={onSelected}>
                {isGrouped && groups.filter(group => group.name !== undefined).map(group => (
                    <WorkspaceCard
                        key={group.name}
                        name={group.name}
                        lastModifiedDate={group.lastModifiedDate}
                    >
                        <WorkspaceGroupPreview
                            group={group}
                            onPreviewClick={() => onClick?.(group)}
                        />
                    </WorkspaceCard>
                ))}
                {isGrouped && groups.filter(group => group.name === undefined).flatMap(group => group.workspaces).map(workspace => (
                    <WorkspaceCard
                        key={workspace.workspaceId}
                        name={workspace.name}
                        lastModifiedDate={workspace.lastModifiedDate}
                    >
                        <WorkspacePreview
                            key={workspace.workspaceId}
                            workspace={workspace}
                            onPreviewClick={() => onClick?.(workspace)}
                        />
                    </WorkspaceCard>
                ))}
                {!isGrouped && workspaces.map(workspace => (
                    <WorkspaceCard
                        key={workspace.workspaceId}
                        name={workspace.name}
                        lastModifiedDate={workspace.lastModifiedDate}
                    >
                        <WorkspacePreview
                            key={workspace.workspaceId}
                            workspace={workspace}
                            onPreviewClick={() => onClick?.(workspace)}
                        />
                    </WorkspaceCard>
                ))}
            </WorkspaceCards>
        </SelectionContainerProvider>
    )
}
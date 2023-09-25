import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import { WorkspaceCard, WorkspaceGroupPreview, WorkspacePreview } from "../components";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";

export const WorkspaceCardView: FC<{
    groups: WorkspaceGroupInfo[];
    workspaces: WorkspaceInfo[];
    onClick?: (workspace: WorkspaceInfo) => void;
    onGroupRemove?: (groups: WorkspaceGroupInfo[]) => void;
    onGroupClick?: (group: WorkspaceGroupInfo) => void;
}> = ({
    groups,
    workspaces,
    onClick,
    onGroupRemove,
    onGroupClick
}) => {
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {groups.map((group) => (
                <WorkspaceCard
                    key={group.groupId}
                    name={group.name}
                    lastModifiedDate={group.lastModifiedDate}
                >
                    <WorkspaceGroupPreview
                        group={group}
                        onPreviewClick={() => onGroupClick?.(group)}
                    />
                </WorkspaceCard>
            ))}
            {workspaces.map((workspace) => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    name={workspace.name}
                    lastModifiedDate={workspace.updated.toLocaleDateString()}
                >
                    <WorkspacePreview
                        key={workspace.workspaceId}
                        workspace={workspace}
                        onPreviewClick={() => onClick?.(workspace)}
                    />
                </WorkspaceCard>
            ))}
        </Grid>
    )
}
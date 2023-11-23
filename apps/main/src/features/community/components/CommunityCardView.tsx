import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import { WorkspaceTemplateCard } from "../../workspaces";
import { WorkspaceInfo } from "../../";

export const CommunityCardView: FC<{
    workspaces: WorkspaceInfo[];
    onClick?: (workspace: WorkspaceInfo) => void;
}> = ({
    workspaces,
    onClick
}) => {
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {workspaces.map((workspace) => (
                <WorkspaceTemplateCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    onPreviewClick={() => onClick?.(workspace)}
                />
            ))}
        </Grid>
    )
}
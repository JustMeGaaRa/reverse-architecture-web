import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import { WorkspaceTemplateCard } from "../../workspaces";
import { WorkspaceInfo } from "../../";

export const CommunityCardView: FC<{
    workspaces: WorkspaceInfo[];
    onClick?: (workspace: WorkspaceInfo) => void;
    onTryItClick?: (workspace: WorkspaceInfo) => void;
    onBookmarkClick?: (workspace: WorkspaceInfo) => void;
    onLikeClick?: (workspace: WorkspaceInfo) => void;
}> = ({
    workspaces,
    onClick,
    onTryItClick,
    onBookmarkClick,
    onLikeClick
}) => {
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {workspaces.map((workspace) => (
                <WorkspaceTemplateCard
                    key={workspace.workspaceId}
                    workspace={workspace}
                    onClick={() => onClick?.(workspace)}
                    onTryItClick={() => onTryItClick?.(workspace)}
                    onBookmarkClick={() => onBookmarkClick?.(workspace)}
                    onLikeClick={() => onLikeClick?.(workspace)}
                />
            ))}
        </Grid>
    )
}
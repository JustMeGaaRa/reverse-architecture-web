import { Grid, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import { WorkspaceCard } from "../components";
import { WorkspaceInfo } from "../types";

export const WorkspaceCardView: FC<{
    workspaces: WorkspaceInfo[];
    onClick?: (workspace: WorkspaceInfo) => void;
}> = ({
    workspaces,
    onClick
}) => {
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4 });

    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {workspaces.map((workspace) => (
                <WorkspaceCard
                    key={workspace.workspaceId}
                    title={workspace.name}
                    author={workspace.author}
                    preview={workspace.preview}
                    onPreviewClick={() => onClick?.(workspace)}
                />
            ))}
        </Grid>
    )
}
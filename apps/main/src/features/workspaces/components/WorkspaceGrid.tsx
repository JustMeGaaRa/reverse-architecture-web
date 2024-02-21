import { Grid } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const WorkspaceGrid: FC<PropsWithChildren<{
    gridColumns?: number;
}>> = ({
    children,
    gridColumns
}) => {
    return (
        <Grid gridTemplateColumns={`repeat(${gridColumns}, 1fr)`} gap={6}>
            {children}
        </Grid>
    )
}
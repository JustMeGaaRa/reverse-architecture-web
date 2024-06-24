import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export type PanelPlacement = 
    "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

export const WorkspacePanel: FC<PropsWithChildren<{
    placement: PanelPlacement;
    spacing?: number;
}>> = ({
    children,
    placement,
    spacing = 4,
}) => {
    const styles = {
        "top-left": {
            top: spacing,
            left: spacing
        },
        "top-center": {
            top: spacing,
            left: "50%",
            transform: "translateX(-50%)"
        },
        "top-right": {
            top: spacing,
            right: spacing
        },
        "bottom-left": {
            bottom: spacing,
            left: spacing
        },
        "bottom-center": {
            bottom: spacing,
            left: "50%",
            transform: "translateX(-50%)"
        },
        "bottom-right": {
            bottom: spacing,
            right: spacing
        }
    }

    return (
        <Box
            className={`structurizr__panel panel__${placement}`}
            position={"absolute"}
            {...styles[placement]}
            zIndex={1000}
        >
            {children}
        </Box>
    );
};

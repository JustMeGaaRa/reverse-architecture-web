import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { ToolbarSubmenuProvider } from "../components";

export const ToolbarSubmenu: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ToolbarSubmenuProvider>
            <Box
                className={"workspace-toolbar__submenu"}
            >
                {children}
            </Box>
        </ToolbarSubmenuProvider>
    )
}
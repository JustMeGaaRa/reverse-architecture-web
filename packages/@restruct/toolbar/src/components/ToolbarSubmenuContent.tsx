import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { ToolbarPortal } from "../components";
import { useToolbarSubmenu } from "../hooks";

export const ToolbarSubmenuContent: FC<PropsWithChildren> = ({ children }) => {
    const { isOpen } = useToolbarSubmenu();

    return isOpen && (
        <ToolbarPortal>
            <Box
                className={"workspace-toolbar__submenu-content"}
                background={"linear-gradient(rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.001))"}
                borderRadius={20}
                position={"absolute"}
                height={"200%"}
                top={0}
                transform={"translateY(-50%)"}
                zIndex={0}
            >
                <Box
                    backgroundColor={"surface.tinted-black-10"}
                    backdropFilter={"blur(32px)"}
                    borderColor={"transparent"}
                    borderRadius={20}
                    borderWidth={1}
                    boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10), 12px 12px 16px 0px rgba(0, 0, 0, 0.10) inset, -12px -12px 16px 0px rgba(255, 255, 255, 0.02) inset"}
                    padding={"2px"}
                    height={"100%"}
                >
                    {children}
                </Box>
            </Box>
        </ToolbarPortal>
    )
}
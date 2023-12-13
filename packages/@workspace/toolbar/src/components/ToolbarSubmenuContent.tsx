import { Box, HStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { BorderTop, ToolbarPortal } from "../components";
import { useToolbarSubmenu } from "../hooks";

export const ToolbarSubmenuContent: FC<PropsWithChildren> = ({ children }) => {
    const { isOpen } = useToolbarSubmenu();

    return isOpen && (
        <ToolbarPortal>
            <BorderTop
                className={"workspace-toolbar__submenu-content"}
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
            </BorderTop>
        </ToolbarPortal>
    )
}
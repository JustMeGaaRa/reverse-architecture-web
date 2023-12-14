import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren, useCallback, useMemo } from "react";
import { ToolbarSubmenuContext } from "../context";
import { useToolbar } from "../hooks";

export const ToolbarSubmenu: FC<PropsWithChildren> = ({ children }) => {
    const { selectedIndex, setSelectedIndex } = useToolbar();
    const currentIndex = useMemo(() => Math.random(), []);

    const onToggle = useCallback(() => {
        setSelectedIndex(selectedIndex === currentIndex ? null : currentIndex);
    }, [currentIndex, selectedIndex, setSelectedIndex]);
    
    return (
        <ToolbarSubmenuContext.Provider
            value={{
                isOpen: currentIndex === selectedIndex,
                onToggle: onToggle
            }}
        >
            <Box className={"workspace-toolbar__submenu"}>
                {children}
            </Box>
        </ToolbarSubmenuContext.Provider>
    )
}
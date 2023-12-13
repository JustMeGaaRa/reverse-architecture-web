import { useDisclosure } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { ToolbarSubmenuContext } from "../context";

export const ToolbarSubmenuProvider: FC<PropsWithChildren> = ({ children }) => {
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

    return (
        <ToolbarSubmenuContext.Provider value={{ isOpen, onOpen, onClose, onToggle }}>
            {children}
        </ToolbarSubmenuContext.Provider>
    )
}
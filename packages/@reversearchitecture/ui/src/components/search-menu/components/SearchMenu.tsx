import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { SearchMenuContext } from "../contexts";

export const SearchMenu: FC<PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;
}>> = ({
    children,
    isOpen,
    onClose
}) => {
    return (
        <SearchMenuContext.Provider value={{ isOpen, onClose }}>
            <Box position={"relative"}>
                {children}
            </Box>
        </SearchMenuContext.Provider>
    )
}
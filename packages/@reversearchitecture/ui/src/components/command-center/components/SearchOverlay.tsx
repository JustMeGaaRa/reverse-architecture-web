import { Box, Fade, Portal, ScaleFade } from "@chakra-ui/react";
import { FC } from "react";

export const SearchOverlay: FC<{ isOpen: boolean }> = ({ isOpen }) => {
    return (
        <Portal>
            <Box
                backgroundColor={"surface.tinted-black-60"}
                height={"100vh"}
                width={"100vw"}
                position={"absolute"}
                left={0}
                top={0}
                display={isOpen ? "block" : "none"}
            >
            </Box>
        </Portal>
    )
}
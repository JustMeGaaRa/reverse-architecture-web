import { Box, Portal } from "@chakra-ui/react";
import { FC } from "react";
import { useSearchMenu } from "../hooks";

export const SearchMenuOverlay: FC = () => {
    const { isOpen, onClose } = useSearchMenu();

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
                onClick={onClose}
            />
        </Portal>
    )
}
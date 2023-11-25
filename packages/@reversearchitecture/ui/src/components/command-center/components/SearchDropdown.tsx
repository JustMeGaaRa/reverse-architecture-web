import { Box, StackDivider, VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const SearchDropdown: FC<PropsWithChildren<{
    isOpen: boolean;
}>> = ({
    children,
    isOpen
}) => {
    return (
        // <ScaleFade in={isOpen}>
            <Box
                backgroundColor={"surface.tinted-black-60"}
                borderRadius={24}
                backdropFilter={"blur(32px)"}
                borderWidth={1}
                borderColor={"surface.tinted-white-10"}
                boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10)"}
                overflow={"scroll"}
                paddingX={1}
                paddingY={4}
                position={"absolute"}
                marginTop={1}
                minHeight={"200px"}
                maxHeight={"400px"}
                width={"100%"}
                display={isOpen ? "block" : "none"}
                zIndex={10}
            >
                <VStack
                    divider={<StackDivider />}
                    alignItems={"start"}
                >
                    {children}
                </VStack>
            </Box>
        // </ScaleFade>
    )
}
import { Box, SlideFade, StackDivider, VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const SearchDropdown: FC<PropsWithChildren<{
    isOpen: boolean;
}>> = ({
    children,
    isOpen
}) => {
    return (
        <Box
            display={isOpen ? "block" : "none"}
            position={"absolute"}
            width={"100%"}
            zIndex={100}
        >
            <SlideFade in={isOpen}>
                <VStack
                    alignItems={"start"}
                    backgroundColor={"surface.tinted-black-60"}
                    borderRadius={24}
                    backdropFilter={"blur(32px)"}
                    borderWidth={1}
                    borderColor={"surface.tinted-white-10"}
                    boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10)"}
                    divider={<StackDivider />}
                    overflow={"scroll"}
                    paddingX={1}
                    paddingY={4}
                    minHeight={"150px"}
                    marginTop={1}
                    maxHeight={"600px"}
                    width={"100%"}
                >
                    {children}
                </VStack>
            </SlideFade>
        </Box>
    )
}
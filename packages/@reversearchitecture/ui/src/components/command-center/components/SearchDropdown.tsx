import { Box, SlideFade, StackDivider, VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren, useCallback, useState } from "react";

export const SearchDropdown: FC<PropsWithChildren<{
    isOpen: boolean;
}>> = ({
    children,
    isOpen
}) => {
    return (
        <Box
            position={"absolute"}
            transitionProperty={"visibility"}
            transitionDelay={isOpen ? "unset" : "0.5s"}
            visibility={isOpen ? "visible" : "hidden"}
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
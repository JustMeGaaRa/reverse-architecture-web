import { Box, Flex, ScaleFade } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { useSearchMenu } from "../hooks";

export const SearchMenuList: FC<PropsWithChildren<{
    width?: "sm" | "md" | "lg" | string[];
}>> = ({
    children,
    width
}) => {
    const { isOpen } = useSearchMenu();

    return (
        <Box
            position={"absolute"}
            transitionProperty={"visibility"}
            transitionDelay={isOpen ? "unset" : "0.5s"}
            visibility={isOpen ? "visible" : "hidden"}
            width={"100%"}
            zIndex={100}
        >
            <ScaleFade in={isOpen}>
                <Flex
                    alignItems={"start"}
                    backgroundColor={"surface.tinted-white-5"}
                    borderRadius={24}
                    backdropFilter={"blur(32px)"}
                    borderWidth={1}
                    borderColor={"surface.tinted-white-10"}
                    boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10)"}
                    direction={"column"}
                    overflow={"scroll"}
                    paddingX={1}
                    paddingY={4}
                    marginTop={1}
                    maxHeight={"600px"}
                    width={"100%"}
                >
                    {children}
                </Flex>
            </ScaleFade>
        </Box>
    )
}
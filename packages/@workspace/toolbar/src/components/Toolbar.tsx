import { Box, HStack, StackDivider } from "@chakra-ui/react";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { BorderTop } from "../components";
import { useToolbar } from "../hooks";

export const Toolbar: FC<PropsWithChildren> = ({ children }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { setToolbarNode } = useToolbar();

    useEffect(() => {
        setToolbarNode(wrapperRef.current)
    }, [setToolbarNode]);

    return (
        <Box
            ref={wrapperRef}
            className={"workspace-toolbar__toolbar"}
        >
            <BorderTop
                className={"workspace-toolbar__content"}
                borderRadius={20}
                position={"relative"}
                zIndex={1}
            >
                <HStack
                    alignItems={"center"}
                    divider={
                        <StackDivider
                            borderColor={"gray.400"}
                            height={"24px"}
                            alignSelf={"center"}
                        />
                    }
                    justifyContent={"center"}
                    backgroundColor={"surface.tinted-white-5"}
                    backdropFilter={"blur(32px)"}
                    borderColor={"transparent"}
                    borderRadius={20}
                    borderWidth={2}
                    boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10), 12px 12px 16px 0px rgba(0, 0, 0, 0.20) inset, -12px -12px 16px 0px rgba(255, 255, 255, 0.05) inset"}
                    gap={0}
                    padding={"2px"}
                >
                    {children}
                </HStack>
            </BorderTop>
        </Box>
    );
}
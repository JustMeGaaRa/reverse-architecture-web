import { Box, HStack, StackDivider } from "@chakra-ui/react";
import { FC, PropsWithChildren, useRef, useState } from "react";
import { ToolbarContext } from "../context";

export const Toolbar: FC<PropsWithChildren> = ({ children }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [ selectedIndex, setSelectedIndex ] = useState(null);

    return (
        <ToolbarContext.Provider
            value={{
                toolbarDomNode: wrapperRef.current,
                selectedIndex,
                setSelectedIndex
            }}
        >
            <Box
                ref={wrapperRef}
                className={"workspace-toolbar__toolbar"}
            >
                <Box
                    className={"workspace-toolbar__content"}
                    background={"linear-gradient(rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.001))"}
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
                </Box>
            </Box>
        </ToolbarContext.Provider>
    );
}
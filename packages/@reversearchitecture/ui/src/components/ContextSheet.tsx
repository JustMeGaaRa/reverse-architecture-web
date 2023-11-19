import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { ContextLevelProvider } from "../components";
import { useContextLevel } from "../hooks";

export const ContextSheet: FC<PropsWithChildren> = ({ children }) => {
    const { level, getLevelColor } = useContextLevel();

    return (
        <Flex
            backgroundColor={getLevelColor(level)}
            borderColor={"gray.400"}
            borderRadius={"32px 32px 0px 0px"}
            // _first={{
            //     borderTopLeftRadius: "0px"
            // }}
            // _last={{
            //     borderTopRightRadius: "0px"
            // }}
            borderWidth={1}
            // borderTopWidth={1}
            direction={"column"}
            height={"100%"}
            width={"100%"}
            position={"relative"}
        >
            <ContextLevelProvider level={level + 1} >
                {children}
            </ContextLevelProvider>
        </Flex>
    )
}

export const ContextSheetPanel: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex
            direction={"row"}
            height={"100%"}
        >
            {children}
        </Flex>
    )
}
import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { ContextLevelProvider } from "../components";
import { useContextLevel } from "../hooks";

export const ContextSheet: FC<PropsWithChildren<{
    outline?: string;
    outlineRadius?: [number, number, number, number];
    outlineWidth?: [number, number, number, number];
}>> = ({
    children,
    outline,
    outlineRadius,
    outlineWidth
}) => {
    const { level, getLevelColor } = useContextLevel();

    return (
        <Flex
            backgroundColor={getLevelColor(level)}
            borderColor={outline ?? "gray.400"}
            borderTopLeftRadius={outlineRadius?.at(0) ?? 32}
            borderTopRightRadius={outlineRadius?.at(1) ?? 0}
            borderBottomRightRadius={outlineRadius?.at(2) ?? 0}
            borderBottomLeftRadius={outlineRadius?.at(3) ?? 0}
            borderLeftWidth={outlineWidth?.at(0) ?? 1}
            borderTopWidth={outlineWidth?.at(1) ?? 1}
            borderRightWidth={outlineWidth?.at(2) ?? 0}
            borderBottomWidth={outlineWidth?.at(3) ?? 0}
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

export const ContextSheetTabContent: FC<PropsWithChildren<{
    gap?: number;
    padding?: number;
}>> = ({
    children,
    gap,
    padding
}) => {
    return (
        <Flex
            direction={"row"}
            height={"100%"}
            gap={gap ?? 0}
            padding={padding ?? 0}
        >
            {children}
        </Flex>
    )
}

export const ContextSheetPanel: FC<PropsWithChildren<{
    width?: string;
}>> = ({
    children,
    width
}) => {
    return (
        <Flex direction={"column"} width={width}>
            {children}
        </Flex>
    )
}
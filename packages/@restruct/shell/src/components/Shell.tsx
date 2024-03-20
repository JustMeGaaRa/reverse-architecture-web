import { Flex } from "@chakra-ui/react";
import { DragEventHandler, FC, PropsWithChildren } from "react";
import { ShellProvider } from "./ShellProvider";
import { useShellLevel } from "../hooks";

export const Shell: FC<PropsWithChildren<{
    outline?: string;
    outlineRadius?: [number, number, number, number];
    outlineWidth?: [number, number, number, number];
    padding?: number;
    gap?: number;
    isOpen?: boolean;
    onDragEnter?: DragEventHandler<HTMLDivElement>;
    onDragExit?: DragEventHandler<HTMLDivElement>;
}>> = ({
    children,
    outline,
    outlineRadius,
    outlineWidth,
    padding,
    gap,
    isOpen = true,
    onDragEnter,
    onDragExit
}) => {
    const { level, getLevelColor } = useShellLevel();

    return (
        <Flex
            className={"restruct__shell"}
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
            display={!isOpen ? "none" : "flex"}
            gap={gap ?? 0}
            height={"100%"}
            width={"100%"}
            padding={padding ?? 0}
            position={"relative"}
            onDragEnter={onDragEnter}
            onDragExit={onDragExit}
        >
            <ShellProvider level={level + 1} >
                {children}
            </ShellProvider>
        </Flex>
    )
}
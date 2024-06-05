import { Box, Editable, EditableInput, EditablePreview, EditableTextarea, HStack, Text, VStack } from "@chakra-ui/react";
import { CSSProperties, FC, PropsWithChildren } from "react";
import { useElement } from "../../hooks";

export const ElementContainer: FC<PropsWithChildren<{
    style?: CSSProperties;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}>> = ({
    children,
    style,
    onMouseEnter,
    onMouseLeave
}) => {
    return (
        <VStack
            gap={0}
            height={"100%"}
            width={"100%"}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </VStack>
    )
}

export const ElementName: FC<{
    name: string;
    style?: CSSProperties;
}> = ({
    name,
    style
}) => {
    const { isReadonly } = useElement();

    return (
        <Box
            flexGrow={0}
            padding={"10px"}
            textAlign={style?.textAlign ?? "center"}
            height={"40px"}
            width={"100%"}
        >
            <Text
                borderRadius={12}
                color={"gray.1000"}
                noOfLines={1}
                textStyle={"b3"}
                title={name}
            >
                {name}
            </Text>
        </Box>
    )
}

export const ElementType: FC<{ type: string; style?: CSSProperties; }> = ({ type, style }) => {
    return (
        <Box
            flexGrow={0}
            paddingX={"10px"}
            textAlign={style?.textAlign ?? "center"}
            height={"14px"}
            width={"100%"}
        >
            <Text
                color={"gray.700"}
                noOfLines={1}
                textStyle={"b5"}
            >
                {type}
            </Text>
        </Box>
    )
}

export const ElementDescription: FC<{
    description: string;
    style?: CSSProperties;
}> = ({
    description,
    style
}) => {
    const { isReadonly } = useElement();

    return (
        <Box
            flexGrow={1}
            marginY={2}
            paddingX={2}
            paddingY={1}
            textAlign={style?.textAlign ?? "center"}
            width={"100%"}
        >
            <Text
                borderRadius={12}
                color={"gray.1000"}
                textStyle={"b4"}
                noOfLines={5}
            >
                {description}
            </Text>
        </Box>
    )
}

export const ElementTechnology: FC<{
    technology: string;
    style?: CSSProperties;
}> = ({
    technology,
    style
}) => {
    return (
        <HStack
            flexGrow={0}
            justify={"center"}
            paddingX={2}
            paddingY={1}
            height={"24px"}
            width={"100%"}
        >
            <Text
                color={"gray.400"}
                textStyle={"b4"}
                noOfLines={1}
            >
                {technology}
            </Text>
        </HStack>
    );
}

export const ElementNumberLabel: FC<{
    number: number;
    style?: CSSProperties;
}> = ({
    number,
    style
}) => {
    return (
        <Box paddingX={"10px"} position={"absolute"} right={"4px"} bottom={"8px"}>
            <Text color={"gray.700"} textStyle={"b5"}>
                {number}
            </Text>
        </Box>
    )
}

export const ElementFlowShortcut: FC<{
    shortcutKeys: string;
}> = ({
    shortcutKeys,
}) => {
    return (
        <Box
            borderColor={"gray.400"}
            borderRadius={8}
            borderWidth={1}
            paddingX={2}
        >
            {shortcutKeys}
        </Box>
    )
}
import { FC, useCallback, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { C4AbstractioInfo } from "./LabelTypes";
import { Abstraction, AbstractionTypeCode } from "./types";
import { getAbstractionBgColor } from "./utils";

export type C4RectangleProps = {
    abstraction: Abstraction;
    bgColor?: string;
}

export const C4RectangleNode: FC<NodeProps<C4RectangleProps>> = ({ data, selected }) => {
    const defaultBorderColor = useColorModeValue("blackAlpha.400", "whiteAlpha.400");
    const highlightBorderColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

    return (
        <Flex
            bgColor={data.bgColor}
            borderWidth={1}
            borderColor={selected ? highlightBorderColor : defaultBorderColor}
            borderRadius={"2xl"}
            align={"center"}
            justify={"center"}
            padding={2}
            width={240}
            height={150}
            textColor={"whiteAlpha.900"}
        >
            <C4AbstractioInfo
                data={data.abstraction}
                align={"center"}
                showTechnologies
                showDescription
            />
            <Handle position={Position.Left} id="a" type={"source"} />
            <Handle position={Position.Top} id="b" type={"source"} />
            <Handle position={Position.Right} id="c" type={"source"} />
            <Handle position={Position.Bottom} id="d" type={"source"} />
        </Flex>
    );
};

export type C4ScopeProps = {
    abstraction: Abstraction;
    draggedOver?: boolean;
}

export const C4ScopeNode: FC<NodeProps<C4ScopeProps>> = ({ data, selected }) => {
    const defaultBgColor = useColorModeValue("blackAlpha.300", "blackAlpha.400");
    const highlightBgColor = useColorModeValue("blackAlpha.400", "blackAlpha.500");
    
    const defaultBorderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
    const highlightBorderColor = useColorModeValue("blackAlpha.400", "whiteAlpha.400");

    const [size, setSize] = useState([1200, 600]);

    const onResize = useCallback((event, params) => {
        setSize([params.width, params.height]);
    }, []);

    return (
        <Flex
            bgColor={data.draggedOver || selected
                ? highlightBgColor
                : defaultBgColor
            }
            borderWidth={1}
            borderColor={data.draggedOver || selected
                ? highlightBorderColor
                : defaultBorderColor
            }
            align={"end"}
            padding={2}
            width={size[0]}
            height={size[1]}
        >
            <C4AbstractioInfo
                data={data.abstraction}
                align={"start"}
                showTechnologies
            />
            <NodeResizer
                isVisible={selected}
                minWidth={280}
                minHeight={200}
                handleStyle={{ width: 7, height: 7 }}
                lineStyle={{ borderWidth: 0 }}
                onResize={onResize}
            />
        </Flex>
    );
};  


export type C4RectangleDraggableProps = {
    typeCode: AbstractionTypeCode,
    title: string,
    onDragStart: (event: any, typeCode: string) => void
}

export const C4RectangleDraggable: FC<C4RectangleDraggableProps> = ({
    typeCode,
    title,
    onDragStart
}) => {
    return (
        <Box
            borderRadius={"md"}
            bgColor={getAbstractionBgColor(typeCode)}
            draggable
            fontSize={"xs"}
            padding={2}
            textColor={"whiteAlpha.900"}
            textAlign={"center"}
            _hover={{ opacity: .7 }}
            onDragStart={(event) => onDragStart(event, typeCode)}
        >
            <Text>{title}</Text>
        </Box>
    );
};

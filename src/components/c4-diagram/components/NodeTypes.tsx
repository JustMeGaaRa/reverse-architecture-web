import '@reactflow/node-resizer/dist/style.css';

import { FC, useCallback, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { C4AbstractioInfo } from "./LabelTypes";
import { Element, ElementType } from "../types/Diagram";
import { ElementBgColors } from "../utils/Graph";

export type C4RectangleProps = Element & {
    width?: number;
    height?: number;
};

export const C4RectangleNode: FC<NodeProps<C4RectangleProps>> = ({ data, selected }) => {
    const defaultBorderColor = useColorModeValue("blackAlpha.400", "whiteAlpha.400");
    const highlightBorderColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

    return (
        <Flex
            background={ElementBgColors[data.type]}
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
                data={data}
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

export type C4ScopeProps = Element & {
    width?: number;
    height?: number;
    draggedOver?: boolean;
}

export const C4ScopeNode: FC<NodeProps<C4ScopeProps>> = ({ data, selected }) => {
    const defaultBgColor = useColorModeValue("blackAlpha.300", "blackAlpha.400");
    const highlightBgColor = useColorModeValue("blackAlpha.400", "blackAlpha.500");
    
    const defaultBorderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
    const highlightBorderColor = useColorModeValue("blackAlpha.400", "whiteAlpha.400");

    const [size, setSize] = useState([data.width, data.height]);

    const onResize = useCallback((event, params) => {
        setSize([params.width, params.height]);
    }, []);

    return (
        <Flex
            background={data.draggedOver || selected
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
                data={data}
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
    type: ElementType,
    name: string,
    onDragStart: (event: any, typeCode: string) => void
}

export const C4RectangleDraggable: FC<C4RectangleDraggableProps> = ({
    type,
    name,
    onDragStart
}) => {
    return (
        <Box
            background={ElementBgColors[type]}
            borderRadius={"md"}
            cursor={"pointer"}
            draggable
            fontSize={"xs"}
            padding={2}
            textColor={"whiteAlpha.900"}
            textAlign={"center"}
            _hover={{ opacity: .7 }}
            onDragStart={(event) => onDragStart(event, type)}
        >
            <Text>{name}</Text>
        </Box>
    );
};

import '@reactflow/node-resizer/dist/style.css';

import { FC, useCallback, useState } from "react";
import { Handle, NodeProps, Position } from "@reactflow/core";
import { NodeResizer } from "@reactflow/node-resizer";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { FaPlus } from 'react-icons/fa';
import { C4ElementInfo } from "./LabelTypes";
import { Element } from "../types/Diagram";
import { ElementBgColors } from "../utils/Graph";

type C4RectangleProps = Element & {
    width?: number;
    height?: number;
};

const C4RectangleNode: FC<NodeProps<C4RectangleProps>> = ({ data, selected }) => {
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
            <C4ElementInfo
                data={data}
                align={"center"}
                showTechnologies
                showDescription
            />
            <Handle id="a" type={"source"} position={Position.Left} />
            <Handle id="b" type={"source"} position={Position.Top} />
            <Handle id="c" type={"source"} position={Position.Right} />
            <Handle id="d" type={"source"} position={Position.Bottom} />
        </Flex>
    );
};

type C4ElementPlaceholderProps = unknown;

const C4ElementPlaceholder: FC<NodeProps<C4ElementPlaceholderProps>> = () => {
    return (
        <Flex
            borderWidth={2}
            border={"dashed"}
            borderColor={"whiteAlpha.700"}
            borderRadius={"2xl"}
            align={"center"}
            justify={"center"}
            padding={2}
            width={240}
            height={150}
        >
            <FaPlus size={"30"} />
        </Flex>
    )
}

type C4ScopeProps = Element & {
    width?: number;
    height?: number;
    draggedOver?: boolean;
}

const C4ScopeNode: FC<NodeProps<C4ScopeProps>> = ({ data, selected }) => {
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
            <C4ElementInfo
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

export {
    C4RectangleNode,
    C4ScopeNode,
    C4ElementPlaceholder,
    C4RectangleProps,
    C4ScopeProps,
    C4ElementPlaceholderProps
}
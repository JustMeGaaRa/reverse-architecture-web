import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { C4AbstractioInfo } from "../info/C4AbstractionInfo";
import { Abstraction } from "../types";

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

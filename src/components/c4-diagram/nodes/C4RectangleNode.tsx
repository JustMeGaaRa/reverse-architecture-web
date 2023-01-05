import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Flex } from "@chakra-ui/react";
import { C4AbstractioInfo } from "../info/C4AbstractionInfo";
import { Abstraction } from "../types";

export interface IAbstractionProps {
    abstraction: Abstraction;
    bgColor?: string;
}

export const C4RectangleNode: FC<NodeProps<IAbstractionProps>> = ({ data, selected }) => {
    return (
        <Flex
            bgColor={data.bgColor}
            border={"dashed"}
            borderWidth={2}
            borderColor={selected ? "whiteAlpha.500" : "whiteAlpha.100"}
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

import { FC, useState } from "react";
import { NodeProps } from "@reactflow/core";
import { Flex } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export type ElementPlaceholderProps = {
    width?: number;
    height?: number;
};

export const ElementPlaceholder: FC<NodeProps<ElementPlaceholderProps>> = ({
    data
}) => {
    const [size] = useState({
        width: data.width ?? 240,
        height: data.height ?? 150
    });

    return (
        <Flex
            borderWidth={2}
            border={"dashed"}
            borderColor={"whiteAlpha.700"}
            borderRadius={"2xl"}
            align={"center"}
            justify={"center"}
            padding={2}
            width={size.width}
            height={size.height}
        >
            <FaPlus size={"30"} />
        </Flex>
    );
}
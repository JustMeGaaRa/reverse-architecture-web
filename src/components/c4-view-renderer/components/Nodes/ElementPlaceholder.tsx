import { FC } from "react";
import { NodeProps } from "@reactflow/core";
import { Flex } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export type ElementPlaceholderProps = unknown;

export const ElementPlaceholder: FC<NodeProps<ElementPlaceholderProps>> = () => {
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
    );
}
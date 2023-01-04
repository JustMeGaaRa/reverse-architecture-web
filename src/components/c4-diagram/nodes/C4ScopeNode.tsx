import "@reactflow/node-resizer/dist/style.css";

import { FC, useCallback, useState } from "react";
import { NodeProps } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import { Flex } from "@chakra-ui/react";
import { C4AbstractioInfo } from "../info/C4AbstractionInfo";
import { Abstraction } from "../types";

export interface IScopeProps {
  abstraction: Abstraction;
  draggedOver?: boolean;
}

export const C4ScopeNode: FC<NodeProps<IScopeProps>> = ({ data, selected }) => {
    const [size, setSize] = useState([1040, 600]);

    const onResize = useCallback((event, params) => {
        setSize([params.width, params.height]);
    }, []);

    return (
        <Flex
            bgColor={data.draggedOver ? "gray.200" : "gray.100"}
            border={"dashed"}
            borderWidth={2}
            borderColor={data.draggedOver || selected ? "blue.500" : "blackAlpha.500"}
            align={"end"}
            padding={2}
            width={size[0]}
            height={size[1]}
            textColor={"blackAlpha.900"}
        >
            <C4AbstractioInfo
                data={data.abstraction}
                align={"start"}
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

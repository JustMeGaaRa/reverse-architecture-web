import "@reactflow/node-resizer/dist/style.css";

import { FC, useCallback, useState } from "react";
import { NodeProps } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { C4AbstractioInfo } from "../info/C4AbstractionInfo";
import { Abstraction } from "../types";

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

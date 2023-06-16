import { Flex } from "@chakra-ui/react";
import { NodeResizer } from "@reactflow/node-resizer";
import {
    Element,
    ElementStyleProperties,
} from "@structurizr/dsl";
import { FC, useCallback, useState  } from "react";
import { BoundaryElementLabel } from "./BoundaryElementLabel";

export const BoundaryElement: FC<{
    data: Element;
    style: ElementStyleProperties;
    width?: number;
    height?: number;
    selected?: boolean,
}> = ({
    data,
    style,
    width,
    height,
    selected,
}) => {
    const [size, setSize] = useState({ width, height });
    const onResize = useCallback((event, params) => {
        setSize({
            width: params.width,
            height: params.height,
        });
    }, []);

    return (
        <Flex
            backgroundColor={style.background}
            border={"dashed"}
            borderWidth={2}
            borderColor={style.stroke}
            align={"end"}
            justify={"start"}
            padding={2}
            width={size.width}
            height={size.height}
            textColor={style.color}
        >
            <BoundaryElementLabel
                data={data}
                style={style}
            />
            <NodeResizer
                isVisible={selected}
                minWidth={380}
                minHeight={320}
                handleStyle={{ width: 7, height: 7 }}
                lineStyle={{ borderWidth: 0 }}
                onResize={onResize}
            />
        </Flex>
    );
}

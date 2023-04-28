import { Flex } from "@chakra-ui/react";
import { NodeResizer } from "@reactflow/node-resizer";
import {
    Element,
    ElementStyleProperties,
} from "@structurizr/dsl";
import { FC  } from "react";
import { ExpandedElementLabel } from "./BoundaryElementLabel";

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
    // const { setElementDimension } = useWorkspaceStore();
    // const onResize = useCallback((event, params) => {
    //     setElementDimension({
    //         // TODO: add view identifier
    //         ...params,
    //         elementIdentifier: data.identifier
    //     });
    // }, [setElementDimension, data]);

    return (
        <Flex
            border={"dashed"}
            borderWidth={2}
            borderColor={style.stroke}
            align={"end"}
            justify={"start"}
            padding={2}
            width={width}
            height={height}
            textColor={style.color}
        >
            
            <ExpandedElementLabel
                data={data}
                style={style}
            />
            <NodeResizer
                isVisible={selected}
                minWidth={380}
                minHeight={320}
                handleStyle={{ width: 7, height: 7 }}
                lineStyle={{ borderWidth: 0 }}
                // onResize={onResize}
            />
        </Flex>
    );
}

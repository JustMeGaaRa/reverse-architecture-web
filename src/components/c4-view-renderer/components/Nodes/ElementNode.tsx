import '@reactflow/node-resizer/dist/style.css';

import { FC, useCallback, useState } from "react";
import { Handle, NodeProps, Position } from "@reactflow/core";
import { NodeResizer } from "@reactflow/node-resizer";
import { Expanded, RoundedBox } from '../Shapes';
import { ElementLabel } from "../Labels/ElementLabel";
import { ElementBgColors } from "../../utils/Graph";
import { Element } from "../../../structurizr-dsl/Diagram";

export type ElementNodeProps = Element & {
    expanded?: boolean;
    width?: number;
    height?: number;
    draggedOver?: boolean;
};

export const ElementNode: FC<NodeProps<ElementNodeProps>> = ({
    data,
    selected
}) => {
    const [size, setSize] = useState({
        width: data.width ?? 240,
        height: data.height ?? 150
    });
    const onResize = useCallback((event, params) => setSize({ ...params }), []);

    return data.expanded ? (
        <Expanded
            width={size.width}
            height={size.height}
            selected={data.draggedOver || selected}
        >
            <ElementLabel
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
        </Expanded>
    )
    : (
        <RoundedBox
            background={ElementBgColors[data.type]}
            width={size.width}
            height={size.height}
            selected={data.draggedOver || selected}
        >
            <ElementLabel
                data={data}
                align={"center"}
                showTechnologies
                showDescription
            />
            <Handle id={"a"} type={"source"} position={Position.Left} />
            <Handle id={"b"} type={"source"} position={Position.Top} />
            <Handle id={"c"} type={"source"} position={Position.Right} />
            <Handle id={"d"} type={"source"} position={Position.Bottom} />
        </RoundedBox>
    );
}
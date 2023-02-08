import '@reactflow/node-resizer/dist/style.css';

import { FC, useCallback, useState } from "react";
import { Handle, NodeProps, Position } from "@reactflow/core";
import { NodeResizer } from "@reactflow/node-resizer";
import { Expanded, RoundedBox } from '../Shapes';
import { ElementLabel } from "../Labels/ElementLabel";
import { Element } from "../../store/C4Diagram";
import { defaultElementStyle, ElementStyleProperties } from '../../store/C4Diagram';

export type ElementNodeProps = {
    data: Element,
    style?: Partial<ElementStyleProperties>;
    width?: number;
    height?: number;
    selected?: boolean;
    expanded?: boolean;
}

export const ElementNode: FC<ElementNodeProps> = ({
    data,
    style = defaultElementStyle,
    width = 240,
    height = 150,
    selected = false,
    expanded = false
}) => {
    const [size, setSize] = useState({ width, height });
    const onResize = useCallback((event, params) => setSize({ ...params }), []);
    
    return expanded ? (
        <Expanded
            width={size.width}
            height={size.height}
            selected={selected}
        >
            <ElementLabel
                data={data}
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
        </Expanded>
    )
    : (
        <RoundedBox
            background={style.background}
            width={size.width}
            height={size.height}
            selected={selected}
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

export type ElementNodeWrapperProps = {
    element: Element;
    style?: Partial<ElementStyleProperties>;
    width?: number;
    height?: number;
    expanded?: boolean;
    draggedOver?: boolean;
}

export const ElementNodeWrapper: FC<NodeProps<ElementNodeWrapperProps>> = ({
    data,
    selected
}) => {
    return (
        <ElementNode
            data={data.element}
            style={data.style ?? defaultElementStyle}
            width={data.width}
            height={data.height}
            selected={data.draggedOver || selected}
            expanded={data.expanded}
        />
    );
}
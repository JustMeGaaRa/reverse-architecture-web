import {
    defaultElementStyle,
    Element,
    ElementStyle,
    ElementStyleProperties,
    foldStyles,
} from "@structurizr/dsl";
import { NodeProps } from "@reactflow/core";
import { FC, useMemo } from "react";

export function ReactFlowNodeWrapper(NodeElement: FC<{
    data: Element;
    style: ElementStyleProperties;
    width?: number;
    height?: number;
    selected?: boolean;
}>): FC<NodeProps<{
    element: Element;
    style: ElementStyle;
    width?: number;
    height?: number;
    draggedOver?: boolean;
}>> {
    return function WrappedNode({
        data,
        selected,
    }) {
        const elementStyle = useMemo(() => foldStyles(
                defaultElementStyle,
                data.style,
                data.element.tags
        ), [data.style, data.element.tags]);

        return (
            <NodeElement
                data={data.element}
                style={elementStyle ?? defaultElementStyle}
                width={data.width}
                height={data.height}
                selected={data.draggedOver || selected}
            />
        )
    }
}
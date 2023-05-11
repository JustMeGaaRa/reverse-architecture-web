import {
    aggrerateStyles,
    defaultElementStyle,
    Element,
    ElementStyle,
    ElementStyleProperties,
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
        const elementStyle = useMemo(() => {
            const tags = data.element.tags
                ? [...data.element.tags].reverse()
                : [];
            return data.element.tags
                ? aggrerateStyles(defaultElementStyle, data.style, tags)
                : defaultElementStyle;
        }, [data.style, data.element.tags]);

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
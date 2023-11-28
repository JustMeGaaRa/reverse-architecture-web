import { NodeProps } from "@reactflow/core";
import {
    IElement,
    ElementStyle,
    ElementStyleProperties,
    foldStyles
} from "@structurizr/dsl";
import { ReverseArchitectureElementStyle } from "@workspace/core";
import { FC, useMemo } from "react";

export function ReactFlowNodeWrapper(ElementNodeComponent: FC<{
    data: IElement;
    style: ElementStyleProperties;
    width?: number;
    height?: number;
    selected?: boolean;
}>): FC<NodeProps<{
    element: IElement;
    style: ElementStyle;
    width?: number;
    height?: number;
}>> {
    return function ReactFlowNodeComponent({ data, selected }) {
        const elementStyle = useMemo(() => foldStyles(
                ReverseArchitectureElementStyle,
                data.style,
                data.element.tags
        ), [data.style, data.element.tags]);

        return (
            <ElementNodeComponent
                data={data.element}
                style={elementStyle}
                width={data.width}
                height={data.height}
                selected={selected}
            />
        )
    }
}
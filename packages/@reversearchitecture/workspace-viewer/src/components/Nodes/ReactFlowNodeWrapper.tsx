import {
    StructurizrElementTagDefaultStyle,
    IElement,
    ElementStyle,
    ElementStyleProperties,
    foldStyles
} from "@structurizr/dsl";
import { NodeProps } from "@reactflow/core";
import { FC, useMemo } from "react";
import { ReverseArchitectureElementStyle } from "../../types";
import { useTextEditMode, useWorkspaceToolbarStore } from "../../hooks";

export function ReactFlowNodeWrapper(NodeElement: FC<{
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
    draggedOver?: boolean;
}>> {
    return function WrappedNode({
        data,
        selected,
    }) {
        const elementStyle = useMemo(() => foldStyles(
                ReverseArchitectureElementStyle,
                data.style,
                data.element.tags
        ), [data.style, data.element.tags]);
        const { isTextEditEnabled } = useWorkspaceToolbarStore();

        return (
            <NodeElement
                data={data.element}
                style={elementStyle}
                width={data.width}
                height={data.height}
                selected={data.draggedOver || selected || isTextEditEnabled}
            />
        )
    }
}
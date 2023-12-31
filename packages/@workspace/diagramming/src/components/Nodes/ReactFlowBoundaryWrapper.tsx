import { NodeProps, useReactFlow, useStore } from "@reactflow/core";
import { NodeResizer } from "@reactflow/node-resizer";
import {
    IElement,
    ElementStyle,
    ElementStyleProperties,
    foldStyles,
} from "@structurizr/dsl";
import { ReverseArchitectureElementStyle } from "@workspace/core";
import { FC, PropsWithChildren, useCallback, useMemo } from "react";
import { nodeSelector } from "../../utils";

export function ReactFlowBoundaryWrapper(ElementBoundaryComponent: FC<PropsWithChildren<{
    element: IElement;
    style: ElementStyleProperties;
    width?: number;
    height?: number;
    isSelected?: boolean;
    isHovered?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}>>): FC<NodeProps<{
    element: IElement;
    style: ElementStyle;
    width?: number;
    height?: number;
}>> {
    return function ReactFlowBoundaryComponent({ data, selected }) {
        const elementStyle = useMemo(() => foldStyles(
                ReverseArchitectureElementStyle,
                data.style,
                data.element.tags
        ), [data.style, data.element.tags]);
        const { selectedNodes } = useStore(nodeSelector);
        const { setNodes } = useReactFlow();
        
        // TODO: consider using useResizeObserver
        // TODO: set element size in the workspace view metadata
        const onResize = useCallback((event, params) => {
            setNodes(nodes => {
                return nodes.map(node => node.id !== data.element.identifier
                    ? node
                    : {
                        ...node,
                        data: {
                            ...node.data,
                            width: params.width,
                            height: params.height,
                        },
                    })
            });
        }, [data.element.identifier, setNodes]);

        return (
            <ElementBoundaryComponent
                element={data.element}
                style={elementStyle}
                height={data.height}
                width={data.width}
                isSelected={selected}
            >
                <NodeResizer
                    isVisible={selected && selectedNodes.length === 1}
                    color={elementStyle.stroke}
                    minWidth={300}
                    minHeight={300}
                    handleStyle={{
                        backgroundColor: "#E3FB51",
                        borderWidth: 0,
                        borderRadius: 2,
                        width: 7,
                        height: 7,
                    }}
                    lineStyle={{ borderWidth: 0 }}
                    onResize={onResize}
                />
            </ElementBoundaryComponent>
        )
    }
}
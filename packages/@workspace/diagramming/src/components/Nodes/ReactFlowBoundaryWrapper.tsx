import { NodeProps, useReactFlow } from "@reactflow/core";
import { NodeResizer } from "@reactflow/node-resizer";
import {
    IElement,
    ElementStyle,
    ElementStyleProperties,
    foldStyles,
    Tag
} from "@structurizr/dsl";
import { ReverseArchitectureElementStyle } from "@workspace/core";
import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { ElementOptionsToolbar } from "./ElementOptionsToolbar";
import { ElementZoomControl } from "./ElementZoomControl";

export function ReactFlowBoundaryWrapper(ElementBoundaryComponent: FC<PropsWithChildren<{
    data: IElement;
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
        const [ isElementHovered, setIsElementHovered ] = useState(false);
    
        const showZoomPanel = selected || isElementHovered;
        const showZoomIn = false;
        const showZoomOut = data.element.tags.some(tag => tag.name === Tag.SoftwareSystem.name || tag.name === Tag.Container.name);
        
        // TODO: consider using useResizeObserver
        // TODO: set element size in the workspace view metadata
        const { setNodes } = useReactFlow();
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

        const handleOnMouseEnterElement = useCallback(() => {
            setIsElementHovered(true);
        }, []);

        const handleOnMouseLeaveElement = useCallback(() => {
            setIsElementHovered(false);
        }, []);

        const handleOnZoomInClick = useCallback(() => {
            // TODO: call zoom function from the workspace hook
            console.log("zoom in")
        }, []);

        const handleOnZoomOutClick = useCallback(() => {
            // TODO: call zoom function from the workspace hook
            console.log("zoom out")
        }, []);

        return (
            <ElementBoundaryComponent
                data={data.element}
                style={elementStyle}
                height={data.height}
                width={data.width}
                isHovered={isElementHovered}
                isSelected={selected}
                onMouseEnter={handleOnMouseEnterElement}
                onMouseLeave={handleOnMouseLeaveElement}
            >
                <NodeResizer
                    isVisible={selected}
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
                <ElementZoomControl
                    isPanelVisible={showZoomPanel}
                    isZoomInVisible={showZoomIn}
                    isZoomOutVisible={showZoomOut}
                    onZoomInClick={handleOnZoomInClick}
                    onZoomOutClick={handleOnZoomOutClick}
                />

                <ElementOptionsToolbar />
            </ElementBoundaryComponent>
        )
    }
}
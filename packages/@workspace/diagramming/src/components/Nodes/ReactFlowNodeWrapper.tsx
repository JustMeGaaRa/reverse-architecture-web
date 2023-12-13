import { NodeProps, Position, useStore } from "@reactflow/core";
import {
    IElement,
    ElementStyle,
    ElementStyleProperties,
    foldStyles,
    Tag
} from "@structurizr/dsl";
import { ReverseArchitectureElementStyle } from "@workspace/core";
import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { ElementFlowHandle, ElementFlowShortcut } from "./ElementHandle";
import { ElementOptionsToolbar } from "./ElementOptionsToolbar";
import { ElementShapeSelector } from "./ElementShapeSelector";
import { ElementZoomControl } from "./ElementZoomControl";
import { ReactFlowNodeHandle } from "./ReactFlowNodeHandle";

export function ReactFlowNodeWrapper(ElementNodeComponent: FC<PropsWithChildren<{
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
    return function ReactFlowNodeComponent({ id, data, selected }) {
        const elementStyle = useMemo(() => foldStyles(
                ReverseArchitectureElementStyle,
                data.style,
                data.element.tags
        ), [data.style, data.element.tags]);
        const [ isElementHovered, setIsElementHovered ] = useState(false);
        
        const isTarget = useStore(state => state.connectionNodeId && state.connectionNodeId !== data.element.identifier);
        const showZoomPanel = selected || isElementHovered;
        const showZoomIn = data.element.tags.some(tag => tag.name === Tag.SoftwareSystem.name || tag.name === Tag.Container.name);
        const showZoomOut = false;

        const handleOnMouseEnterElement = useCallback(() => {
            setIsElementHovered(true);
        }, []);

        const handleOnMouseLeaveElement = useCallback(() => {
            setIsElementHovered(false);
        }, []);

        const handleOnClickHandle = useCallback(() => {

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
            <ElementNodeComponent
                data={data.element}
                style={elementStyle}
                height={data.height}
                width={data.width}
                isHovered={isElementHovered}
                isSelected={selected}
                onMouseEnter={handleOnMouseEnterElement}
                onMouseLeave={handleOnMouseLeaveElement}
            >
                <ElementFlowHandle
                    position={Position.Left}
                    isHovered={isElementHovered}
                    isSelected={selected}
                    onClick={handleOnClickHandle}
                >
                    <ElementShapeSelector style={{ ...elementStyle, opacity: 0.4 }}>
                        <ElementFlowShortcut shortcutKeys={"Ctrl + ←"} />
                    </ElementShapeSelector>
                </ElementFlowHandle>
                
                <ElementFlowHandle
                    position={Position.Right}
                    isHovered={isElementHovered}
                    isSelected={selected}
                    onClick={handleOnClickHandle}
                >
                    <ElementShapeSelector style={{ ...elementStyle, opacity: 0.4 }}>
                        <ElementFlowShortcut shortcutKeys={"Ctrl + →"} />
                    </ElementShapeSelector>
                </ElementFlowHandle>
                
                <ElementFlowHandle
                    position={Position.Top}
                    isHovered={isElementHovered}
                    isSelected={selected}
                    onClick={handleOnClickHandle}
                >
                    <ElementShapeSelector style={{ ...elementStyle, opacity: 0.4 }}>
                        <ElementFlowShortcut shortcutKeys={"Ctrl + ↑"} />
                    </ElementShapeSelector>
                </ElementFlowHandle>
                
                <ElementFlowHandle
                    position={Position.Bottom}
                    isHovered={isElementHovered}
                    isSelected={selected}
                    onClick={handleOnClickHandle}
                >
                    <ElementShapeSelector style={{ ...elementStyle, opacity: 0.4 }}>
                        <ElementFlowShortcut shortcutKeys={"Ctrl + ↓"} />
                    </ElementShapeSelector>
                </ElementFlowHandle>

                <ElementOptionsToolbar />

                {isTarget && (
                    <ReactFlowNodeHandle
                        position={Position.Left}
                        type={"target"}
                    />
                )}

                <ElementZoomControl
                    isPanelVisible={showZoomPanel}
                    isZoomInVisible={showZoomIn}
                    isZoomOutVisible={showZoomOut}
                    onZoomInClick={handleOnZoomInClick}
                    onZoomOutClick={handleOnZoomOutClick}
                />
            </ElementNodeComponent>
        )
    }
}
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
import { ElementShapeSelector } from "./ElementNode";
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
    return function ReactFlowNodeComponent({ data, selected }) {
        const elementStyle = useMemo(() => foldStyles(
                ReverseArchitectureElementStyle,
                data.style,
                data.element.tags
        ), [data.style, data.element.tags]);
        const [ isElementHovered, setIsElementVisible ] = useState(false);
        
        const isTarget = useStore(state => state.connectionNodeId && state.connectionNodeId !== data.element.identifier);
        const showZoomIn = data.element.tags.some(tag => tag.name === Tag.SoftwareSystem.name || tag.name === Tag.Container.name);
        const showZoomOut = data.element.tags.some(tag => tag.name === Tag.Container.name || tag.name === Tag.Component.name);

        const handleOnMouseEnterElement = useCallback(() => {
            setIsElementVisible(true);
        }, []);

        const handleOnMouseLeaveElement = useCallback(() => {
            setIsElementVisible(false);
        }, []);

        const handleOnClickHandle = useCallback(() => {

        }, []);

        const handleOnZoomClick = useCallback(() => {
            // TODO: call zoom function from the workspace hook
            console.log("zoom")
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
                    <ElementShapeSelector
                        isSelected={selected}
                        style={{ ...elementStyle, opacity: 0.4 }}
                    >
                        <ElementFlowShortcut shortcutKeys={"Ctrl + ←"} />
                    </ElementShapeSelector>
                </ElementFlowHandle>
                
                <ElementFlowHandle
                    position={Position.Right}
                    isHovered={isElementHovered}
                    isSelected={selected}
                    onClick={handleOnClickHandle}
                >
                    <ElementShapeSelector
                        isSelected={selected}
                        style={{ ...elementStyle, opacity: 0.4 }}
                    >
                        <ElementFlowShortcut shortcutKeys={"Ctrl + →"} />
                    </ElementShapeSelector>
                </ElementFlowHandle>
                
                <ElementFlowHandle
                    position={Position.Top}
                    isHovered={isElementHovered}
                    isSelected={selected}
                    onClick={handleOnClickHandle}
                >
                    <ElementShapeSelector
                        isSelected={selected}
                        style={{ ...elementStyle, opacity: 0.4 }}
                    >
                        <ElementFlowShortcut shortcutKeys={"Ctrl + ↑"} />
                    </ElementShapeSelector>
                </ElementFlowHandle>
                
                <ElementFlowHandle
                    position={Position.Bottom}
                    isHovered={isElementHovered}
                    isSelected={selected}
                    onClick={handleOnClickHandle}
                >
                    <ElementShapeSelector
                        isSelected={selected}
                        style={{ ...elementStyle, opacity: 0.4 }}
                    >
                        <ElementFlowShortcut shortcutKeys={"Ctrl + ↓"} />
                    </ElementShapeSelector>
                </ElementFlowHandle>

                {isTarget && (
                    // TODO: move to react flow node wrapper
                    <ReactFlowNodeHandle
                        position={Position.Left}
                        type={"target"}
                    />
                )}
                <ElementZoomControl
                    isVisible={selected || isElementHovered}
                    onZoomClick={handleOnZoomClick}
                />
            </ElementNodeComponent>
        )
    }
}
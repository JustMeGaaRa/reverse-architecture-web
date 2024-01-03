import { Icon } from "@chakra-ui/react";
import { Handle, NodeProps, Position, useStore } from "@reactflow/core";
import {
    IElement,
    ElementStyle,
    ElementStyleProperties,
    foldStyles,
} from "@structurizr/dsl";
import { ReverseArchitectureElementStyle } from "@workspace/core";
import { Lock } from "iconoir-react";
import { FC, PropsWithChildren, useMemo } from "react";
import { ElementLockedIcon } from "./ElementLockedIcon";

export function ReactFlowNodeWrapper(ElementNodeComponent: FC<PropsWithChildren<{
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
    return function ReactFlowNodeComponent({ id, data, selected }) {
        const elementStyle = useMemo(() => foldStyles(
                ReverseArchitectureElementStyle,
                data.style,
                data.element.tags
        ), [data.style, data.element.tags]);
        
        const isTarget = useStore(state => state.connectionNodeId && state.connectionNodeId !== data.element.identifier);

        return (
            <ElementNodeComponent
                element={data.element}
                style={elementStyle}
                height={data.height}
                width={data.width}
                isSelected={selected}
            >
                <ElementLockedIcon nodeId={id} />
                <Handle
                    id={"handle-source-bottom"}
                    position={Position.Bottom}
                    type={"source"}
                    style={{ background: "none", border: "none" }}
                />
                <Handle
                    id={"handle-source-left"}
                    position={Position.Left}
                    type={"source"}
                    style={{ background: "none", border: "none" }}
                />
                <Handle
                    id={"handle-source-right"}
                    position={Position.Right}
                    type={"source"}
                    style={{ background: "none", border: "none" }}
                />
                <Handle
                    id={"handle-source-top"}
                    position={Position.Top}
                    type={"source"}
                    style={{ background: "none", border: "none" }}
                />
                <Handle
                    id={"handle-target"}
                    type={"target"}
                    position={Position.Left}
                    style={{
                        background: "none",
                        border: "none",
                        inset: "auto",
                        transform: "none",
                        height: "100%",
                        width: "100%",
                        display: isTarget ? "block" : "none",
                    }}
                />
            </ElementNodeComponent>
        )
    }
}
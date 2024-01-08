import { Handle, NodeProps, Position } from "@reactflow/core";
import { IElement } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";

export function ReactFlowModelNodeWrapper(ElementNodeComponent: FC<PropsWithChildren<{
    element: IElement;
    elementChildrenCount?: number;
    isSelected?: boolean;
    isHovered?: boolean;
}>>): FC<NodeProps<{
    element: IElement;
    elementChildrenCount?: number;
}>> {
    return function ReactFlowNodeComponent({ id, data, selected }) {
        return (
            <ElementNodeComponent
                element={data.element}
                elementChildrenCount={data.elementChildrenCount}
                isSelected={selected}
            >
                <Handle
                    id={"handle-source-bottom"}
                    type={"source"}
                    position={Position.Bottom}
                    style={{
                        background: "none",
                        border: "none",
                        pointerEvents: "none",
                        bottom: "0px",
                    }}
                />
                <Handle
                    id={"handle-target-top"}
                    type={"target"}
                    position={Position.Top}
                    style={{
                        background: "none",
                        border: "none",
                        pointerEvents: "none",
                        top: "0px",
                    }}
                />
            </ElementNodeComponent>
        )
    }
}
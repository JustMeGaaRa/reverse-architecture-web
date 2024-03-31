import { Handle, Position } from "@reactflow/core";
import { FC } from "react";
import { useNode } from "../../hooks";
import { ReactFlowModelNodeProps, StructurizrModelElementProps } from "./StructurizrViewElementProps";

export function ReactFlowModelElementAdapter(ElementNodeComponent: FC<StructurizrModelElementProps>): FC<ReactFlowModelNodeProps> {
    return function ReactFlowNodeComponent({ id, data, selected }) {
        const { isLocked } = useNode(id);

        return (
            <ElementNodeComponent
                element={data.element}
                elementChildrenCount={data.elementChildrenCount}
                isSelected={selected}
                isLocked={isLocked}
                variant={"model"}
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
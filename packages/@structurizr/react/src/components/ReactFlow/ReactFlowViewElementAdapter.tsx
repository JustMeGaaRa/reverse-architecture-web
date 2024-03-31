import { Handle, Position } from "@reactflow/core";
import { FC } from "react";
import { useNode } from "../../hooks";
import { ReactFlowNodeProps, StructurizrViewElementProps } from "./StructurizrViewElementProps";

export function ReactFlowViewElementAdapter(ElementNodeComponent: FC<StructurizrViewElementProps>): FC<ReactFlowNodeProps> {
    return function ReactFlowNodeComponent({ id, data, selected }) {
        const { isTarget, isLocked } = useNode(id);

        return (
            <ElementNodeComponent
                element={data.element}
                height={data.height}
                width={data.width}
                isSelected={selected}
                isLocked={isLocked}
                variant={"view"}
            >
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
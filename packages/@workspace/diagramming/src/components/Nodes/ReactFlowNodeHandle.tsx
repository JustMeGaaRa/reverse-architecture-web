import { Handle, HandleType, Position } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";

export const ReactFlowNodeHandle: FC<PropsWithChildren<{
    position?: Position;
    type?: HandleType;
}>> = ({
    children,
    position,
    type
}) => {
    return (
        <Handle
            id={"handle-target"}
            type={type}
            position={position}
            style={{
                background: "none",
                border: "none",
                inset: "auto",
                transform: "none",
                height: "100%",
                width: "100%",
            }}
        >
            {children}
        </Handle>
    )
}
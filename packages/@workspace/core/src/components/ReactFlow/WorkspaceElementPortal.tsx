import { ReactFlowState, useStore } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const WorkspaceElementPortal: FC<PropsWithChildren<{
    selector?: string;
}>> = ({
    children,
    selector = ".react-flow__renderer"
}) => {
    const { rendererNode } = useStore((state: ReactFlowState) => ({
        rendererNode: state.domNode?.querySelector(selector)
    }));

    return !rendererNode ? null : createPortal(children, rendererNode);
}
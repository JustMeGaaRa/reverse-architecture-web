import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { useToolbar } from "../hooks";

export const ToolbarPortal: FC<PropsWithChildren> = ({ children }) => {
    const { toolbarNode } = useToolbar();
    return !toolbarNode ? null : createPortal(children, toolbarNode);
}
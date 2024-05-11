import { Node, NodeProps } from "@reactflow/core";
import { IElement } from "@structurizr/dsl";
import { PropsWithChildren } from "react";
import { ElementVariant } from "../../contexts";

export type StructurizrViewElementProps = PropsWithChildren<{
    element: IElement;
    width?: number;
    height?: number;
    isSelected?: boolean;
    isHovered?: boolean;
    isLocked?: boolean;
    isReadonly?: boolean;
    variant?: ElementVariant;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}>

export type StructurizrViewElementData = {
    element: IElement;
    width?: number;
    height?: number;
}

export type ReactFlowNode = Node<StructurizrViewElementData>;

export type ReactFlowNodeProps = NodeProps<StructurizrViewElementData>;

export type StructurizrModelElementProps = PropsWithChildren<{
    element: IElement;
    elementChildrenCount?: number;
    isSelected?: boolean;
    isHovered?: boolean;
    isLocked?: boolean;
    variant?: ElementVariant;
}>

export type StructurizrModelElementData = {
    element: IElement;
    elementChildrenCount?: number;
}

export type ReactFlowModelNode = Node<StructurizrModelElementData>;

export type ReactFlowModelNodeProps = NodeProps<StructurizrModelElementData>;
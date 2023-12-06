import { BoundaryNode } from "./BoundaryNode";
import { DeploymentNode } from "./DeploymentNode";
import { ElementGroupNode } from "./ElementGroupNode";
import { ElementNode, ElementPlaceholderNode } from "./ElementNode";
import { ReactFlowNodeWrapper } from "./ReactFlowNodeWrapper";

export const ReactFlowElementNode = ReactFlowNodeWrapper(ElementNode); // TODO: allow changing shape
export const ReactFlowPlaceholderNode = ReactFlowNodeWrapper(ElementPlaceholderNode); // TODO: allow changing shape
export const ReactFlowBoundaryNode = ReactFlowNodeWrapper(BoundaryNode); // TODO: don't allow changing shape
export const ReactFlowGroupNode = ReactFlowNodeWrapper(ElementGroupNode); // TODO: don't allow changing shape
export const ReactFlowDeploymentNode = ReactFlowNodeWrapper(DeploymentNode); // TODO: don't allow changing shape

export const ReactFlowNodeTypes = {
    element: ReactFlowElementNode,
    placeholder: ReactFlowPlaceholderNode,
    elementGroup: ReactFlowGroupNode,
    boundary: ReactFlowBoundaryNode,
    deploymentNode: ReactFlowDeploymentNode,
}

export type ReactFlowNodeTypeKeys = keyof typeof ReactFlowNodeTypes;
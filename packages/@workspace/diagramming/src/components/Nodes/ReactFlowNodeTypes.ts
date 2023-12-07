import { BoundaryNode } from "./BoundaryNode";
import { DeploymentNode } from "./DeploymentNode";
import { ElementGroupNode } from "./ElementGroupNode";
import { ElementNode } from "./ElementNode";
import { ElementPlaceholderNode } from "./ElementPlaceholderNode";
import { ReactFlowBoundaryWrapper } from "./ReactFlowBoundaryWrapper";
import { ReactFlowNodeWrapper } from "./ReactFlowNodeWrapper";

export const ReactFlowElementNode = ReactFlowNodeWrapper(ElementNode);
export const ReactFlowPlaceholderNode = ReactFlowNodeWrapper(ElementPlaceholderNode);
export const ReactFlowBoundaryNode = ReactFlowBoundaryWrapper(BoundaryNode);
export const ReactFlowGroupNode = ReactFlowBoundaryWrapper(ElementGroupNode);
export const ReactFlowDeploymentNode = ReactFlowNodeWrapper(DeploymentNode);

export const ReactFlowNodeTypes = {
    element: ReactFlowElementNode,
    placeholder: ReactFlowPlaceholderNode,
    elementGroup: ReactFlowGroupNode,
    boundary: ReactFlowBoundaryNode,
    deploymentNode: ReactFlowDeploymentNode,
}

export type ReactFlowNodeTypeKeys = keyof typeof ReactFlowNodeTypes;
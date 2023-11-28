import { BoundaryNode } from "./BoundaryNode";
import { DeploymentNode } from "./DeploymentNode";
import { ElementNode } from "./ElementNode";
import { ReactFlowNodeWrapper } from "./ReactFlowNodeWrapper";

export * from "./BoundaryNode";
export * from "./DeploymentNode";
export * from "./ElementNode";
export * from "./ReactFlowNodeWrapper";

export const ReactFlowBoundaryNode = ReactFlowNodeWrapper(BoundaryNode);
export const ReactFlowElementNode = ReactFlowNodeWrapper(ElementNode);
export const ReactFlowDeploymentNode = ReactFlowNodeWrapper(DeploymentNode);

export const NodeTypes = {
    element: ReactFlowElementNode,
    boundary: ReactFlowBoundaryNode,
    deploymentNode: ReactFlowDeploymentNode,
}
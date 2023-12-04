import { BoundaryNode } from "./BoundaryNode";
import { DeploymentNode } from "./DeploymentNode";
import { ElementNode } from "./ElementNode";
import { ReactFlowNodeWrapper } from "./ReactFlowNodeWrapper";

export const ReactFlowElementNode = ReactFlowNodeWrapper(ElementNode);
export const ReactFlowBoundaryNode = ReactFlowNodeWrapper(BoundaryNode);
export const ReactFlowDeploymentNode = ReactFlowNodeWrapper(DeploymentNode);

export const ReactFlowNodeTypes = {
    element: ReactFlowElementNode,
    boundary: ReactFlowBoundaryNode,
    deploymentNode: ReactFlowDeploymentNode,
}
import { ElementNode, ElementPlaceholderNode } from "../Nodes";

export * from "./ElementLabel";
export * from "./ElementNode";
export * from "./ElementPlaceholderNode";

export const NodeTypes = {
    element: ElementNode,
    placeholder: ElementPlaceholderNode,
    // boundary: ReactFlowBoundaryNode,
    // deploymentNode: ReactFlowDeploymentNode,
}
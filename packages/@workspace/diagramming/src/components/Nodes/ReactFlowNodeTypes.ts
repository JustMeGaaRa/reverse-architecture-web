import { BoundaryNode } from "./BoundaryNode";
import { DeploymentNode } from "./DeploymentNode";
import { ElementGroupNode } from "./ElementGroupNode";
import { ElementNode } from "./ElementNode";
import { ElementPlaceholderNode } from "./ElementPlaceholderNode";
import { ReactFlowBoundaryWrapper } from "./ReactFlowBoundaryWrapper";
import { ReactFlowNodeWrapper } from "./ReactFlowNodeWrapper";

import { ElementModelNode } from "./ElementModelNode";
import { ElementModelPlaceholderNode } from "./ElementModelPlaceholderNode";
import { ReactFlowModelNodeWrapper } from "./ReactFlowNodeWrapper";
import { WorkspaceNode } from "./WorkspaceNode";

export const ReactFlowElementNode = ReactFlowNodeWrapper(ElementNode);
export const ReactFlowPlaceholderNode = ReactFlowNodeWrapper(ElementPlaceholderNode);
export const ReactFlowBoundaryNode = ReactFlowBoundaryWrapper(BoundaryNode);
export const ReactFlowGroupNode = ReactFlowBoundaryWrapper(ElementGroupNode);
export const ReactFlowDeploymentNode = ReactFlowNodeWrapper(DeploymentNode);

export const ReactFlowModelWorkspaceNode = ReactFlowModelNodeWrapper(WorkspaceNode);
export const ReactFlowModelElementNode = ReactFlowModelNodeWrapper(ElementModelNode);
export const ReactFlowModelPlaceholderNode = ReactFlowModelNodeWrapper(ElementModelPlaceholderNode);

export const ReactFlowNodeTypes = {
    element: ReactFlowElementNode,
    placeholder: ReactFlowPlaceholderNode,
    elementGroup: ReactFlowGroupNode,
    boundary: ReactFlowBoundaryNode,
    deploymentNode: ReactFlowDeploymentNode,
    
    workspace: ReactFlowModelWorkspaceNode,
    elementModel: ReactFlowModelElementNode,
    placeholderModel: ReactFlowModelPlaceholderNode,
}

export type ReactFlowNodeTypeKeys = keyof typeof ReactFlowNodeTypes;
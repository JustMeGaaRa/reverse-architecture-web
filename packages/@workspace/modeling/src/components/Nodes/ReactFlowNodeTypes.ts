import { ElementModelNode } from "./ElementNode";
import { ElementModelPlaceholderNode } from "./ElementPlaceholderNode";
import { ReactFlowModelNodeWrapper } from "./ReactFlowNodeWrapper";
import { WorkspaceNode } from "./WorkspaceNode";

export const ReactFlowModelWorkspaceNode = ReactFlowModelNodeWrapper(WorkspaceNode);
export const ReactFlowModelElementNode = ReactFlowModelNodeWrapper(ElementModelNode);
export const ReactFlowModelPlaceholderNode = ReactFlowModelNodeWrapper(ElementModelPlaceholderNode);

export const ReactFlowModelNodeTypes = {
    workspace: ReactFlowModelWorkspaceNode,
    element: ReactFlowModelElementNode,
    placeholder: ReactFlowModelPlaceholderNode,
}

export type ReactFlowModelNodeTypeKeys = keyof typeof ReactFlowModelNodeTypes;
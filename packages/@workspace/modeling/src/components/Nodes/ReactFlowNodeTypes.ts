import { ElementNode } from "./ElementNode";
import { ElementPlaceholderNode } from "./ElementPlaceholderNode";
import { ReactFlowNodeWrapper } from "./ReactFlowNodeWrapper";
import { WorkspaceNode } from "./WorkspaceNode";

export const ReactFlowWorkspaceNode = ReactFlowNodeWrapper(WorkspaceNode);
export const ReactFlowElementNode = ReactFlowNodeWrapper(ElementNode);
export const ReactFlowPlaceholderNode = ReactFlowNodeWrapper(ElementPlaceholderNode);

export const ReactFlowNodeTypes = {
    workspace: ReactFlowWorkspaceNode,
    element: ReactFlowElementNode,
    placeholder: ReactFlowPlaceholderNode,
}

export type ReactFlowNodeTypeKeys = keyof typeof ReactFlowNodeTypes;
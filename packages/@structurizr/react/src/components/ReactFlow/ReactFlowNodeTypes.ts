import { ReactFlowNodeTypeNames } from "../../types";
import {
    BoundaryNode,
    DeploymentNode,
    ElementGroupNode,
    ElementModelNode,
    ElementModelPlaceholderNode,
    ElementNode,
    ElementPlaceholderNode,
    WorkspaceNode
} from "../Nodes";
import { ReactFlowViewElementBoundaryAdapter } from "./ReactFlowViewElementBoundaryAdapter";
import { ReactFlowViewElementAdapter } from "./ReactFlowViewElementAdapter";
import { ReactFlowModelElementAdapter } from "./ReactFlowModelElementAdapter";

const ReactFlowElementNode = ReactFlowViewElementAdapter(ElementNode);
const ReactFlowPlaceholderNode = ReactFlowViewElementAdapter(ElementPlaceholderNode);
const ReactFlowBoundaryNode = ReactFlowViewElementBoundaryAdapter(BoundaryNode);
const ReactFlowGroupNode = ReactFlowViewElementBoundaryAdapter(ElementGroupNode);
const ReactFlowDeploymentNode = ReactFlowViewElementAdapter(DeploymentNode);

const ReactFlowModelWorkspaceNode = ReactFlowModelElementAdapter(WorkspaceNode);
const ReactFlowModelElementNode = ReactFlowModelElementAdapter(ElementModelNode);
const ReactFlowModelPlaceholderNode = ReactFlowModelElementAdapter(ElementModelPlaceholderNode);

export const ReactFlowNodeTypes = {
    [ReactFlowNodeTypeNames.ViewElement]: ReactFlowElementNode,
    [ReactFlowNodeTypeNames.ViewElementPlaceholder]: ReactFlowPlaceholderNode,
    [ReactFlowNodeTypeNames.ViewElementGroup]: ReactFlowGroupNode,
    [ReactFlowNodeTypeNames.ViewElementBoundary]: ReactFlowBoundaryNode,
    [ReactFlowNodeTypeNames.ViewElementDeploymentNode]: ReactFlowDeploymentNode,
    
    [ReactFlowNodeTypeNames.ModelElement]: ReactFlowModelElementNode,
    [ReactFlowNodeTypeNames.ModelElementWorkspace]: ReactFlowModelWorkspaceNode,
    [ReactFlowNodeTypeNames.ModelElementPlaceholder]: ReactFlowModelPlaceholderNode,
}
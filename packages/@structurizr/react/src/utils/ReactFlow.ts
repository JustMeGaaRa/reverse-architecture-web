import { ReactFlowJsonObject } from "@reactflow/core";
import {
    IElement,
    IRelationship,
    ISupportVisitor,
    IViewDefinition,
    IWorkspaceSnapshot,
    Position,
    Size,
    Tag
} from "@structurizr/dsl";
import {
    ReactFlowEdge,
    ReactFlowModelNode,
    ReactFlowNode
} from "../components/ReactFlow";
import {
    ReactFlowBuilder,
    ReactFlowEdgeTypeNames,
    ReactFlowModelVisitor,
    ReactFlowNodeTypeNames,
    ReactFlowVisitor
} from "../types";

export type ViewElementParams = {
    element: IElement;
    elementId?: string;
    parentId?: string;
    isBoundary?: boolean;
    position: Position;
    size?: Size;
}

export const createReactFlowViewNode = (params: ViewElementParams): ReactFlowNode => {
    const getNodeType = (element: IElement, isBoundary: boolean): ReactFlowNodeTypeNames => {
        return isBoundary
            ? ReactFlowNodeTypeNames.ViewElementBoundary
                : element.tags.some(x => x.name === Tag.Group.name)
                ? ReactFlowNodeTypeNames.ViewElementGroup
                    : element.tags.some(x => x.name === Tag.DeploymentNode.name)
                        ? ReactFlowNodeTypeNames.ViewElementDeploymentNode
                        : ReactFlowNodeTypeNames.ViewElement;
    }

    return {
        id: params.elementId ?? params.element.identifier,
        type: getNodeType(params.element, params.isBoundary),
        data: {
            element: params.element,
            height: params.size?.height,
            width: params.size?.width
        },
        position: params.position,
        height: params.size?.height ?? 200,
        width: params.size?.width ?? 200,
        parentNode: params.parentId,
        extent: params.parentId ? "parent" : undefined,
        // NOTE: important to keep edges above nodes and group nodes
        style: { zIndex: -1 }
    }
}

export type ViewRelationshipParams = {
    relationship: IRelationship;
}

export const createReactFlowViewEdge = (params: ViewRelationshipParams): ReactFlowEdge => {
    return {
        id: `${params.relationship.sourceIdentifier}_${params.relationship.targetIdentifier}`,
        type: ReactFlowEdgeTypeNames.ViewRelationshipSimpleBezier,
        data: { relationship: params.relationship },
        source: params.relationship.sourceIdentifier,
        target: params.relationship.targetIdentifier
    };
}

export type ModelElementParams = {
    type?: ReactFlowNodeTypeNames,
    element: IElement;
    elementId?: string;
    elementChildrenCount?: number,
    parentId?: string;
    position?: Position;
    size?: Size;
}

export const createReactFlowModelNode = (params: ModelElementParams): ReactFlowModelNode => {
    return {
        id: params.elementId ?? params.element.identifier,
        type: params.type ?? ReactFlowNodeTypeNames.ModelElement,
        data: {
            element: params.element,
            elementChildrenCount: params.elementChildrenCount
        },
        position: params.position ?? { x: 0, y: 0 },
        height: params.size?.height ?? 70,
        width: params.size?.width ?? 300,
    }
}

export type ModelRelationshipParams = {
    relationship: IRelationship;
}

export const createReactFlowModelEdge = (params: ModelRelationshipParams): ReactFlowEdge => {
    return {
        id: `${params.relationship.sourceIdentifier}-${params.relationship.targetIdentifier}`,
        type: ReactFlowEdgeTypeNames.DefaultSmoothStep,
        data: { relationship: params.relationship },
        source: params.relationship.sourceIdentifier,
        target: params.relationship.targetIdentifier,
        style: {
            stroke: "#535354",
            strokeWidth: 2
        }
    }
}

export const getReactFlowViewObject = (
    workspace: IWorkspaceSnapshot,
    strategy: ISupportVisitor,
    view: IViewDefinition
): ReactFlowJsonObject => {
    const reactFlowBuilder = new ReactFlowBuilder();
    const reactFlowVisitor = new ReactFlowVisitor(
        workspace.model,
        workspace.views.configuration,
        view,
        reactFlowBuilder
    );
    strategy?.accept(reactFlowVisitor);
    return reactFlowBuilder.build();
}

export const getReactFlowModelObject = (
    workspace: IWorkspaceSnapshot,
    strategy: ISupportVisitor
): ReactFlowJsonObject => {
    const reactFlowBuilder = new ReactFlowBuilder();
    const reactFlowVisitor = new ReactFlowModelVisitor(
        workspace.model,
        workspace.views.configuration,
        reactFlowBuilder
    );
    strategy.accept(reactFlowVisitor);
    return reactFlowBuilder.build();
}
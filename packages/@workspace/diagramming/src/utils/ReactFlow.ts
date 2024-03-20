import {
    Edge,
    getNodesBounds,
    Node,
    ReactFlowState,
    ReactFlowJsonObject
} from "@reactflow/core";
import {
    IElement,
    IRelationship,
    Position,
    Size,
    IStyles,
    Tag,
    IWorkspaceSnapshot,
    ISupportVisitor,
    IViewDefinition
} from "@structurizr/dsl";
import { ReactFlowNodeTypeKeys } from "../components";
import {
    ReactFlowBuilder,
    ReactFlowVisitor,
    ReactFlowModelVisitor
} from "../types";

export const diagramNodeSelector = (state: ReactFlowState) => {
    const selectedNodes = Array.from(state.nodeInternals.values()).filter(node => node.selected);

    return ({
        selectionBounds: getNodesBounds(selectedNodes, state.nodeOrigin),
        selectedNodes: selectedNodes,
        selectedNodeIds: selectedNodes.map(node => node.id),
        canLock: selectedNodes.some(node => node.draggable),
    })
}

export type ElementParams<TElement extends IElement = any> = {
    element: TElement;
    elementId?: string;
    styles: IStyles;
    parentId?: string;
    isBoundary?: boolean;
    position: Position;
    size?: Size;
}

export const getNodeFromElement = (params: ElementParams): Node => {
    const getNodeType = (element: IElement, isBoundary: boolean): ReactFlowNodeTypeKeys => {
        return isBoundary
            ? "boundary"
                : element.tags.some(x => x.name === Tag.Group.name)
                ? "elementGroup"
                    : element.tags.some(x => x.name === Tag.DeploymentNode.name)
                        ? "deploymentNode"
                        : "element";
    }

    return {
        id: params.elementId ?? params.element.identifier,
        type: getNodeType(params.element, params.isBoundary),
        data: {
            element: params.element,
            style: params.styles.elements,
            height: params.size?.height,
            width: params.size?.width,
        },
        position: params.position,
        parentNode: params.parentId,
        extent: params.parentId ? "parent" : undefined,
        style: { zIndex: -1 } // NOTE: important to keep edges above nodes and group nodes
    }
}

export type RelationshipParams = {
    relationship: IRelationship;
    styles: IStyles;
}

export const getEdgeFromRelationship = (params: RelationshipParams): Edge => {
    return {
        id: `${params.relationship.sourceIdentifier}_${params.relationship.targetIdentifier}`,
        type: "simplebezier",
        data: {
            relationship: params.relationship,
            style: params.styles.relationships,
        },
        source: params.relationship.sourceIdentifier,
        target: params.relationship.targetIdentifier
    };
}



export const modelNodeSelector = (state: ReactFlowState) => {
    const selectedNodes = Array.from(state.nodeInternals.values()).filter(node => node.selected);

    return ({
        selectionBounds: getNodesBounds(selectedNodes, state.nodeOrigin),
        selectedNodes: selectedNodes,
        selectedNodeIds: selectedNodes.map(node => node.id),
        canLock: selectedNodes.some(node => node.draggable),
    })
}

export type ModelElementParams<TElement extends IElement = any> = {
    element: TElement;
    elementId?: string;
    elementChildrenCount?: number,
    type?: ReactFlowNodeTypeKeys,
    styles: IStyles;
    parentId?: string;
    position?: Position;
    size?: Size;
}

export const getModelNodeFromElement = (params: ModelElementParams): Node => {
    return {
        id: params.elementId ?? params.element.identifier,
        type: params.type ?? "elementModel",
        data: {
            element: params.element,
            elementChildrenCount: params.elementChildrenCount,
            style: params.styles.elements,
        },
        position: params.position ?? { x: 0, y: 0 },
        height: params.size?.height ?? 70,
        width: params.size?.width ?? 300,
    }
}

export type ModelRelationshipParams = {
    relationship: IRelationship;
    styles: IStyles;
}

export const getModelEdgeFromRelationship = (params: ModelRelationshipParams): Edge => {
    return {
        id: `${params.relationship.sourceIdentifier}-${params.relationship.targetIdentifier}`,
        type: "smoothstep",
        data: {
            relationship: params.relationship,
            style: params.styles.relationships,
        },
        source: params.relationship.sourceIdentifier,
        target: params.relationship.targetIdentifier,
        style: {
            stroke: "#535354",
            strokeWidth: 2
        }
    }
}

export const getReactFlowObject = (
    strategy: ISupportVisitor,
    workspace: IWorkspaceSnapshot,
    selectedView: IViewDefinition
): ReactFlowJsonObject => {
    const reactFlowBuilder = new ReactFlowBuilder();
    const reactFlowVisitor = new ReactFlowVisitor(
        workspace.model,
        workspace.views.configuration,
        selectedView,
        reactFlowBuilder
    );
    strategy?.accept(reactFlowVisitor);
    return reactFlowBuilder.build();
}

export const getReactFlowModelObject = (
    strategy: ISupportVisitor,
    workspace: IWorkspaceSnapshot,
): ReactFlowJsonObject => {
    const reactFlowBuilder = new ReactFlowBuilder();

    const nodeHeight = 70;
    const nodeHeightSpacing = 64;
    
    const x = 0;
    const y = -(nodeHeight + nodeHeightSpacing);
    const workspaceElement = {
        identifier: "workspace",
        name: workspace.name,
        description: "Model",
        tags: [
            { name: "Element" },
            { name: "Workspace" }
        ]
    }
    const workspaceNode = getModelNodeFromElement({
        element: workspaceElement as any,
        elementChildrenCount: (workspace.model.people.length + workspace.model.softwareSystems.length),
        type: "workspace",
        styles: workspace.views.configuration.styles,
        position: { x, y },
        size: { height: 64, width: 400 }
    });
    reactFlowBuilder.addNode(workspaceNode);

    const reactFlowVisitor = new ReactFlowModelVisitor(
        workspace.model,
        workspace.views.configuration,
        reactFlowBuilder
    );
    strategy.accept(reactFlowVisitor);
    return reactFlowBuilder.build();
}
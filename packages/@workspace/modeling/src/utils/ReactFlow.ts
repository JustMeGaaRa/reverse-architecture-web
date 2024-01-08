import { Edge, getNodesBounds, Node, ReactFlowState } from "@reactflow/core";
import { IElement, IRelationship, Position, Styles } from "@structurizr/dsl";
import { ReactFlowModelNodeTypeKeys } from "../components";

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
    type?: ReactFlowModelNodeTypeKeys,
    styles: Styles;
    parentId?: string;
    position?: Position;
}

export const getModelNodeFromElement = (params: ModelElementParams): Node => {
    return {
        id: params.elementId ?? params.element.identifier,
        type: params.type ?? "element",
        data: {
            element: params.element,
            elementChildrenCount: params.elementChildrenCount,
            style: params.styles.elements,
        },
        position: params.position ?? { x: 0, y: 0 },
    }
}

export type ModelRelationshipParams = {
    relationship: IRelationship;
    styles: Styles;
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
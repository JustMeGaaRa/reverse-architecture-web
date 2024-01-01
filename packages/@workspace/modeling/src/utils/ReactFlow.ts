import { Edge, getNodesBounds, Node, ReactFlowState } from "@reactflow/core";
import { IElement, IRelationship, Position } from "@structurizr/dsl";
import { ReactFlowNodeTypeKeys } from "../components";

export const nodeSelector = (state: ReactFlowState) => {
    const selectedNodes = Array.from(state.nodeInternals.values()).filter(node => node.selected);

    return ({
        selectionBounds: getNodesBounds(selectedNodes, state.nodeOrigin),
        selectedNodes: selectedNodes,
        selectedNodeIds: selectedNodes.map(node => node.id),
        canLock: selectedNodes.some(node => node.draggable),
    })
}

export const getNodeFromElement = (
    element: IElement,
    elementChildrenCount: number | undefined,
    type: ReactFlowNodeTypeKeys,
    position?: Position
): Node => {
    return {
        id: element.identifier,
        type: type,
        data: {
            element: element,
            elementChildrenCount: elementChildrenCount
        },
        position: {
            x: position?.x ?? 0,
            y: position?.y ?? 0
        }
    }
}

export const getEdgeFromRelationship = (relationship: IRelationship): Edge => {
    return {
        id: `${relationship.sourceIdentifier}-${relationship.targetIdentifier}`,
        type: "smoothstep",
        source: relationship.sourceIdentifier,
        target: relationship.targetIdentifier,
        style: {
            stroke: "#535354",
            strokeWidth: 2
        }
    }
}
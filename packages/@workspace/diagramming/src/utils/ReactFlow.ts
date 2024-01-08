import { Edge, getNodesBounds, Node, ReactFlowState } from "@reactflow/core";
import {
    IElement,
    IRelationship,
    Position,
    Size,
    Styles,
    Tag,
} from "@structurizr/dsl";
import { ReactFlowNodeTypeKeys } from "../components";

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
    styles: Styles;
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
    styles: Styles;
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
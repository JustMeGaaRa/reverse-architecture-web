import { Edge, Node } from "@reactflow/core";
import {
    IElement,
    IRelationship,
    Position,
    Size,
    Styles,
    Tag,
} from "@structurizr/dsl";
import { ReactFlowNodeTypeKeys } from "../components";

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
    const getNodeType = (element: IElement, isBoundary): ReactFlowNodeTypeKeys => {
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
        style: params.parentId ? undefined : { zIndex: -1 }
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
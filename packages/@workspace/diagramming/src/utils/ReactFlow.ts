import { Edge, Node } from "@reactflow/core";
import {
    IElement,
    IRelationship,
    Position,
    Size,
    Styles,
    Tag,
} from "@structurizr/dsl";

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
    const getNoteTypeIfBoundary = (isBoundary: boolean) => {
        return isBoundary
            ? "boundary"
            : undefined;
    };

    const getNodeTypeByTag = (element: IElement) => {
        return element.tags.some(x => x.name === Tag.DeploymentNode.name)
            ? "deploymentNode"
            : element.tags.some(x => x.name === Tag.Group.name)
                ? "boundary"
                : undefined;
    }

    return {
        id: params.elementId ?? params.element.identifier,
        type: getNoteTypeIfBoundary(params.isBoundary)
            ?? getNodeTypeByTag(params.element)
            ?? "element",
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
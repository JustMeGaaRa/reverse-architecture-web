import { Edge, Node } from "@reactflow/core";
import {
    Element,
    Position,
    Relationship,
    Size,
    Styles,
    Tag,
} from "@structurizr/dsl";

export type ElementParams<TElement extends Element = any> = {
    element: TElement;
    elementId?: string;
    parentId?: string;
    isBoundary?: boolean;
    position: Position;
    size?: Size;
    styles: Styles;
}

export const getNodeFromElement = (params: ElementParams): Node => {
    const getNoteTypeIfBoundary = (isBoundary: boolean) => {
        return isBoundary
            ? "boundary"
            : undefined;
    };

    const getNodeTypeByTag = (element: Element) => {
        return element.tags.some(x => x.name === Tag.DeploymentNode.name)
            ? "deploymentNode"
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
    relationship: Relationship;
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

type Viewport = {
    x: number;
    y: number;
    zoom: number;
}

export const getRenderingPoint = (viewport: Viewport, point: Position) => {
    return {
        x: (point.x * viewport.zoom) + viewport.x,
        y: (point.y * viewport.zoom) + viewport.y
    };
}
export const getViewportPoint = (viewport: Viewport, point: Position) => {
    return {
        x: (point.x - viewport.x) / viewport.zoom,
        y: (point.y - viewport.y) / viewport.zoom
    };
}
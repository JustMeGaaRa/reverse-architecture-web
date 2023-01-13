import {
    Node,
    Edge,
    XYPosition,
    MarkerType
} from "reactflow";
import { C4FloatingEdgeProps } from "./EdgeTypes";
import { C4RectangleProps } from "./NodeTypes";
import { C4ScopeProps } from "./NodeTypes";
import {
    Abstraction,
    AbstractionTypeCode,
    Diagram,
    Relationship
} from "./types";

export enum NodeType {
    Block = "block",
    Person = "person",
    Cylinder = "cylinder",
    Scope = "scope"
};

export enum EdgeType {
    Floating = "floating"
};

export const NODE_WIDTH = 240;
export const NODE_HEIGHT = 150;

export const getDiagramNodes = (diagram: Diagram) => {
    if (diagram === null) return Array.of<Node<C4RectangleProps>>();

    const getScopeElement = (element) => {
        return createScope(
            element,
            diagram.positions[element.abstractionId])
    };
    const getPrimaryElement = (element) => {
        return createNode(
            element,
            diagram.positions[element.abstractionId],
            diagram.scope?.abstractionId);
    };
    const getSupportingElement = (element) => {
        return createNode(
            element,
            diagram.positions[element.abstractionId]);
    };

    const nodes =
        diagram.scope === undefined
            ? Array.of<Node<C4RectangleProps>>()
            : Array.of<Node<C4RectangleProps>>(getScopeElement(diagram.scope));

    return nodes
        .concat(diagram.primaryElements.map(getPrimaryElement))
        .concat(diagram.supportingElements.map(getSupportingElement));
};

export const getDiagramEdges = (diagram: Diagram) => {
    if (diagram === null) return Array.of<Edge<C4FloatingEdgeProps>>();
    return diagram.relationships.map<Edge<C4FloatingEdgeProps>>(createEdge);
};

export function getAbstractionBgColor(code: string) {
  const nodesBgColors = {
    [AbstractionTypeCode.SoftwareSystem]: "purple.600",
    [AbstractionTypeCode.Container]: "blue.500",
    [AbstractionTypeCode.Component]: "blue.200",
    [AbstractionTypeCode.Person]: "green.500"
  };
  return nodesBgColors[code];
}

export function getNodeType(code: string) {
    const nodesTypes = {
        [AbstractionTypeCode.SoftwareSystem]: NodeType.Block,
        [AbstractionTypeCode.Container]: NodeType.Block,
        [AbstractionTypeCode.Component]: NodeType.Block,
        [AbstractionTypeCode.Person]: NodeType.Block
    };
    return nodesTypes[code];
}

export const createNode = (
    abstraction: Abstraction,
    abstractionPosition: XYPosition,
    parentId?: string
): Node<C4RectangleProps> => {
    return {
        id: abstraction.abstractionId,
        type: getNodeType(abstraction.type.code),
        data: {
            abstraction: abstraction,
            bgColor: getAbstractionBgColor(abstraction.type.code)
        },
        position: abstractionPosition,
        parentNode: parentId
    };
}

export const createScope = (
    abstraction: Abstraction,
    scopePosition: XYPosition
): Node<C4ScopeProps> => {
    return {
        id: abstraction.abstractionId,
        type: NodeType.Scope,
        data: {
            abstraction
        },
        position: scopePosition,
        style: {
            zIndex: -1
        }
    };
}

export const createEdge = (
    relationship: Relationship
): Edge<C4FloatingEdgeProps> => {
    return {
        id: relationship.relationshipId,
        type: EdgeType.Floating,
        data: {
            relationship,
        },
        source: relationship.sourceElementId,
        target: relationship.targetElementId,
        markerEnd: {
            type: MarkerType.Arrow
        }
    };
}

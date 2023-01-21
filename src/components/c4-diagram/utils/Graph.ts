import {
    Node,
    Edge,
    MarkerType,
    ReactFlowJsonObject
} from "reactflow";
import { v4 } from "uuid";
import { Result, Ok, Err } from "@sniptt/monads";
import {
    C4RectangleNode,
    C4RectangleProps,
    C4ScopeNode,
    C4ScopeProps
} from "../components/NodeTypes";
import {
    C4FloatingEdge,
    C4FloatingEdgeProps
} from "../components/EdgeTypes";
import * as C4 from "../types/Diagram";

export enum NodeType {
    Default = "default",
    Block = "block",
    Person = "person",
    Cylinder = "cylinder",
    Scope = "scope"
};

export enum EdgeType {
    Default = "default",
    Straight = "straight",
    Step = "step",
    Smoothstep = "smoothstep",
    Simplebezier = "simplebezier",
    Floating = "floating"
};

export const ElementBgColors = {
    ["Person"]: "green.500",
    ["Software System"]: "purple.600",
    ["Container"]: "blue.500",
    ["Component"]: "blue.200",
}

export const NodeTypes = {
    [NodeType.Block]: C4RectangleNode,
    [NodeType.Person]: C4RectangleNode,
    [NodeType.Cylinder]: C4RectangleNode,
    [NodeType.Scope]: C4ScopeNode
}

export const EdgeTypes = {
    [EdgeType.Floating]: C4FloatingEdge
}

export const NODE_WIDTH = 240;
export const NODE_HEIGHT = 150;

const fromNode = (
    node: C4.Node<C4.Element>
): Node<C4RectangleProps> => {
    return {
        id: node.id,
        type: NodeType.Block,
        data: {
            ...node.data,
            width: node.width ?? NODE_WIDTH,
            height: node.height ?? NODE_HEIGHT
        },
        position: node.position,
        parentNode: node.parentId,
    };
}

const fromScope = (
    node: C4.Node<C4.Element>
): Node<C4ScopeProps> => {
    return {
        id: node.id,
        type: NodeType.Scope,
        data: {
            ...node.data,
            width: node.width ?? NODE_WIDTH,
            height: node.height ?? NODE_HEIGHT,
        },
        position: node.position,
        style: { zIndex: -1 }
    };
}

const fromEdge = (
    edge: C4.Edge<C4.Relationship>
): Edge<C4FloatingEdgeProps> => {
    return {
        id: edge.id,
        type: EdgeType.Floating,
        label: edge.data.description,
        data: edge.data,
        source: edge.source,
        target: edge.target,
        markerEnd: { type: MarkerType.Arrow }
    };
}

export const getDiagramNodes = (diagram: C4.C4Diagram) => {
    if (diagram === null) return Array.of<Node<C4RectangleProps>>();

    const nodes =
        diagram.scope === undefined
            ? Array.of<Node<C4RectangleProps>>()
            : Array.of<Node<C4RectangleProps>>(fromScope(diagram.scope));

    return nodes
        .concat(diagram.primaryElements.map(fromNode))
        .concat(diagram.supportingElements.map(fromNode));
};

export const getDiagramEdges = (diagram: C4.C4Diagram) => {
    if (diagram === null) return Array.of<Edge<C4FloatingEdgeProps>>();
    return diagram.relationships.map<Edge<C4FloatingEdgeProps>>(fromEdge);
};

export const createNode = (
    element: C4.Element,
    position?: C4.Position
): Node<C4RectangleProps> => {
    return {
        id: v4(),
        type: NodeType.Block,
        data: element,
        position: position,
        parentNode: undefined
    };
}

export const createEdge = (
    source: string,
    target: string,
    relationship: C4.Relationship
): Edge<C4FloatingEdgeProps> => {
    return {
        id: v4(),
        type: EdgeType.Default,
        label: relationship.description,
        data: relationship,
        source: source,
        target: target,
        markerEnd: { type: MarkerType.Arrow }
    };
}

export const parseReactFlow = (
    json: string
): Result<ReactFlowJsonObject, Error> => {
    try {
        const flow = JSON.parse(json);

        return isReactFlowJsonObject(flow)
            ? Ok(flow)
            : Err(new Error("The file content is not assignable to React Flow JSON object."));
    }
    catch (error) {
        return Err(new Error("The file content is not a valid JSON."));
    }
}

export const isReactFlowJsonObject = (
    value: object
): value is ReactFlowJsonObject => {
    const flow = value as ReactFlowJsonObject;
    return flow.nodes !== undefined
        && flow.edges !== undefined
        && flow.viewport !== undefined;
}

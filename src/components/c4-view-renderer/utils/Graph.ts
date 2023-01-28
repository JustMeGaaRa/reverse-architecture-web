import {
    Node,
    Edge,
    MarkerType,
    ReactFlowJsonObject
} from "@reactflow/core";
import { ElementNode, ElementNodeProps } from "../components/Nodes/ElementNode";
import { ElementPlaceholder } from "../components/Nodes/ElementPlaceholder";
import { RelationshipEdge, RelationshipEdgeProps } from "../components/Edges/RelationshipEdge";
import { Result, Ok, Err } from "@sniptt/monads";
import { v4 } from "uuid";
import * as C4 from "../../structurizr-dsl/Diagram";

export enum NodeType {
    Default = "default",
    Block = "block",
    Person = "person",
    Cylinder = "cylinder",
    Scope = "scope",
    Placeholder = "placeholder"
};

export enum EdgeType {
    Default = "default",
    Straight = "straight",
    Step = "step",
    Smoothstep = "smoothstep",
    Simplebezier = "simplebezier",
    Floating = "floating"
};

export const ViewStyle = {
    element: {
        ["Person"]: {
            shape: "Person",
            background: "green.500"
        },
        ["Software System"]: {
            shape: "RoundedBox",
            background: "purple.600"
        },
        ["Container"]: {
            shape: "RoundedBox",
            background: "blue.500"
        },
        ["Component"]: {
            shape: "RoundedBox",
            background: "blue.200"
        },
    },
    relationship: {

    }
}

export const ElementBgColors = {
    ["Person"]: "green.500",
    ["Software System"]: "purple.600",
    ["Container"]: "blue.500",
    ["Component"]: "blue.200",
}

export const NodeTypes = {
    [NodeType.Block]: ElementNode,
    [NodeType.Person]: ElementNode,
    [NodeType.Cylinder]: ElementNode,
    [NodeType.Scope]: ElementNode,
    [NodeType.Placeholder]: ElementPlaceholder
}

export const EdgeTypes = {
    [EdgeType.Floating]: RelationshipEdge
}

export const NODE_WIDTH = 240;
export const NODE_HEIGHT = 150;

const fromNode = (
    node: C4.Node<C4.Element>,
    expanded?: boolean
): Node<ElementNodeProps> => {
    return {
        id: node.id,
        type: NodeType.Block,
        data: {
            ...node.data,
            expanded: expanded,
            width: node.width ?? NODE_WIDTH,
            height: node.height ?? NODE_HEIGHT
        },
        position: node.position,
        parentNode: node.parentId,
        style: node.parentId ? undefined : { zIndex: -1 }
    };
}

const fromEdge = (
    edge: C4.Edge<C4.Relationship>
): Edge<RelationshipEdgeProps> => {
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
    if (diagram === null) return Array.of<Node<ElementNodeProps>>();

    const nodes =
        diagram.scope === undefined
            ? Array.of<Node<ElementNodeProps>>()
            : Array.of<Node<ElementNodeProps>>(fromNode(diagram.scope, true));

    return nodes
        .concat(diagram.primaryElements.map(node => fromNode(node)))
        .concat(diagram.supportingElements.map(node => fromNode(node)));
};

export const getDiagramEdges = (diagram: C4.C4Diagram) => {
    if (diagram === null) return Array.of<Edge<RelationshipEdgeProps>>();
    return diagram.relationships.map<Edge<RelationshipEdgeProps>>(fromEdge);
};

export const createNode = (
    element: C4.Element,
    position?: C4.Position,
    type?: string
): Node<ElementNodeProps> => {
    return {
        id: v4(),
        type: type ?? NodeType.Block,
        data: element,
        position: position,
        parentNode: undefined
    };
}

export const createEdge = (
    source: string,
    target: string,
    relationship: C4.Relationship
): Edge<RelationshipEdgeProps> => {
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

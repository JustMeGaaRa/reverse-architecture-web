import {
    Node,
    Edge,
    MarkerType,
    FitViewOptions,
    ReactFlowJsonObject,
    useReactFlow
} from "@reactflow/core";
import { useCallback } from "react";
import { ElementNodeProps } from "../components/Nodes/ElementNode";
import { RelationshipEdgeProps } from "../components/Edges/RelationshipEdge";
import { useC4BuilderStore } from "../store";
import * as C4 from "../store/Diagram";

const getDiagramNodes = (diagram: C4.Diagram) => {
    if (diagram === null) return Array.of<Node<ElementNodeProps>>();
    
    const NODE_WIDTH = 240;
    const NODE_HEIGHT = 150;
    
    const fromNode = (
        node: C4.Node<C4.Element>,
        expanded?: boolean
    ): Node<ElementNodeProps> => {
        return {
            id: node.id,
            type: "roundedBox",
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

    const nodes =
        diagram.scope === undefined
            ? Array.of<Node<ElementNodeProps>>()
            : Array.of<Node<ElementNodeProps>>(fromNode(diagram.scope, true));

    return nodes
        .concat(diagram.primaryElements.map(node => fromNode(node)))
        .concat(diagram.supportingElements.map(node => fromNode(node)));
}

const getDiagramEdges = (diagram: C4.Diagram) => {
    if (diagram === null) return Array.of<Edge<RelationshipEdgeProps>>();

    const fromEdge = (
        edge: C4.Edge<C4.Relationship>
    ): Edge<RelationshipEdgeProps> => {
        return {
            id: edge.id,
            type: "default",
            label: edge.data.description,
            data: edge.data,
            source: edge.source,
            target: edge.target,
            markerEnd: { type: MarkerType.Arrow }
        };
    }

    return diagram.relationships.map<Edge<RelationshipEdgeProps>>(fromEdge);
}

export const useC4Diagram = () => {
    const reactFlow = useReactFlow();
    const c4Diagram = useC4BuilderStore();

    const fromDiagram = useCallback((
        diagram: C4.Diagram,
        fitViewOptions?: FitViewOptions
    ) => {
        const elements = getDiagramNodes(diagram);
        const relationships = getDiagramEdges(diagram);

        c4Diagram.setTitle(diagram.title);
        // c4Diagram.setElements(elements);
        // c4Diagram.setRelationships(relationships);
        reactFlow.setNodes(elements);
        reactFlow.setEdges(relationships);
        reactFlow.fitView(fitViewOptions);
    }, [c4Diagram, reactFlow]);

    const fromObject = useCallback((
        flow: ReactFlowJsonObject,
        fitViewOptions?: FitViewOptions
    ) => {
        reactFlow.setNodes(flow.nodes || []);
        reactFlow.setEdges(flow.edges || []);
        reactFlow.fitView(fitViewOptions);
    }, [reactFlow]);

    return {
        fromDiagram,
        fromObject
    };
}
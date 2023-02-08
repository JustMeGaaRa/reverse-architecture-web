import {
    Node,
    Edge,
    FitViewOptions,
    ReactFlowJsonObject,
    useReactFlow
} from "@reactflow/core";
import { useCallback } from "react";
import { ElementNodeWrapperProps } from "../components/Nodes/ElementNode";
import { RelationshipEdgeWrapperProps } from "../components/Edges/RelationshipEdge";
import { useC4BuilderStore } from "../store";
import { defaultElementStyle, defaultRelationshipStyle } from "../store/C4Diagram";
import * as C4 from "../store/C4Diagram";

const getDiagramNodes = (diagram: C4.View) => {
    if (diagram === null) return Array.of<Node<ElementNodeWrapperProps>>();
    
    const NODE_WIDTH = 240;
    const NODE_HEIGHT = 150;
    
    const fromNode = (
        node: C4.Element,
        expanded?: boolean
    ): Node<ElementNodeWrapperProps> => {
        return {
            id: node.identifier,
            type: "roundedBox",
            data: {
                element: node,
                style: diagram.style.element[node.tags[1].name] ?? defaultElementStyle,
                width: NODE_WIDTH,
                height: NODE_HEIGHT,
                expanded: expanded,
            },
            position: diagram.layout[node.identifier],
            // parentNode: node.parentId,
            // style: node.parentId ? undefined : { zIndex: -1 }
        };
    }

    // const nodes =
    //     diagram.scope === undefined
    //         ? Array.of<Node<ElementNodeWrapperProps>>()
    //         : Array.of<Node<ElementNodeWrapperProps>>(fromNode(diagram.scope, true));

    // return nodes
    //     .concat(diagram.primaryElements.map(node => fromNode(node)))
    //     .concat(diagram.supportingElements.map(node => fromNode(node)));
    // TODO: handle all the elements, not just software systems
    return diagram.model.softwareSystems.map(node => fromNode(node));
}

const getDiagramEdges = (diagram: C4.View) => {
    if (diagram === null) return Array.of<Edge<RelationshipEdgeWrapperProps>>();

    const fromEdge = (
        edge: C4.Relationship
    ): Edge<RelationshipEdgeWrapperProps> => {
        return {
            id: `${edge.sourceIdentifier}_${edge.targetIdentifier}`,
            type: "default",
            label: edge.description,
            data: {
                relationship: edge,
                // TODO: handle tags corectly
                style: diagram.style.relationship[edge.tags[1].name] ?? defaultRelationshipStyle,
            },
            source: edge.sourceIdentifier,
            target: edge.targetIdentifier
        };
    }

    // return diagram.relationships.map<Edge<RelationshipEdgeWrapperProps>>(fromEdge);
    return diagram.model.relationships.map(edge => fromEdge(edge));
}

export const useC4Diagram = () => {
    const reactFlow = useReactFlow();
    const c4Diagram = useC4BuilderStore();

    const fromDiagram = useCallback((
        diagram: C4.View,
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
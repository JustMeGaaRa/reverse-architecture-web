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
import {
    defaultElementStyle,
    defaultRelationshipStyle,
    View,
    Element,
    Relationship
} from "../store/C4Diagram";

const getDiagramNodes = (diagram: View) => {
    if (diagram === null) return Array.of<Node<ElementNodeWrapperProps>>();
    
    const fromNode = (
        node: Element,
        parentNode?: string,
        expanded?: boolean
    ): Node<ElementNodeWrapperProps> => {
        return {
            id: node.identifier,
            type: "roundedBox",
            data: {
                element: node,
                // TODO: handle tags corectly
                style: diagram.style.element[node.tags[1].name] ?? defaultElementStyle,
                width: diagram.layout[node.identifier].width,
                height: diagram.layout[node.identifier].height,
                expanded: expanded,
            },
            position: diagram.layout[node.identifier],
            parentNode: parentNode,
            style: parentNode ? undefined : { zIndex: -1 }
        };
    }

    return [
        ...diagram.model.people.map(person => fromNode(person)),
        ...diagram.model.softwareSystems.flatMap(system => [
            fromNode(system, undefined, system.containers?.length > 0),
            ...system.containers?.flatMap(container => [
                fromNode(container, system.identifier, container.components?.length > 0),
                ...container.components?.map(component => 
                    fromNode(component, container.identifier)) ?? []
            ]) ?? []
        ])
    ];
}

const getDiagramEdges = (diagram: View) => {
    if (diagram === null) return Array.of<Edge<RelationshipEdgeWrapperProps>>();

    const fromEdge = (
        edge: Relationship
    ): Edge<RelationshipEdgeWrapperProps> => {
        return {
            id: `${edge.sourceIdentifier}_${edge.targetIdentifier}`,
            type: "default",
            label: edge.description,
            data: {
                relationship: edge,
                // TODO: handle tags corectly
                style: diagram.style.relationship[edge.tags[0].name] ?? defaultRelationshipStyle,
            },
            source: edge.sourceIdentifier,
            target: edge.targetIdentifier
        };
    }

    return diagram.model.relationships.map(edge => fromEdge(edge));
}

export const useC4Diagram = () => {
    const reactFlow = useReactFlow();
    const c4Diagram = useC4BuilderStore();

    const clearView = useCallback(() => {
        // TODO: clear elements and relationships
        // c4Diagram.setElements(elements);
        // c4Diagram.setRelationships(relationships);
        reactFlow.setNodes([]);
        reactFlow.setEdges([]);
    }, [c4Diagram, reactFlow]);

    const fromView = useCallback((
        diagram: View,
        fitViewOptions?: FitViewOptions
    ) => {
        const elements = getDiagramNodes(diagram);
        const relationships = getDiagramEdges(diagram);

        c4Diagram.setTitle(diagram.title);
        // TODO: set elements and relationships
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
        fromView,
        fromObject,
        clearView
    };
}
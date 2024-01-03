import { Edge, Node, useReactFlow } from "@reactflow/core";
import {
    getDefaultElement,
    IElement,
    Position,
} from "@structurizr/dsl";
import { useCallback } from "react";

export const useViewFlowBuilder = () => {
    const { setNodes, setEdges } = useReactFlow();

    const addElementPreview = useCallback((source: IElement, position: Position, parentId?: string) => {
        const placeholderNode: Node = {
            id: "placeholder-node",
            type: "placeholder",
            data: {
                element: getDefaultElement(source.type),
                style: []
            },
            position: position,
            parentNode: parentId,
            extent: parentId ? "parent" : undefined,
        }

        const placeholderEdge: Edge = {
            id: "placeholder-edge",
            type: "smoothstep",
            data: {
                relationship: {
                    sourceIdentifier: source.identifier,
                    targetIdentifier: placeholderNode.id,
                },
                style: []
            },
            source: source.identifier,
            target: placeholderNode.id,
        }

        setNodes(nodes => [...nodes, placeholderNode]);
        setEdges(edges => [...edges, placeholderEdge]);
    }, [setEdges, setNodes]);

    const clearElementPreview = useCallback(() => {
        setNodes(nodes => nodes.filter(node => node.id !== "placeholder-node"));
        setEdges(edges => edges.filter(edge => edge.id !== "placeholder-edge"));
    }, [setEdges, setNodes]);

    return {
        addElementPreview,
        clearElementPreview
    }
}
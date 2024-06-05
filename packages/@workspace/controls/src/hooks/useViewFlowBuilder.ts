import { Edge, Node, useReactFlow } from "@reactflow/core";
import { getDefaultChildForElement, getDefaultElement, IElement, Position } from "@structurizr/dsl";
import { ReactFlowEdgeTypeNames, ReactFlowNodeTypeNames } from "@workspace/core";
import { useCallback } from "react";

const ViewPlaceholderNodeId = "view-placeholder-node";
const ViewPlaceholderEdgeId = "view-placeholder-edge";
const ModelPlaceholderNodeId = "model-placeholder-node";
const ModelPlaceholderEdgeId = "model-placeholder-edge";

export const useViewFlowBuilder = () => {
    const { setNodes, setEdges } = useReactFlow();

    const addSiblingPreview = useCallback((source: IElement, position: Position, parentId?: string) => {
        const placeholderNode: Node = {
            id: ViewPlaceholderNodeId,
            type: ReactFlowNodeTypeNames.ViewElementPlaceholder,
            data: {
                element: getDefaultElement(source.type),
                style: []
            },
            position: position,
            parentNode: parentId,
            extent: parentId ? "parent" : undefined,
        }

        const placeholderEdge: Edge = {
            id: ViewPlaceholderEdgeId,
            type: ReactFlowEdgeTypeNames.ViewRelationshipSmoothstep,
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

    const addChildPreview = useCallback((source: IElement, position: Position) => {
        const placeholderNode: Node = {
            id: ModelPlaceholderNodeId,
            type: ReactFlowNodeTypeNames.ModelElementPlaceholder,
            data: {
                element: getDefaultChildForElement(source.type),
                elementChildrenCount: undefined
            },
            position: position,
        }

        const placeholderEdge: Edge = {
            id: ModelPlaceholderEdgeId,
            type: ReactFlowEdgeTypeNames.ViewRelationshipSmoothstep,
            data: {
                relationship: {
                    sourceIdentifier: source.identifier,
                    destinationIdentifier: placeholderNode.id
                }
            },
            source: source.identifier,
            target: placeholderNode.id,
            style: {
                stroke: "#535354",
                strokeWidth: 2
            }
        }

        setNodes(nodes => [...nodes, placeholderNode]);
        setEdges(edges => [...edges, placeholderEdge]);
    }, [setEdges, setNodes]);

    const clearElementPreview = useCallback(() => {
        setNodes(nodes => nodes.filter(node => {
            return node.id !== ViewPlaceholderNodeId
                && node.id !== ModelPlaceholderNodeId;
        }));
        setEdges(edges => edges.filter(edge => {
            return edge.id !== ViewPlaceholderEdgeId
                && edge.id !== ModelPlaceholderEdgeId;
        }));
    }, [setEdges, setNodes]);

    return {
        addSiblingPreview,
        addChildPreview,
        clearElementPreview
    }
}
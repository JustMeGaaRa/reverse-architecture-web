import { Edge, Node, useReactFlow } from "@reactflow/core";
import {
    ElementType,
    getDefaultChildForElement,
    IElement,
    Position,
} from "@structurizr/dsl";
import { useCallback } from "react";
import { useModelView } from "../hooks";
import { ReactFlowEdgeTypeNames, ReactFlowNodeTypeNames } from "../types";

const PlaceholderModelNodeId = "model-placeholder-node";
const PlaceholderModelEdgeId = "model-placeholder-edge";

export const useModelFlowBuilder = () => {
    const { setNodes, setEdges } = useReactFlow();
    const {
        addComponent,
        addContainer,
        addDeploymentNode,
        addInfrastructureNode,
        addPerson,
        addSoftwareSystem
    } = useModelView();

    const addDefaultElement = useCallback((type: ElementType, position: Position, parentId?: string) => {
        switch (type) {
            case ElementType.SoftwareSystem:
                return addContainer(parentId, position);
            case ElementType.Container:
                return addComponent(parentId, position);
        }
        
        return addSoftwareSystem(position);
    }, [addComponent, addContainer, addSoftwareSystem]);

    const removeElement = useCallback((element: IElement) => {
        // TODO: remove element from workspace model
    }, []);

    const addChildPreview = useCallback((source: IElement, position: Position) => {
        const placeholderNode: Node = {
            id: PlaceholderModelNodeId,
            type: ReactFlowNodeTypeNames.ModelElementPlaceholder,
            data: {
                element: getDefaultChildForElement(source.type),
                elementChildrenCount: undefined
            },
            position: position,
        }

        const placeholderEdge: Edge = {
            id: PlaceholderModelEdgeId,
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
        setNodes(nodes => nodes.filter(node => node.id !== PlaceholderModelNodeId));
        setEdges(edges => edges.filter(edge => edge.id !== PlaceholderModelEdgeId));
    }, [setEdges, setNodes]);

    return {
        addDefaultElement,
        removeElement,
        addChildPreview,
        clearElementPreview
    }
}
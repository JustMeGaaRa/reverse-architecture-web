import { Edge, Node, useReactFlow } from "@reactflow/core";
import {
    ElementType,
    getDefaultChildForElement,
    IElement,
    Position,
} from "@structurizr/dsl";
import { useCallback } from "react";
import { useModelView } from "../hooks";

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

    const addDefaultElement = useCallback((type: ElementType, parentId?: string) => {
        switch (type) {
            case ElementType.SoftwareSystem:
                return addContainer(parentId);
            case ElementType.Container:
                return addComponent(parentId);
        }
        
        return addSoftwareSystem();
    }, [addComponent, addContainer, addSoftwareSystem]);

    const removeElement = useCallback((element: IElement) => {
        // TODO: remove element from workspace model
    }, []);

    const addElementPreview = useCallback((source: IElement, position: Position) => {
        const placeholderNode: Node = {
            id: "placeholder-node",
            type: "placeholder",
            data: {
                element: getDefaultChildForElement(source.type),
                elementChildrenCount: undefined
            },
            position: position,
        }

        const placeholderEdge: Edge = {
            id: "placeholder-edge",
            type: "smoothstep",
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
        setNodes(nodes => nodes.filter(node => node.id !== "placeholder-node"));
        setEdges(edges => edges.filter(edge => edge.id !== "placeholder-edge"));
    }, [setEdges, setNodes]);

    return {
        addDefaultElement,
        removeElement,
        addElementPreview,
        clearElementPreview
    }
}
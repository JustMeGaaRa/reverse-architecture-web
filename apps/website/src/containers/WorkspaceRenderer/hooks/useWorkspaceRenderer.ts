import { useReactFlow } from "@reactflow/core";
import {
    DeploymentNodeParams,
    DeploymentEnvironment,
    Person,
    Position,
    Relationship,
    SoftwareSystem,
    Tag,
    Container,
    Component,
    useWorkspace
} from "@justmegaara/structurizr-dsl";
import { useYReactFlow } from "@justmegaara/y-reactflow";
import { useCallback } from "react";
import {
    fromComponentView,
    fromContainerView,
    fromElement,
    fromRelationship,
    fromSystemContextView,
} from "../utils/Workspace";

export const useWorkspaceRenderer = () => {
    const flowState = useReactFlow();
    const store = useWorkspace();
    const flowShared = useYReactFlow();
    
    const addPerson = useCallback((person: Person, position: Position) => {
        if (store?.workspace) {
            flowShared.updateNodes([
                fromElement({
                    element: person,
                    size: { ...position, width: 300, height: 200 },
                    styles: store.workspace.views.styles
                })
            ]);
        }
    }, [flowShared, store]);

    const addSoftwareSystem = useCallback((softwareSystem: SoftwareSystem, position: Position) => {
        if (store) {
            flowShared.updateNodes([
                fromElement({
                    element: softwareSystem,
                    size: { ...position, width: 300, height: 200 },
                    styles: store.workspace.views.styles
                })
            ]);
        }
    }, [flowShared, store]);

    const addContainer = useCallback((container: Container, position: Position) => {
        if (store) {
            flowShared.updateNodes([
                fromElement({
                    element: container,
                    size: { ...position, width: 300, height: 200 },
                    styles: store.workspace.views.styles
                })
            ]);
        }
    }, [flowShared, store]);

    const addComponent = useCallback((compoent: Component, position: Position) => {
        if (store) {
            flowShared.updateNodes([
                fromElement({
                    element: compoent,
                    size: { ...position, width: 300, height: 200 },
                    styles: store.workspace.views.styles
                })
            ]);
        }
    }, [flowShared, store]);
    
    const addDeploymentEnvironment = useCallback((deploymentEnvironment: DeploymentEnvironment) => {
        if (store) {
            flowShared.updateNodes([
                fromElement({
                    element: deploymentEnvironment,
                    size: { x: 0, y: 0, width: 300, height: 200 },
                    styles: store.workspace.views.styles
                })
            ]);
        }
    }, [flowShared, store]);
    
    const addDeploymentNode = useCallback((params: DeploymentNodeParams) => {
        if (store) {
            flowShared.updateNodes([
                fromElement({
                    element: params.deploymentNode,
                    size: { ...params.position, width: 300, height: 200 },
                    styles: store.workspace.views.styles
                })
            ]);
        }
    }, [flowShared, store]);

    const addRelationship = useCallback((relationship: Relationship) => {
        if (store) {
            flowShared.updateEdges([
                fromRelationship({
                    relationship,
                    styles: store.workspace.views.styles
                })
            ]);
        }
    }, [flowShared, store]);
    
    const setView = useCallback((kind: string, view: any) => {
        const viewFunctions = {
            [Tag.SoftwareSystem.name]: fromSystemContextView,
            [Tag.Container.name]: fromContainerView,
            [Tag.Component.name]: fromComponentView,
        };

        if (store.workspace) {
            const viewFunction = viewFunctions[kind] || (() => ({ nodes: [], edges: [] }));
            const { nodes, edges } = viewFunction(view, store.workspace);
    
            flowShared.setNodes(nodes);
            flowShared.setEdges(edges);
            flowState.fitView({ padding: 0.2, duration: 500 });
        }
    }, [flowState, flowShared, store.workspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addContainer,
        addComponent,
        addDeploymentEnvironment,
        addDeploymentNode,
        addRelationship,
        setView
    }
}
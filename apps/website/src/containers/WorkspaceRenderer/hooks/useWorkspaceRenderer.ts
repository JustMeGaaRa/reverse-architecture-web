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
    fromSystemContextView,
} from "../utils/Workspace";

export const useWorkspaceRenderer = () => {
    const flowState = useReactFlow();
    const store = useWorkspace();
    const flowShared = useYReactFlow();
    
    const addPerson = useCallback((person: Person, position: Position) => {
        // store.addPerson({ element, position });
        // flowShared.setNode(fromElement({
        //     element: person,
        //     position,
        //     styles: store.workspace.views.styles
        // }));
    }, [store]);

    const addSoftwareSystem = useCallback((softwareSystem: SoftwareSystem, position: Position) => {
        // flowShared.setNode(fromElement({
        //     element: softwareSystem,
        //     position,
        //     styles: store.workspace.views.styles
        // }));
    }, [store]);

    const addContainer = useCallback((container: Container, position: Position) => {
        // store.addContainer({
        //     element: container,
        //     position,
        //     styles: store.workspace.views.styles
        // });
    }, [store]);

    const addComponent = useCallback((compoent: Component, position: Position) => {
        // store.addComponent(params);
    }, [store]);
    
    const addDeploymentEnvironment = useCallback((deploymentEnvironment: DeploymentEnvironment) => {
        // store.addDeploymentEnvironment(deploymentEnvironment);
    }, [store]);
    
    const addDeploymentNode = useCallback((params: DeploymentNodeParams) => {
        // store.addDeploymentNode(params);
    }, [store]);

    const addRelationship = useCallback((relationship: Relationship) => {
        // store.addRelationship(relationship);
    }, [store]);

    const setView = useCallback((kind: string, view: any) => {
        if (store.workspace) {
            const { nodes, edges } = kind === Tag.SoftwareSystem.name
                ? fromSystemContextView(view, store.workspace)
                : kind === Tag.Container.name
                ? fromContainerView(view, store.workspace)
                : kind === Tag.Component.name
                ? fromComponentView(view, store.workspace)
                : { nodes: [], edges: [] };
    
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
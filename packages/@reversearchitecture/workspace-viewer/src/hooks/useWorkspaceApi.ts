import { useYReactFlow } from "@justmegaara/y-reactflow";
import {
    Person,
    Position,
    Relationship,
    SoftwareSystem,
    Container,
    Component,
} from "@structurizr/dsl";
import { useCallback } from "react";
import {
    DeploymentNodeParams,
    useWorkspaceStore
} from "../store";
import {
    fromElement,
    fromRelationship,
} from "../services/ReactFlowVisitor";

export const useWorkspaceApi = () => {
    const workspaceStore = useWorkspaceStore();
    const reactFlowShared = useYReactFlow();
    
    const addPerson = useCallback((person: Person, position: Position) => {
        if (workspaceStore?.workspace) {
            reactFlowShared.updateNodes([
                fromElement({
                    element: person,
                    position: position,
                    styles: workspaceStore.workspace.views.styles
                })
            ]);
        }
    }, [reactFlowShared, workspaceStore]);

    const addSoftwareSystem = useCallback((softwareSystem: SoftwareSystem, position: Position) => {
        if (workspaceStore) {
            reactFlowShared.updateNodes([
                fromElement({
                    element: softwareSystem,
                    position: position,
                    styles: workspaceStore.workspace.views.styles
                })
            ]);
        }
    }, [reactFlowShared, workspaceStore]);

    const addContainer = useCallback((container: Container, position: Position) => {
        if (workspaceStore) {
            reactFlowShared.updateNodes([
                fromElement({
                    element: container,
                    position: position,
                    styles: workspaceStore.workspace.views.styles
                })
            ]);
        }
    }, [reactFlowShared, workspaceStore]);

    const addComponent = useCallback((compoent: Component, position: Position) => {
        if (workspaceStore) {
            reactFlowShared.updateNodes([
                fromElement({
                    element: compoent,
                    position: position,
                    styles: workspaceStore.workspace.views.styles
                })
            ]);
        }
    }, [reactFlowShared, workspaceStore]);
    
    const addDeploymentNode = useCallback((params: DeploymentNodeParams) => {
        if (workspaceStore) {
            reactFlowShared.updateNodes([
                fromElement({
                    element: params.deploymentNode,
                    position: params.position,
                    styles: workspaceStore.workspace.views.styles
                })
            ]);
        }
    }, [reactFlowShared, workspaceStore]);

    const addRelationship = useCallback((relationship: Relationship) => {
        if (workspaceStore) {
            reactFlowShared.updateEdges([
                fromRelationship({
                    relationship,
                    styles: workspaceStore.workspace.views.styles
                })
            ]);
        }
    }, [reactFlowShared, workspaceStore]);

    return {
        addPerson,
        addSoftwareSystem,
        addContainer,
        addComponent,
        addDeploymentNode,
        addRelationship
    }
}
import {
    DeploymentEnvironment,
    Person,
    Position,
    Relationship,
    SoftwareSystem,
    Container,
    Component,
} from "@justmegaara/structurizr-dsl";
import { useYReactFlow } from "@justmegaara/y-reactflow";
import { useCallback } from "react";
import {
    DeploymentNodeParams,
    useWorkspaceStore
} from "../store";
import {
    fromElement,
    fromRelationship,
} from "../utils/ReactFlow"

export const useWorkspaceApi = () => {
    const workspaceStore = useWorkspaceStore();
    const reactFlowShared = useYReactFlow();
    
    const addPerson = useCallback((person: Person, position: Position) => {
        if (workspaceStore?.workspace) {
            reactFlowShared.updateNodes([
                fromElement({
                    element: person,
                    size: { ...position, width: 300, height: 200 },
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
                    size: { ...position, width: 300, height: 200 },
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
                    size: { ...position, width: 300, height: 200 },
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
                    size: { ...position, width: 300, height: 200 },
                    styles: workspaceStore.workspace.views.styles
                })
            ]);
        }
    }, [reactFlowShared, workspaceStore]);
    
    const addDeploymentEnvironment = useCallback((deploymentEnvironment: DeploymentEnvironment) => {
        if (workspaceStore) {
            reactFlowShared.updateNodes([
                fromElement({
                    element: deploymentEnvironment,
                    size: { x: 0, y: 0, width: 300, height: 200 },
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
                    size: { ...params.position, width: 300, height: 200 },
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
        addDeploymentEnvironment,
        addDeploymentNode,
        addRelationship
    }
}
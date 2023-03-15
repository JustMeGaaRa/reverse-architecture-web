import { useReactFlow } from "@reactflow/core";
import { useCallback } from "react";
import {
    ComponentParams,
    ContainerParams,
    DeploymentNodeParams,
    DeploymentEnvironment,
    Person,
    Relationship,
    SoftwareSystem,
    useWorkspace,
    Tag
} from "@justmegaara/structurizr-dsl";
import { componentViewSelector, containerViewSelector, systemContextViewSelector } from "../utils/ViewSelectors";

export const useWorkspaceRenderer = () => {
    const flow = useReactFlow();
    const store = useWorkspace();
    
    const addPerson = useCallback((person: Person) => {
        store.addPerson(person);
        // reactFlow.addNodes(fromNode({ node: person, /* layout: view.layout */ }, workspace.workspace.views.styles));
    }, [store]);

    const addSoftwareSystem = useCallback((softwareSystem: SoftwareSystem) => {
        store.addSoftwareSystem(softwareSystem);
        // reactFlow.addNodes(fromNode({ node: softwareSystem, /* layout: view.layout */ }, workspace.workspace.views.styles));
    }, [store]);

    const addContainer = useCallback((params: ContainerParams) => {
        store.addContainer(params);
        // reactFlow.addNodes(fromNode({ node: params.container, parentNode: params.softwareSystemIdentifier, /* layout: view.layout */ }, workspace.workspace.views.styles));
    }, [store]);

    const addComponent = useCallback((params: ComponentParams) => {
        store.addComponent(params);
        // reactFlow.addNodes(fromNode({ node: params.component, parentNode: params.containerIdentifier, /* layout: view.layout */ }, workspace.workspace.views.styles));
    }, [store]);
    
    const addDeploymentEnvironment = useCallback((deploymentEnvironment: DeploymentEnvironment) => {
        store.addDeploymentEnvironment(deploymentEnvironment);
        // reactFlow.addNodes(fromNode({ node: deploymentEnvironment, /* layout: view.layout */ }, workspace.workspace.views.styles));
    }, [store]);
    
    const addDeploymentNode = useCallback((params: DeploymentNodeParams) => {
        store.addDeploymentNode(params);
        // reactFlow.addNodes(fromNode({ node: deploymentNode, /* layout: view.layout */ }, workspace.workspace.views.styles));
    }, [store]);

    const addRelationship = useCallback((relationship: Relationship) => {
        store.addRelationship(relationship);
        // reactFlow.addEdges(fromRelationship({ relationship, /* layout: view.layout */ }, workspace.workspace.views.styles));
    }, [store]);

    const setView = useCallback((kind: string, view: any) => {
        if (store.workspace) {
            const { nodes, edges } = kind === Tag.SoftwareSystem.name
                ? systemContextViewSelector(view, store.workspace)
                : kind === Tag.Container.name
                ? containerViewSelector(view, store.workspace)
                : kind === Tag.Component.name
                ? componentViewSelector(view, store.workspace)
                : { nodes: [], edges: [] };
    
            flow.setNodes(nodes);
            flow.setEdges(edges);
            flow.fitView({ padding: 0.2, duration: 500 });
        }
    }, [flow, store.workspace]);

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
import { useReactFlow } from "@reactflow/core";
import {
    Component,
    Container,
    DeploymentNode,
    ElementType,
    getDefaultElement,
    Identifier,
    InfrastructureNode,
    Person,
    Position,
    SoftwareSystem,
    Workspace
} from "@structurizr/dsl";
import { useCallback } from "react";
import { ReactFlowNodeTypeNames } from "../types";
import { createReactFlowModelNode } from "../utils";
import { useWorkspace } from "./useWorkspace";

export const useModelView = () => {
    const { setWorkspace } = useWorkspace();
    const { setNodes } = useReactFlow();

    const addPerson = useCallback((position: Position) => {
        const person = getDefaultElement(ElementType.Person) as Person;
        const node = createReactFlowModelNode({
            element: person,
            elementChildrenCount: undefined,
            type: ReactFlowNodeTypeNames.ModelElement,
            position
        });

        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model.addPerson(person);
            return builder.toSnapshot();
        });

        return person;
    }, [setNodes, setWorkspace]);

    const addSoftwareSystem = useCallback((position: Position) => {
        const softwareSystem = getDefaultElement(ElementType.SoftwareSystem) as SoftwareSystem;
        const node = createReactFlowModelNode({
            element: softwareSystem,
            elementChildrenCount: undefined,
            type: ReactFlowNodeTypeNames.ModelElement,
            position
        });

        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder?.model.addSoftwareSystem(softwareSystem);
            return builder.toSnapshot();
        });

        return softwareSystem;
    }, [setNodes, setWorkspace]);

    const addContainer = useCallback((systemSoftwareIdentifier: Identifier, position: Position) => {
        const container = getDefaultElement(ElementType.Container) as Container;
        const node = createReactFlowModelNode({
            element: container,
            elementChildrenCount: undefined,
            type: ReactFlowNodeTypeNames.ModelElement,
            position
        });

        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model
                .findSoftwareSystem(systemSoftwareIdentifier)
                .addContainer(container);
            return builder.toSnapshot();
        });

        return container;
    }, [setNodes, setWorkspace]);

    const addComponent = useCallback((containerIdentifier: Identifier, position: Position) => {
        const component = getDefaultElement(ElementType.Component) as Component;
        const node = createReactFlowModelNode({
            element: component,
            elementChildrenCount: undefined,
            type: ReactFlowNodeTypeNames.ModelElement,
            position
        });

        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model
                .findContainer(containerIdentifier)
                .addComponent(component);
            return builder.toSnapshot();
        });

        return component;
    }, [setNodes, setWorkspace]);

    const addDeploymentNode = useCallback((environmentIdentifier: Identifier, position: Position) => {
        const deploymentNode = getDefaultElement(ElementType.DeploymentNode) as DeploymentNode;
        const node = createReactFlowModelNode({
            element: deploymentNode,
            elementChildrenCount: undefined,
            type: ReactFlowNodeTypeNames.ModelElement,
            position
        });

        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            // builder.model.deploymentEnvironments
            //     .find(x => x.identifier === environmentIdentifier)
            //     .addDeploymentNode(deploymentNode);
            return builder.toSnapshot();
        });

        return deploymentNode;
    }, [setNodes, setWorkspace]);

    const addInfrastructureNode = useCallback((environmentIdentifier: Identifier, position: Position) => {
        const infrastructureNode = getDefaultElement(ElementType.InfrastructureNode) as InfrastructureNode;
        const node = createReactFlowModelNode({
            element: infrastructureNode,
            elementChildrenCount: undefined,
            type: ReactFlowNodeTypeNames.ModelElement,
            position
        });

        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            // builder.model.deploymentEnvironments
            //     .find(x => x.identifier === environmentIdentifier)
            //     .addInfrastructureNode(deploymentNode);
            return builder.toSnapshot();
        });

        return infrastructureNode;
    }, [setNodes, setWorkspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addContainer,
        addComponent,
        addDeploymentNode,
        addInfrastructureNode
    }
}
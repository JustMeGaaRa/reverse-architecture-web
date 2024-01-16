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
import { useWorkspace } from "@workspace/core";
import { useCallback } from "react";
import { getModelNodeFromElement } from "../utils";

export const useModelView = () => {
    const { workspace, setWorkspace } = useWorkspace();
    const { setNodes } = useReactFlow();

    const addPerson = useCallback((position: Position) => {
        const person = getDefaultElement(ElementType.Person) as Person;
        const node = getModelNodeFromElement({
            element: person,
            elementChildrenCount: undefined,
            type: "element",
            styles: workspace.views.configuration.styles,
            position
        });

        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model.addPerson(person);
            return builder.toObject();
        });

        return person;
    }, [workspace, setNodes, setWorkspace]);

    const addSoftwareSystem = useCallback((position: Position) => {
        const softwareSystem = getDefaultElement(ElementType.SoftwareSystem) as SoftwareSystem;
        const node = getModelNodeFromElement({
            element: softwareSystem,
            elementChildrenCount: undefined,
            type: "element",
            styles: workspace.views.configuration.styles,
            position
        });

        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder?.model.addSoftwareSystem(softwareSystem);
            return builder.toObject();
        });

        return softwareSystem;
    }, [workspace, setNodes, setWorkspace]);

    const addContainer = useCallback((systemSoftwareIdentifier: Identifier, position: Position) => {
        const container = getDefaultElement(ElementType.Container) as Container;
        const node = getModelNodeFromElement({
            element: container,
            elementChildrenCount: undefined,
            type: "element",
            styles: workspace.views.configuration.styles,
            position
        });

        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model
                .findSoftwareSystem(systemSoftwareIdentifier)
                .addContainer(container);
            return builder.toObject();
        });

        return container;
    }, [workspace, setNodes, setWorkspace]);

    const addComponent = useCallback((containerIdentifier: Identifier, position: Position) => {
        const component = getDefaultElement(ElementType.Component) as Component;
        const node = getModelNodeFromElement({
            element: component,
            elementChildrenCount: undefined,
            type: "element",
            styles: workspace.views.configuration.styles,
            position
        });

        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model
                .findContainer(containerIdentifier)
                .addComponent(component);
            return builder.toObject();
        });

        return component;
    }, [workspace, setNodes, setWorkspace]);

    const addDeploymentNode = useCallback((environmentIdentifier: Identifier, position: Position) => {
        const deploymentNode = getDefaultElement(ElementType.DeploymentNode) as DeploymentNode;
        const node = getModelNodeFromElement({
            element: deploymentNode,
            elementChildrenCount: undefined,
            type: "element",
            styles: workspace.views.configuration.styles,
            position
        });

        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            // builder.model.deploymentEnvironments
            //     .find(x => x.identifier === environmentIdentifier)
            //     .addDeploymentNode(deploymentNode);
            return builder.toObject();
        });

        return deploymentNode;
    }, [workspace, setNodes, setWorkspace]);

    const addInfrastructureNode = useCallback((environmentIdentifier: Identifier, position: Position) => {
        const infrastructureNode = getDefaultElement(ElementType.InfrastructureNode) as InfrastructureNode;
        const node = getModelNodeFromElement({
            element: infrastructureNode,
            elementChildrenCount: undefined,
            type: "element",
            styles: workspace.views.configuration.styles,
            position
        });

        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            // builder.model.deploymentEnvironments
            //     .find(x => x.identifier === environmentIdentifier)
            //     .addInfrastructureNode(deploymentNode);
            return builder.toObject();
        });

        return infrastructureNode;
    }, [workspace, setNodes, setWorkspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addContainer,
        addComponent,
        addDeploymentNode,
        addInfrastructureNode
    }
}
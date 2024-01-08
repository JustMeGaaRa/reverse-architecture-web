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
    SoftwareSystem
} from "@structurizr/dsl";
import { useWorkspace } from "@workspace/core";
import { useCallback } from "react";
import { getModelNodeFromElement } from "../utils";

export const useModelView = () => {
    const { workspace } = useWorkspace();
    const { setNodes } = useReactFlow();

    const addPerson = useCallback((position: Position) => {
        const person = getDefaultElement(ElementType.Person) as Person;
        
        workspace?.model.addPerson(person);

        const node = getModelNodeFromElement({
            element: person,
            elementChildrenCount: undefined,
            type: "element",
            styles: workspace.views.configuration.styles,
            position
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);

    const addSoftwareSystem = useCallback((position: Position) => {
        const softwareSystem = getDefaultElement(ElementType.SoftwareSystem) as SoftwareSystem;

        workspace?.model.addSoftwareSystem(softwareSystem);

        const node = getModelNodeFromElement({
            element: softwareSystem,
            elementChildrenCount: undefined,
            type: "element",
            styles: workspace.views.configuration.styles,
            position
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);

    const addContainer = useCallback((systemSoftwareIdentifier: Identifier, position: Position) => {
        const container = getDefaultElement(ElementType.Container) as Container;
        
        workspace.model
            .findSoftwareSystem(systemSoftwareIdentifier)
            .addContainer(container);

        const node = getModelNodeFromElement({
            element: container,
            elementChildrenCount: undefined,
            type: "element",
            styles: workspace.views.configuration.styles,
            position
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);

    const addComponent = useCallback((containerIdentifier: Identifier, position: Position) => {
        const component = getDefaultElement(ElementType.Component) as Component;
        
        workspace.model
            .findContainer(containerIdentifier)
            .addComponent(component);

        const node = getModelNodeFromElement({
            element: component,
            elementChildrenCount: undefined,
            type: "element",
            styles: workspace.views.configuration.styles,
            position
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);

    const addDeploymentNode = useCallback((environmentIdentifier: Identifier, position: Position) => {
        const deploymentNode = getDefaultElement(ElementType.DeploymentNode) as DeploymentNode;

        // workspace.model.deploymentEnvironments
        //     .find(x => x.identifier === environmentIdentifier)
        //     .addDeploymentNode(deploymentNode);

        const node = getModelNodeFromElement({
            element: deploymentNode,
            elementChildrenCount: undefined,
            type: "element",
            styles: workspace.views.configuration.styles,
            position
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);

    const addInfrastructureNode = useCallback((environmentIdentifier: Identifier, position: Position) => {
        const infrastructureNode = getDefaultElement(ElementType.InfrastructureNode) as InfrastructureNode;

        // workspace.model.deploymentEnvironments
        //     .find(x => x.identifier === environmentIdentifier)
        //     .addInfrastructureNode(deploymentNode);

        const node = getModelNodeFromElement({
            element: infrastructureNode,
            elementChildrenCount: undefined,
            type: "element",
            styles: workspace.views.configuration.styles,
            position
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);

    return {
        addPerson,
        addSoftwareSystem,
        addContainer,
        addComponent,
        addDeploymentNode,
        addInfrastructureNode
    }
}
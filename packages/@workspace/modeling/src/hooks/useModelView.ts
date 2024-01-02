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
    SoftwareSystem
} from "@structurizr/dsl";
import { useWorkspace } from "@workspace/core";
import { useCallback } from "react";
import { getNodeFromElement } from "../utils";

export const useModelView = () => {
    const { workspace } = useWorkspace();
    const { setNodes } = useReactFlow();

    const addPerson = useCallback(() => {
        const person = getDefaultElement(ElementType.Person) as Person;
        
        workspace?.model.addPerson(person);

        const node = getNodeFromElement(person, undefined, "element");
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);

    const addSoftwareSystem = useCallback(() => {
        const softwareSystem = getDefaultElement(ElementType.SoftwareSystem) as SoftwareSystem;

        workspace?.model.addSoftwareSystem(softwareSystem);

        const node = getNodeFromElement(softwareSystem, undefined, "element");
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);

    const addContainer = useCallback((systemSoftwareIdentifier: Identifier) => {
        const container = getDefaultElement(ElementType.Container) as Container;
        
        workspace.model
            .findSoftwareSystem(systemSoftwareIdentifier)
            .addContainer(container);

        const node = getNodeFromElement(container, undefined, "element");
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);

    const addComponent = useCallback((containerIdentifier: Identifier) => {
        const component = getDefaultElement(ElementType.Component) as Component;
        
        workspace.model
            .findContainer(containerIdentifier)
            .addComponent(component);

        const node = getNodeFromElement(component, undefined, "element");
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);

    const addDeploymentNode = useCallback((environmentIdentifier: Identifier) => {
        const deploymentNode = getDefaultElement(ElementType.DeploymentNode) as DeploymentNode;

        // workspace.model.deploymentEnvironments
        //     .find(x => x.identifier === environmentIdentifier)
        //     .addDeploymentNode(deploymentNode);

        const node = getNodeFromElement(deploymentNode, undefined, "element");
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);

    const addInfrastructureNode = useCallback((environmentIdentifier?: Identifier) => {
        const infrastructureNode = getDefaultElement(ElementType.InfrastructureNode) as InfrastructureNode;

        // workspace.model.deploymentEnvironments
        //     .find(x => x.identifier === environmentIdentifier)
        //     .addInfrastructureNode(deploymentNode);

        const node = getNodeFromElement(infrastructureNode, undefined, "element");
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
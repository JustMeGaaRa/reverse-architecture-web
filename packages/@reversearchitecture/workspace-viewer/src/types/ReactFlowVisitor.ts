import {
    Component,
    Container,
    ContainerInstance,
    DeploymentNode,
    findContainer,
    findSoftwareSystem,
    Group,
    InfrastructureNode,
    IViewDefinition,
    IElementVisitor,
    Person,
    Relationship,
    SoftwareSystem,
    SoftwareSystemInstance,
    ViewType,
    Workspace,
} from "@structurizr/dsl";
import {
    getNodeFromElement,
    getEdgeFromRelationship,
} from "../utils";
import { IBoundingBoxNode } from "./IBoundingBoxNode";
import { ReactFlowBuilder } from "./ReactFlowBuilder";

export class ReactFlowVisitor implements IElementVisitor {
    constructor(
        private workspace: Workspace,
        private selectedView: IViewDefinition,
        private builder: ReactFlowBuilder,
        private branches: Map<string, IBoundingBoxNode>
    ) { }

    visitGroup(group: Group, params?: { parentId?: string }): void {
        const box = this.branches.get(group.identifier);
        const node = getNodeFromElement({
            elementId: group.identifier,
            element: group,
            isBoundary: true,
            parentId: params?.parentId,
            position: box.getRelativePosition(),
            size: box.getSize(),
            styles: this.workspace.views.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitPerson(person: Person, params?: { parentId?: string }): void {
        const box = this.branches.get(person.identifier);
        const node = getNodeFromElement({
            element: person,
            position: box.getRelativePosition(),
            parentId: params?.parentId,
            styles: this.workspace.views.configuration.styles,
        });
        this.builder.addNode(node);
    }
    
    visitSoftwareSystem(softwareSystem: SoftwareSystem, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Container
            && softwareSystem.identifier === this.selectedView.identifier;
        const box = this.branches.get(softwareSystem.identifier);
        const node = getNodeFromElement({
            element: softwareSystem,
            isBoundary,
            parentId: params?.parentId,
            position: box.getRelativePosition(),
            size: box.getSize(),
            styles: this.workspace.views.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitContainer(container: Container, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Component
            && container.identifier === this.selectedView.identifier;
        const box = this.branches.get(container.identifier);
        
        const node = getNodeFromElement({
            element: container,
            isBoundary,
            parentId: params?.parentId,
            position: box.getRelativePosition(),
            size: box.getSize(),
            styles: this.workspace.views.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitComponent(component: Component, params?: { parentId?: string }): void {
        const box = this.branches.get(component.identifier);
        const node = getNodeFromElement({
            element: component,
            position: box.getRelativePosition(),
            parentId: params?.parentId,
            styles: this.workspace.views.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitDeploymentNode(deploymentNode: DeploymentNode, params?: { parentId?: string }): void {
        const box = this.branches.get(deploymentNode.identifier);
        const node = getNodeFromElement({
            element: deploymentNode,
            parentId: params?.parentId,
            position: box.getRelativePosition(),
            size: box.getSize(),
            styles: this.workspace.views.configuration.styles,
        });
        this.builder.addNode(node);
    }
    
    visitInfrastructureNode(infrastructureNode: InfrastructureNode, params?: { parentId?: string }): void {
        const box = this.branches.get(infrastructureNode.identifier);
        const node = getNodeFromElement({
            element: infrastructureNode,
            position: box.getRelativePosition(),
            parentId: params?.parentId,
            styles: this.workspace.views.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitSoftwareSystemInstance(softwareSystemInstance: SoftwareSystemInstance, params?: { parentId?: string }): void {
        const softwareSystem = findSoftwareSystem(this.workspace, softwareSystemInstance.softwareSystemIdentifier);
        const box = this.branches.get(softwareSystemInstance.identifier);
        const node = getNodeFromElement({
            elementId: softwareSystemInstance.identifier,
            element: softwareSystem,
            position: box.getRelativePosition(),
            parentId: params?.parentId,
            styles: this.workspace.views.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitContainerInstance(containerInstance: ContainerInstance, params?: { parentId?: string }): void {
        const container = findContainer(this.workspace, containerInstance.containerIdentifier);
        const box = this.branches.get(containerInstance.identifier);
        const node = getNodeFromElement({
            elementId: containerInstance.identifier,
            element: container,
            position: box.getRelativePosition(),
            parentId: params?.parentId,
            styles: this.workspace.views.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitRelationship(relationship: Relationship): void {
        const edge = getEdgeFromRelationship({
            relationship,
            styles: this.workspace.views.configuration.styles,
        });
        this.builder.addEdge(edge);
    }
}
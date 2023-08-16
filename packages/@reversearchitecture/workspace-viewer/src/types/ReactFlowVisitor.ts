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
    IWorkspace,
    IGroup,
    IPerson,
    ISoftwareSystem,
    IContainer,
    IComponent,
    IDeploymentNode,
    IInfrastructureNode,
    ISoftwareSystemInstance,
    IContainerInstance,
    IRelationship,
    IConfiguration,
    IModel,
} from "@structurizr/dsl";
import {
    getNodeFromElement,
    getEdgeFromRelationship,
} from "../utils";
import { IBoundingBoxNode } from "./IBoundingBoxNode";
import { ReactFlowBuilder } from "./ReactFlowBuilder";

export class ReactFlowVisitor implements IElementVisitor {
    constructor(
        private model: IModel,
        private configuration: IConfiguration,
        private selectedView: IViewDefinition,
        private builder: ReactFlowBuilder,
        private branches: Map<string, IBoundingBoxNode>
    ) { }

    visitGroup(group: IGroup, params?: { parentId?: string }): void {
        const box = this.branches.get(group.identifier);
        const node = getNodeFromElement({
            elementId: group.identifier,
            element: group,
            isBoundary: true,
            parentId: params?.parentId,
            position: box.getRelativePosition(),
            size: box.getSize(),
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitPerson(person: IPerson, params?: { parentId?: string }): void {
        const box = this.branches.get(person.identifier);
        const node = getNodeFromElement({
            element: person,
            position: box.getRelativePosition(),
            parentId: params?.parentId,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }
    
    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Container
            && softwareSystem.identifier === this.selectedView.identifier;
        const box = this.branches.get(softwareSystem.identifier);
        const node = getNodeFromElement({
            element: softwareSystem,
            isBoundary,
            parentId: params?.parentId,
            position: box.getRelativePosition(),
            size: box.getSize(),
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitContainer(container: IContainer, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Component
            && container.identifier === this.selectedView.identifier;
        const box = this.branches.get(container.identifier);
        
        const node = getNodeFromElement({
            element: container,
            isBoundary,
            parentId: params?.parentId,
            position: box.getRelativePosition(),
            size: box.getSize(),
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitComponent(component: IComponent, params?: { parentId?: string }): void {
        const box = this.branches.get(component.identifier);
        const node = getNodeFromElement({
            element: component,
            position: box.getRelativePosition(),
            parentId: params?.parentId,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitDeploymentNode(deploymentNode: IDeploymentNode, params?: { parentId?: string }): void {
        const box = this.branches.get(deploymentNode.identifier);
        const node = getNodeFromElement({
            element: deploymentNode,
            parentId: params?.parentId,
            position: box.getRelativePosition(),
            size: box.getSize(),
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }
    
    visitInfrastructureNode(infrastructureNode: IInfrastructureNode, params?: { parentId?: string }): void {
        const box = this.branches.get(infrastructureNode.identifier);
        const node = getNodeFromElement({
            element: infrastructureNode,
            position: box.getRelativePosition(),
            parentId: params?.parentId,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitSoftwareSystemInstance(softwareSystemInstance: ISoftwareSystemInstance, params?: { parentId?: string }): void {
        const softwareSystem = findSoftwareSystem(this.model, softwareSystemInstance.softwareSystemIdentifier);
        const box = this.branches.get(softwareSystemInstance.identifier);
        const node = getNodeFromElement({
            elementId: softwareSystemInstance.identifier,
            element: softwareSystem,
            position: box.getRelativePosition(),
            parentId: params?.parentId,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitContainerInstance(containerInstance: IContainerInstance, params?: { parentId?: string }): void {
        const container = findContainer(this.model, containerInstance.containerIdentifier);
        const box = this.branches.get(containerInstance.identifier);
        const node = getNodeFromElement({
            elementId: containerInstance.identifier,
            element: container,
            position: box.getRelativePosition(),
            parentId: params?.parentId,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitRelationship(relationship: IRelationship): void {
        const edge = getEdgeFromRelationship({
            relationship,
            styles: this.configuration.styles,
        });
        this.builder.addEdge(edge);
    }
}
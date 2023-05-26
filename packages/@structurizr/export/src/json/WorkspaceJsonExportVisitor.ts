import { Component, Container, ContainerInstance, DeploymentNode, ElementStyle, Group, InfrastructureNode, IVisitor, Model, Person, Relationship, RelationshipStyle, SoftwareSystem, SoftwareSystemInstance, Styles, Views, Workspace } from "@structurizr/dsl";

export class WorkspaceJsonExportVisitor implements IVisitor {
    constructor(
        private readonly beautify: boolean = false,
        private readonly indent: number = 4
    ) { }

    visitWorkspace(workspace: Workspace): string {
        return JSON.stringify(workspace, null, 4);
    }
    visitModel(model: Model): string {
        return JSON.stringify(model, null, this.beautify ? this.indent : undefined);
    }
    visitGroup(group: Group, params?: { parentId?: string; }): string {
        return JSON.stringify(group, null, this.beautify ? this.indent : undefined);
    }
    visitPerson(person: Person, params?: { parentId?: string; }): string {
        return JSON.stringify(person, null, this.beautify ? this.indent : undefined);
    }
    visitSoftwareSystem(softwareSystem: SoftwareSystem, params?: { parentId?: string; }): string {
        return JSON.stringify(softwareSystem, null, this.beautify ? this.indent : undefined);
    }
    visitContainer(container: Container, params?: { parentId?: string; }): string {
        return JSON.stringify(container, null, this.beautify ? this.indent : undefined);
    }
    visitComponent(component: Component, params?: { parentId?: string; }): string {
        return JSON.stringify(component, null, this.beautify ? this.indent : undefined);
    }
    visitDeploymentNode(deploymentNode: DeploymentNode, params?: { parentId?: string; }): string {
        return JSON.stringify(deploymentNode, null, this.beautify ? this.indent : undefined);
    }
    visitInfrastructureNode(infrastructureNode: InfrastructureNode, params?: { parentId?: string; }): string {
        return JSON.stringify(infrastructureNode, null, this.beautify ? this.indent : undefined);
    }
    visitSoftwareSystemInstance(softwareSystemInstance: SoftwareSystemInstance, params?: { parentId?: string; }): string {
        return JSON.stringify(softwareSystemInstance, null, this.beautify ? this.indent : undefined);
    }
    visitContainerInstance(containerInstance: ContainerInstance, params?: { parentId?: string; }): string {
        return JSON.stringify(containerInstance, null, this.beautify ? this.indent : undefined);
    }
    visitRelationship(relationship: Relationship): string {
        return JSON.stringify(relationship, null, this.beautify ? this.indent : undefined);
    }
    visitViews(views: Views): string {
        return JSON.stringify(views, null, this.beautify ? this.indent : undefined);
    }
    visitStyles(styles: Styles): string {
        return JSON.stringify(styles, null, this.beautify ? this.indent : undefined);
    }
    visitElementStyle(elementStyle: ElementStyle): string {
        return JSON.stringify(elementStyle, null, this.beautify ? this.indent : undefined);
    }
    visitRelationshipStyle(relationshipStyle: RelationshipStyle): string {
        return JSON.stringify(relationshipStyle, null, this.beautify ? this.indent : undefined);
    }
}
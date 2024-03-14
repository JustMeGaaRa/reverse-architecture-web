import {
    ElementStyleCollection,
    IElementVisitor,
    RelationshipStyleCollection,
    IStyles,
    IComponent,
    IContainer,
    IContainerInstance,
    IDeploymentNode,
    IGroup,
    IInfrastructureNode,
    IModel,
    IPerson,
    IRelationship,
    ISoftwareSystem,
    ISoftwareSystemInstance,
    IViews,
    IWorkspaceSnapshot
} from "@structurizr/dsl";

export class WorkspaceJsonExportVisitor implements IElementVisitor {
    constructor(
        private readonly beautify: boolean = false,
        private readonly indent: number = 4
    ) { }

    visitWorkspace(workspace: IWorkspaceSnapshot): string {
        return JSON.stringify(workspace, null, 4);
    }
    visitModel(model: IModel): string {
        return JSON.stringify(model, null, this.beautify ? this.indent : undefined);
    }
    visitGroup(group: IGroup, params?: { parentId?: string; }): string {
        return JSON.stringify(group, null, this.beautify ? this.indent : undefined);
    }
    visitPerson(person: IPerson, params?: { parentId?: string; }): string {
        return JSON.stringify(person, null, this.beautify ? this.indent : undefined);
    }
    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string; }): string {
        return JSON.stringify(softwareSystem, null, this.beautify ? this.indent : undefined);
    }
    visitContainer(container: IContainer, params?: { parentId?: string; }): string {
        return JSON.stringify(container, null, this.beautify ? this.indent : undefined);
    }
    visitComponent(component: IComponent, params?: { parentId?: string; }): string {
        return JSON.stringify(component, null, this.beautify ? this.indent : undefined);
    }
    visitDeploymentNode(deploymentNode: IDeploymentNode, params?: { parentId?: string; }): string {
        return JSON.stringify(deploymentNode, null, this.beautify ? this.indent : undefined);
    }
    visitInfrastructureNode(infrastructureNode: IInfrastructureNode, params?: { parentId?: string; }): string {
        return JSON.stringify(infrastructureNode, null, this.beautify ? this.indent : undefined);
    }
    visitSoftwareSystemInstance(softwareSystemInstance: ISoftwareSystemInstance, params?: { parentId?: string; }): string {
        return JSON.stringify(softwareSystemInstance, null, this.beautify ? this.indent : undefined);
    }
    visitContainerInstance(containerInstance: IContainerInstance, params?: { parentId?: string; }): string {
        return JSON.stringify(containerInstance, null, this.beautify ? this.indent : undefined);
    }
    visitRelationship(relationship: IRelationship): string {
        return JSON.stringify(relationship, null, this.beautify ? this.indent : undefined);
    }
    visitViews(views: IViews): string {
        return JSON.stringify(views, null, this.beautify ? this.indent : undefined);
    }
    visitStyles(styles: IStyles): string {
        return JSON.stringify(styles, null, this.beautify ? this.indent : undefined);
    }
    visitElementStyle(elementStyle: ElementStyleCollection): string {
        return JSON.stringify(elementStyle, null, this.beautify ? this.indent : undefined);
    }
    visitRelationshipStyle(relationshipStyle: RelationshipStyleCollection): string {
        return JSON.stringify(relationshipStyle, null, this.beautify ? this.indent : undefined);
    }
}
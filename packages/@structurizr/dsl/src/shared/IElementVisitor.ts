import {
    IComponent,
    IContainer,
    IContainerInstance,
    IDeploymentNode,
    IGroup,
    IInfrastructureNode,
    IPerson,
    IRelationship,
    ISoftwareSystem,
    ISoftwareSystemInstance
} from "../";

export interface IElementVisitor {
    visitGroup(
        group: IGroup,
        params?: { parentId?: string }): void;
    visitPerson(
        person: IPerson,
        params?: { parentId?: string }): void;
    visitSoftwareSystem(
        softwareSystem: ISoftwareSystem,
        params?: { parentId?: string }): void;
    visitContainer(
        container: IContainer,
        params?: { parentId?: string }): void;
    visitComponent(
        component: IComponent,
        params?: { parentId?: string }): void;
    visitDeploymentNode(
        deploymentNode: IDeploymentNode,
        params?: { parentId?: string }): void;
    visitInfrastructureNode(
        infrastructureNode: IInfrastructureNode,
        params?: { parentId?: string }): void;
    visitSoftwareSystemInstance(
        softwareSystemInstance: ISoftwareSystemInstance,
        params?: { parentId?: string }): void;
    visitContainerInstance(
        containerInstance: IContainerInstance,
        params?: { parentId?: string }): void;
    visitRelationship(relationship: IRelationship): void;
}
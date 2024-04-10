import { IComponent } from "./IComponent";
import { IContainer } from "./IContainer";
import { IContainerInstance } from "./IContainerInstance";
import { IDeploymentNode } from "./IDeploymentNode";
import { IGroup } from "./IGroup";
import { IInfrastructureNode } from "./IInfrastructureNode";
import { IPerson } from "./IPerson";
import { IRelationship } from "./IRelationship";
import { ISoftwareSystem } from "./ISoftwareSystem";
import { ISoftwareSystemInstance } from "./ISoftwareSystemInstance";
import { IWorkspaceSnapshot } from "./IWorkspaceSnapshot";

export interface IElementVisitor {
    visitWorkspace(workspace: IWorkspaceSnapshot): void;
    visitGroup(
        group: IGroup,
        params?: { parentId?: string; }): void;
    visitPerson(
        person: IPerson,
        params?: { parentId?: string; }): void;
    visitSoftwareSystem(
        softwareSystem: ISoftwareSystem,
        params?: { parentId?: string; }): void;
    visitContainer(
        container: IContainer,
        params?: { parentId?: string; }): void;
    visitComponent(
        component: IComponent,
        params?: { parentId?: string; }): void;
    visitDeploymentNode(
        deploymentNode: IDeploymentNode,
        params?: { parentId?: string; }): void;
    visitInfrastructureNode(
        infrastructureNode: IInfrastructureNode,
        params?: { parentId?: string; }): void;
    visitSoftwareSystemInstance(
        softwareSystemInstance: ISoftwareSystemInstance,
        params?: { parentId?: string; }): void;
    visitContainerInstance(
        containerInstance: IContainerInstance,
        params?: { parentId?: string; }): void;
    visitRelationship(relationship: IRelationship): void;
}

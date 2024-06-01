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

export interface IElementVisitor<T = any> {
    visitWorkspace(
        workspace: IWorkspaceSnapshot,
        params?: { children?: Array<T>; }
    ): T;
    visitGroup(
        group: IGroup,
        params?: { parentId?: string; children?: Array<T>; }
    ): T;
    visitPerson(
        person: IPerson,
        params?: { parentId?: string; children?: Array<T>; }
    ): T;
    visitSoftwareSystem(
        softwareSystem: ISoftwareSystem,
        params?: { parentId?: string; children?: Array<T>; }
    ): T;
    visitContainer(
        container: IContainer,
        params?: { parentId?: string; children?: Array<T>; }
    ): T;
    visitComponent(
        component: IComponent,

        params?: { parentId?: string; children?: Array<T>; }
    ): T;
    visitDeploymentNode(
        deploymentNode: IDeploymentNode,
        params?: { parentId?: string; children?: Array<T>; }
    ): T;
    visitInfrastructureNode(
        infrastructureNode: IInfrastructureNode,
        params?: { parentId?: string; children?: Array<T>; }
    ): T;
    visitSoftwareSystemInstance(
        softwareSystemInstance: ISoftwareSystemInstance,
        params?: { parentId?: string; children?: Array<T>; }
    ): T;
    visitContainerInstance(
        containerInstance: IContainerInstance,
        params?: { parentId?: string; children?: Array<T>; }
    ): T;
    visitRelationship(
        relationship: IRelationship,
        params?: {  children?: Array<T>; }
    ): T;
}

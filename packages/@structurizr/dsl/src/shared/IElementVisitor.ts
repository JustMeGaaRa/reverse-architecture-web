import { Component, IComponent } from "../types/model/Component";
import { Container, IContainer } from "../types/model/Container";
import { ContainerInstance, IContainerInstance } from "../types/model/ContainerInstance";
import { DeploymentNode, IDeploymentNode } from "../types/model/DeploymentNode";
import { Group, IGroup } from "../types/model/Group";
import { IInfrastructureNode, InfrastructureNode } from "../types/model/InfrastructureNode";
import { IPerson, Person } from "../types/model/Person";
import { Relationship } from "../types/model/Relationship";
import { ISoftwareSystem, SoftwareSystem } from "../types/model/SoftwareSystem";
import { ISoftwareSystemInstance, SoftwareSystemInstance } from "../types/model/SoftwareSystemInstance";

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
    visitRelationship(relationship: Relationship): void;
}
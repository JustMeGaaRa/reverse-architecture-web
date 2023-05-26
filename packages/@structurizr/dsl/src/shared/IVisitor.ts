import { Model } from "../types/Model";
import { Component } from "../types/model/Component";
import { Container } from "../types/model/Container";
import { ContainerInstance } from "../types/model/ContainerInstance";
import { DeploymentNode } from "../types/model/DeploymentNode";
import { Group } from "../types/model/Group";
import { InfrastructureNode } from "../types/model/InfrastructureNode";
import { Person } from "../types/model/Person";
import { Relationship } from "../types/model/Relationship";
import { SoftwareSystem } from "../types/model/SoftwareSystem";
import { SoftwareSystemInstance } from "../types/model/SoftwareSystemInstance";
import { Views } from "../types/Views";
import { ElementStyle, RelationshipStyle } from "../types/views/Style";
import { Styles } from "../types/views/Style";
import { Workspace } from "../types/Workspace";

export interface IVisitor {
    visitWorkspace(workspace: Workspace): void;
    visitModel(model: Model): void;
    visitGroup(
        group: Group,
        params?: { parentId?: string }): void;
    visitPerson(
        person: Person,
        params?: { parentId?: string }): void;
    visitSoftwareSystem(
        softwareSystem: SoftwareSystem,
        params?: { parentId?: string }): void;
    visitContainer(
        container: Container,
        params?: { parentId?: string }): void;
    visitComponent(
        component: Component,
        params?: { parentId?: string }): void;
    visitDeploymentNode(
        deploymentNode: DeploymentNode,
        params?: { parentId?: string }): void;
    visitInfrastructureNode(
        infrastructureNode: InfrastructureNode,
        params?: { parentId?: string }): void;
    visitSoftwareSystemInstance(
        softwareSystemInstance: SoftwareSystemInstance,
        params?: { parentId?: string }): void;
    visitContainerInstance(
        containerInstance: ContainerInstance,
        params?: { parentId?: string }): void;
    visitRelationship(relationship: Relationship): void;
    visitViews(views: Views): void;
    visitStyles(styles: Styles): void;
    visitElementStyle(elementStyle: ElementStyle): void;
    visitRelationshipStyle(relationshipStyle: RelationshipStyle): void;
}
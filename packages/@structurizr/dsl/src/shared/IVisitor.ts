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

export interface IVisitor {
    visitGroup: (group: Group) => void;
    visitPerson: (person: Person) => void;
    visitSoftwareSystem: (softwareSystem: SoftwareSystem) => void;
    visitContainer: (container: Container) => void;
    visitComponent: (component: Component) => void;
    visitDeploymentNode: (deploymentNode: DeploymentNode) => void;
    visitInfrastructureNode: (infrastructureNode: InfrastructureNode) => void;
    visitSoftwareSystemInstance: (softwareSystemInstance: SoftwareSystemInstance) => void;
    visitContainerInstance: (containerInstance: ContainerInstance) => void;
    visitRelationship: (relationship: Relationship) => void;
}
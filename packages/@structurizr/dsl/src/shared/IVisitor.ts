import { Component } from "../types/model/Component";
import { Container } from "../types/model/Container";
import { DeploymentNode } from "../types/model/DeploymentNode";
import { Person } from "../types/model/Person";
import { Relationship } from "../types/model/Relationship";
import { SoftwareSystem } from "../types/model/SoftwareSystem";

export interface IVisitor {
    visitPerson: (person: Person) => void;
    visitSoftwareSystem: (softwareSystem: SoftwareSystem) => void;
    visitContainer: (container: Container) => void;
    visitComponent: (component: Component) => void;
    visitDeploymentNode: (deploymentNode: DeploymentNode) => void;
    visitRelationship: (relationship: Relationship) => void;
}
import { Component } from "../model/Component";
import { Container } from "../model/Container";
import { Person } from "../model/Person";
import { Relationship } from "../model/Relationship";
import { SoftwareSystem } from "../model/SoftwareSystem";

export interface IVisitor {
    visitPerson: (person: Person) => void;
    visitSoftwareSystem: (softwareSystem: SoftwareSystem) => void;
    visitContainer: (container: Container) => void;
    visitComponent: (component: Component) => void;
    visitRelationship: (relationship: Relationship) => void;
}
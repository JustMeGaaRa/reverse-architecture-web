export interface Technology {
    name: string;
}

export enum AbstractionTypeCode {
    SoftwareSystem = "abstraction.types.software-system",
    Container = "abstraction.types.container",
    Component = "abstraction.types.component",
    Person = "abstraction.types.person"
}

export interface AbstractionType {
    code: string;
    name: string;
}

export interface Abstraction {
    abstractionId: string;
    type: AbstractionType;
    title: string;
    technologies?: Array<string>;
    description?: string;
}

export interface Relationship {
    relationshipId: string;
    sourceElementId: string;
    targetElementId: string;
    title?: string;
    technologies?: Array<string>;
}

export interface Position {
    x: number;
    y: number;
}

export interface AbstractionPositions {
    [abstractionId: string]: Position;
}

export interface Diagram {
    diagramId: string;
    title: string;
    description?: string;
    scope?: Abstraction;
    primaryElements: Array<Abstraction>;
    supportingElements: Array<Abstraction>;
    relationships: Array<Relationship>;
    positions: AbstractionPositions;
}

export type AbstractionCallback = (abstraction: Abstraction) => void;

export type RelationshipCallback = (relationship: Relationship) => void;

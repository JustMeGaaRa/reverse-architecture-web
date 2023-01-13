import { v4 } from "uuid";

export interface Technology {
    name: string;
}

export enum AbstractionTypeCode {
    SoftwareSystem = "software-system",
    Container = "container",
    Component = "component",
    Person = "person"
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

export const getAbstractionName = (code: AbstractionTypeCode) => {
    const names = {
        [AbstractionTypeCode.SoftwareSystem]: "Software System",
        [AbstractionTypeCode.Container]: "Container",
        [AbstractionTypeCode.Component]: "Component",
        [AbstractionTypeCode.Person]: "Person"
    };
    return names[code];
}

export const createAbstraction = (
  abstractionTypeCode: AbstractionTypeCode
) => {
    return {
        abstractionId: v4(),
        title: getAbstractionName(abstractionTypeCode),
        type: {
            code: abstractionTypeCode,
            name: getAbstractionName(abstractionTypeCode)
        }
    };
};

export const createRelationship = (
  sourceId: string,
  targetId: string
): Relationship => {
  return {
    relationshipId: v4(),
    sourceElementId: sourceId,
    targetElementId: targetId
  };
};

export type AbstractionCallback = (abstraction: Abstraction) => void;

export type RelationshipCallback = (relationship: Relationship) => void;

import { v4 } from "uuid";

export interface Position {
    x: number;
    y: number;
}

export interface Node<TData = any> {
    id: string;
    parentId?: string;
    type: string;
    position: Position;
    width?: number;
    height?: number;
    data: TData
}

export type ElementType =
    "Person"
    | "Software System"
    | "Container"
    | "Component"
    | "Code Element"
    | string;

export type ElementLocation =
    "Internal"
    | "External";

export interface Element {
    elementId: string;
    type: ElementType;
    name: string;
    technology?: Array<string>;
    description?: string;
    location?: boolean;
}

export interface Edge<TData = any> {
    id: string;
    type: string;
    source: string;
    target: string;
    data: TData;
}

export interface Relationship {
    relationshipId: string;
    description?: string;
    technology?: Array<string>;
}

export type ViewType = 
    "System Context"
    | "Container"
    | "Component"
    | "Code"
    | string;

export interface C4Diagram {
    diagramId: string;
    type: ViewType;
    title: string;
    description?: string;
    scope?: Node<Element>;
    primaryElements: Array<Node<Element>>;
    supportingElements: Array<Node<Element>>;
    relationships: Array<Edge<Relationship>>;
}

export const createElement = (
    type: string
): Element => {
    return {
        elementId: v4(),
        name: type,
        type: type
    };
};

export const createRelationship = (

): Relationship => {
    return {
        relationshipId: v4()
    };
};

export type ElementCallback = (element: Element) => void;

export type RelationshipCallback = (relationship: Relationship) => void;

import { Abstraction, Diagram, Position, Relationship } from "./types";

/**
 * Redux Abstractions
 */

export type IActionDefinition<T = any> = {
    type: string;
} & T;

export type IActionCreator<Key = any, T = unknown> = (type: Key) => (params: T) => IActionDefinition<Key>;

export const createAction = <Key, T>(type: Key) => (
    (params: T) => ({
        type,
        ...params
    })
);

/**
 * Action Types
 */

export type DiagramCreateAction = "CREATE_EMPTY_DIAGRAM";
export type PrimaryAbstractionAddeAction = "ADD_PRIMARY_ABSTRACTION";
export type PrimaryAbstractionDeleteAction = "DELETE_PRIMARY_ABSTRACTION";
export type SupportingAbstractionAddAction = "ADD_SUPPORTING_ABSTRACTION";
export type SupportingAbstractionDeleteAction = "DELETE_SUPPORTING_ABSTRACTION";
export type RelationshipAddAction = "ADD_RELATIONSHIP";
export type RelationshipDeleteAction = "DELETE_RELATIONSHIP";

export type ActionTypes = 
    DiagramCreateAction
    | PrimaryAbstractionAddeAction
    | PrimaryAbstractionDeleteAction
    | SupportingAbstractionAddAction
    | SupportingAbstractionDeleteAction
    | RelationshipAddAction
    | RelationshipDeleteAction;

export const createEmptyDiagram = createAction<ActionTypes, {
    diagram: Diagram
}>("CREATE_EMPTY_DIAGRAM");

export const addPrimaryAbstraction = createAction<ActionTypes, {
    abstraction: Abstraction,
    position: Position
}>("ADD_PRIMARY_ABSTRACTION");

export const deletePrimaryAbstraction = createAction<ActionTypes, {
    abstraction: Abstraction
}>("DELETE_PRIMARY_ABSTRACTION");

export const addSupportingAbstraction = createAction<ActionTypes, {
    abstraction: Abstraction,
    position: Position
}>("ADD_SUPPORTING_ABSTRACTION");

export const deleteSupportingAbstraction = createAction<ActionTypes, {
    abstraction: Abstraction
}>("DELETE_SUPPORTING_ABSTRACTION");

export const addRelationship = createAction<ActionTypes, {
    relationship: Relationship
}>("ADD_RELATIONSHIP");

export const deleteRelationship = createAction<ActionTypes, {
    relationship: Relationship
}>("DELETE_RELATIONSHIP");

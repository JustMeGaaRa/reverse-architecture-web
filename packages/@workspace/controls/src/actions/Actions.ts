import { IPerson, IRelationship, Position, ISoftwareSystem, IContainer, IComponent } from "@structurizr/dsl";
import { Action, ActionType, WorkspaceAction } from "@workspace/core";
import { ActionFlowType } from "./ActionFlowType";

export type ConnectPersonOnSystemLandscapeViewAction = Action<ActionFlowType.CONNECT_PERSON_ON_SYSTEM_LANDSCAPE_VIEW, {
    person: IPerson;
    relationship: IRelationship;
    position: Position;
}>;

export type ConnectSoftwareSystemOnSystemLandscapeViewAction = Action<ActionFlowType.CONNECT_SOFTWARE_SYSTEM_ON_SYSTEM_LANDSCAPE_VIEW, {
    softwareSystem: ISoftwareSystem;
    relationship: IRelationship;
    position: Position;
}>;

export type ConnectPersonOnSystemContextViewAction = Action<ActionFlowType.CONNECT_PERSON_ON_SYSTEM_CONTEXT_VIEW, {
    viewIdentifier: string;
    person: IPerson;
    relationship: IRelationship;
    position: Position;
}>;

export type ConnectSoftwareSystemOnSystemContextViewAction = Action<ActionFlowType.CONNECT_SOFTWARE_SYSTEM_ON_SYSTEM_CONTEXT_VIEW, {
    viewIdentifier: string;
    softwareSystem: ISoftwareSystem;
    relationship: IRelationship;
    position: Position;
}>;

export type ConnectPersonOnContainerViewAction = Action<ActionFlowType.CONNECT_PERSON_ON_CONTAINER_VIEW, {
    viewIdentifier: string;
    softwareSystemIdentifier: string;
    person: IPerson;
    relationship: IRelationship;
    position: Position;
}>;

export type ConnectSoftwareSystemOnContainerViewAction = Action<ActionFlowType.CONNECT_SOFTWARE_SYSTEM_ON_CONTAINER_VIEW, {
    viewIdentifier: string;
    softwareSystemIdentifier: string;
    softwareSystem: ISoftwareSystem;
    relationship: IRelationship;
    position: Position;
}>;

export type ConnectContainerOnContainerViewAction = Action<ActionFlowType.CONNECT_CONTAINER_ON_CONTAINER_VIEW, {
    viewIdentifier: string;
    softwareSystemIdentifier: string;
    container: IContainer;
    relationship: IRelationship;
    position: Position;
}>;

export type ConnectPersonOnComponentViewAction = Action<ActionFlowType.CONNECT_PERSON_ON_COMPONENT_VIEW, {
    viewIdentifier: string;
    containerIdentifier: string;
    person: IPerson;
    relationship: IRelationship;
    position: Position;
}>;

export type ConnectSoftwareSystemOnComponentViewAction = Action<ActionFlowType.CONNECT_SOFTWARE_SYSTEM_ON_COMPONENT_VIEW, {
    viewIdentifier: string;
    containerIdentifier: string;
    softwareSystem: ISoftwareSystem;
    relationship: IRelationship;
    position: Position;
}>;

export type ConnectContainerOnComponentViewAction = Action<ActionFlowType.CONNECT_CONTAINER_ON_COMPONENT_VIEW, {
    viewIdentifier: string;
    containerIdentifier: string;
    container: IContainer;
    relationship: IRelationship;
    position: Position;
}>;

export type ConnectComponentOnComponentViewAction = Action<ActionFlowType.CONNECT_COMPONENT_ON_COMPONENT_VIEW, {
    viewIdentifier: string;
    containerIdentifier: string;
    component: IComponent;
    relationship: IRelationship;
    position: Position;
}>;

export type WorkspaceFlowAction = 
    | WorkspaceAction
    | ConnectPersonOnSystemLandscapeViewAction
    | ConnectSoftwareSystemOnSystemLandscapeViewAction
    | ConnectPersonOnSystemContextViewAction
    | ConnectSoftwareSystemOnSystemContextViewAction
    | ConnectPersonOnContainerViewAction
    | ConnectSoftwareSystemOnContainerViewAction
    | ConnectContainerOnContainerViewAction
    | ConnectPersonOnComponentViewAction
    | ConnectSoftwareSystemOnComponentViewAction
    | ConnectContainerOnComponentViewAction
    | ConnectComponentOnComponentViewAction;
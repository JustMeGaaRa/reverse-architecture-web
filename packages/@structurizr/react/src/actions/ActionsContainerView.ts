import { IContainer, IContainerView, IPerson, ISoftwareSystem, Position } from "@structurizr/dsl";
import { Action } from "./Action";
import { ActionType } from "./ActionType";

export type AddContainerViewAction = Action<ActionType.ADD_CONTAINER_VIEW, {
    view: IContainerView;
}>;

export type SetContainerViewElementPositionAction = Action<ActionType.SET_CONTAINER_VIEW_ELEMENT_POSTION, {
    viewIdentifier: string;
    elementIdentifier: string;
    position: Position;
}>;

export type IncludeContainerViewPersonAction = Action<ActionType.INCLUDE_CONTAINER_VIEW_PERSON, {
    viewIdentifier: string;
    person: IPerson;
    position?: Position;
}>;

export type IncludeContainerViewSoftwareSystemAction = Action<ActionType.INCLUDE_CONTAINER_VIEW_SOFTWARE_SYSTEM, {
    viewIdentifier: string;
    softwareSystem: ISoftwareSystem;
    position?: Position;
}>;

export type IncludeContainerViewContainerAction = Action<ActionType.INCLUDE_CONTAINER_VIEW_CONTAINER, {
    viewIdentifier: string;
    softwareSystemIdentifier: string;
    container: IContainer;
    position?: Position;
}>;
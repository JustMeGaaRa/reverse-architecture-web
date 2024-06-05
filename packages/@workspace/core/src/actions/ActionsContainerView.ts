import { Dimensions, IContainer, IContainerView, IPerson, ISoftwareSystem, Position, Size } from "@structurizr/dsl";
import { Action } from "./Action";
import { ActionType } from "./ActionType";

export type AddContainerViewAction = Action<ActionType.ADD_CONTAINER_VIEW, {
    view: IContainerView;
}>;

export type SetContainerViewElementPositionAction = Action<ActionType.SET_CONTAINER_VIEW_ELEMENT_POSTION, {
    view: IContainerView;
    elementIdentifier: string;
    position: Position;
}>;

export type SetContainerViewElementDimensionsAction = Action<ActionType.SET_CONTAINER_VIEW_ELEMENT_DIMENSIONS, {
    view: IContainerView;
    elementIdentifier: string;
    dimensions: Dimensions;
}>;

export type IncludeContainerViewPersonAction = Action<ActionType.INCLUDE_CONTAINER_VIEW_PERSON, {
    view: IContainerView;
    person: IPerson;
    position?: Position;
}>;

export type IncludeContainerViewSoftwareSystemAction = Action<ActionType.INCLUDE_CONTAINER_VIEW_SOFTWARE_SYSTEM, {
    view: IContainerView;
    softwareSystem: ISoftwareSystem;
    position?: Position;
}>;

export type IncludeContainerViewContainerAction = Action<ActionType.INCLUDE_CONTAINER_VIEW_CONTAINER, {
    view: IContainerView;
    softwareSystemIdentifier: string;
    container: IContainer;
    position?: Position;
}>;
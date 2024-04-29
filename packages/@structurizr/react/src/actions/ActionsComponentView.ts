import { IComponent, IComponentView, IContainer, IPerson, ISoftwareSystem, Position } from "@structurizr/dsl";
import { Action } from "./Action";
import { ActionType } from "./ActionType";

export type AddComponentViewAction = Action<ActionType.ADD_COMPONENT_VIEW, {
    view: IComponentView;
}>;

export type SetComponentViewElementPositionAction = Action<ActionType.SET_COMPONENT_VIEW_ELEMENT_POSTION, {
    view: IComponentView;
    elementIdentifier: string;
    position: Position;
}>;

export type IncludeComponentViewPersonAction = Action<ActionType.INCLUDE_COMPONENT_VIEW_PERSON, {
    view: IComponentView;
    person: IPerson;
    position?: Position;
}>;

export type IncludeComponentViewSoftwareSystemAction = Action<ActionType.INCLUDE_COMPONENT_VIEW_SOFTWARE_SYSTEM, {
    view: IComponentView;
    softwareSystem: ISoftwareSystem;
    position?: Position;
}>;

export type IncludeComponentViewContainerAction = Action<ActionType.INCLUDE_COMPONENT_VIEW_CONTAINER, {
    view: IComponentView;
    containerIdentifier: string;
    container: IContainer;
    position?: Position;
}>;

export type IncludeComponentViewComponentAction = Action<ActionType.INCLUDE_COMPONENT_VIEW_COMPONENT, {
    view: IComponentView;
    containerIdentifier: string;
    component: IComponent;
    position?: Position;
}>;
import { IPerson, ISoftwareSystem, ISystemContextView, Position } from "@structurizr/dsl";
import { Action } from "./Action";
import { ActionType } from "./ActionType";

export type AddSystemContextViewAction = Action<ActionType.ADD_SYSTEM_CONTEXT_VIEW, {
    view: ISystemContextView;
}>;

export type SetSystemContextViewElementPositionAction = Action<ActionType.SET_SYSTEM_CONTEXT_VIEW_ELEMENT_POSTION, {
    view: ISystemContextView;
    elementIdentifier: string;
    position: Position;
}>;

export type IncludeSystemContextViewPersonAction = Action<ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_PERSON, {
    view: ISystemContextView;
    person: IPerson;
    position?: Position;
}>;

export type IncludeSystemContextViewSoftwareSystemAction = Action<ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_SOFTWARE_SYSTEM, {
    view: ISystemContextView;
    softwareSystem: ISoftwareSystem;
    position?: Position;
}>;
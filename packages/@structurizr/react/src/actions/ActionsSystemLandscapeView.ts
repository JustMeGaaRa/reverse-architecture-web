import { IPerson, ISoftwareSystem, ISystemLandscapeView, Position } from "@structurizr/dsl";
import { Action } from "./Action";
import { ActionType } from "./ActionType";

export type SetSystemLandscapeViewAction = Action<ActionType.SET_SYSTEM_LANDSCAPE_VIEW, {
    view: ISystemLandscapeView;
}>;

export type SetSystemLandscapeViewElementPositionAction = Action<ActionType.SET_SYSTEM_LANDSCAPE_VIEW_ELEMENT_POSTION, {
    viewIdentifier: string;
    elementIdentifier: string;
    position: Position;
}>;

export type IncludeSystemLandscapeViewPersonAction = Action<ActionType.INCLUDE_SYSTEM_LANDSCAPE_VIEW_PERSON, {
    person: IPerson;
    position?: Position;
}>;

export type IncludeSystemLandscapeViewSoftwareSystemAction = Action<ActionType.INCLUDE_SYSTEM_LANDSCAPE_VIEW_SOFTWARE_SYSTEM, {
    softwareSystem: ISoftwareSystem;
    position?: Position;
}>;
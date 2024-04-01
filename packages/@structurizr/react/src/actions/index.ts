import { IComponent, IContainer, IPerson, ISoftwareSystem, ISystemLandscapeView, IWorkspaceSnapshot } from "@structurizr/dsl";

export enum ActionType {
    SET_WORKSPACE = "SET_WORKSPACE",
    ADD_PERSON = "ADD_PERSON",
    ADD_SOFTWARE_SYSTEM = "ADD_SOFTWARE_SYSTEM",
    ADD_CONTAINER = "ADD_CONTAINER",
    ADD_COMPONENT = "ADD_COMPONENT",
    SET_SYSTEM_LANDSCAPE_VIEW = "SET_SYSTEM_LANDSCAPE_VIEW"
}

export interface IAction<T = keyof ActionType, P = any> {
    type: T;
    payload:P;
}

export type SetWorkspaceAction = IAction<ActionType.SET_WORKSPACE, {
    workspace: IWorkspaceSnapshot;
}>;

export type AddPersonAction = IAction<ActionType.ADD_PERSON, {
    person: IPerson;
}>

export type AddSoftwareSystemAction = IAction<ActionType.ADD_SOFTWARE_SYSTEM,{
    softwareSystem: ISoftwareSystem;
}>;

export type AddContainerAction = IAction<ActionType.ADD_CONTAINER, {
    softwareSystemIdentifier: string;
    container: IContainer;
}>;

export type AddComponentAction = IAction<ActionType.ADD_COMPONENT, {
    softwareSystemIdentifier: string;
    containerIdentifier: string;
    component: IComponent;
}>;

export type SetSystemLandscapeViewAction = IAction<ActionType.SET_SYSTEM_LANDSCAPE_VIEW, {
    view: ISystemLandscapeView;
}>;

export type Action =
    | SetWorkspaceAction
    | AddPersonAction
    | AddSoftwareSystemAction
    | AddContainerAction
    | AddComponentAction
    | SetSystemLandscapeViewAction;
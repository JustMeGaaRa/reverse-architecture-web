import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { Action } from "./Action";
import { ActionType } from "./ActionType";

export type SetWorkspaceAction = Action<ActionType.SET_WORKSPACE, {
    workspace: IWorkspaceSnapshot;
}>;
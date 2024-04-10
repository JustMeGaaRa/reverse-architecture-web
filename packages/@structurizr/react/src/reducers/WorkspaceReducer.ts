import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { Reducer } from "react";
import { WorkspaceAction, ActionType } from "../actions";
import { modelReducer } from "./ModelReducer";
import { viewsReducer } from "./ViewsReducer";

export const workspaceReducer = (state: IWorkspaceSnapshot, action: WorkspaceAction): IWorkspaceSnapshot => {
    switch (action.type) {
        case ActionType.SET_WORKSPACE:
            return action.payload.workspace;

        default:
            return {
                ...state,
                model: modelReducer(state.model, action),
                views: viewsReducer(state.views, action)
            };
    }
}

export const combineReducers = <TAction>(...reducers: Reducer<IWorkspaceSnapshot, TAction>[]): Reducer<IWorkspaceSnapshot, TAction> => {
    return (state: any, action: any) => {
        return reducers.reduce((acc, reducer) => reducer(acc, action), state);
    }
}
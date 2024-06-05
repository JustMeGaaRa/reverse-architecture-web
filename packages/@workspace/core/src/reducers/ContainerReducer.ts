import { IContainer } from "@structurizr/dsl";
import { WorkspaceAction, ActionType } from "../actions";

export const containerReducer = (state: IContainer, action: WorkspaceAction): IContainer => {
    switch (action.type) {
        case ActionType.ADD_MODEL_CONTAINER_GROUP:
            return {
                ...state,
                groups: [...state.groups, action.payload.group]
            };
            
        case ActionType.ADD_MODEL_COMPONENT:
        case ActionType.INCLUDE_COMPONENT_VIEW_COMPONENT:
            return {
                ...state,
                components: [...state.components, action.payload.component]
            };

        default:
            return state;
    }
}
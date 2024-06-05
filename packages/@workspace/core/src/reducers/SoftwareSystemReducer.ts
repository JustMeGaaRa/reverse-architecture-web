import { ISoftwareSystem } from "@structurizr/dsl";
import { WorkspaceAction, ActionType } from "../actions";
import { containerReducer } from "./ContainerReducer";

export const softwareSystemReducer = (state: ISoftwareSystem, action: WorkspaceAction): ISoftwareSystem => {
    switch (action.type) {
        case ActionType.ADD_MODEL_SOFTWARE_SYSTEM_GROUP:
            return {
                ...state,
                groups: [...state.groups, action.payload.group]
            };

        case ActionType.ADD_MODEL_CONTAINER:
        case ActionType.INCLUDE_CONTAINER_VIEW_CONTAINER:
        case ActionType.INCLUDE_COMPONENT_VIEW_CONTAINER:
            return {
                ...state,
                containers: [...state.containers, action.payload.container]
            };

        case ActionType.ADD_MODEL_CONTAINER_GROUP:
        case ActionType.ADD_MODEL_COMPONENT:
        case ActionType.INCLUDE_COMPONENT_VIEW_COMPONENT:
            return {
                ...state,
                containers: state.containers.map(container => 
                    container.identifier === action.payload.containerIdentifier 
                        ? containerReducer(container, action)
                        : container
                )
            };

        default:
            return state;
    }
}
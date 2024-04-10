import { IViews } from "@structurizr/dsl";
import { ActionType, ViewsAction, WorkspaceAction } from "../actions";
import { componentViewReducer } from "./ComponentViewReducer";
import { containerViewReducer } from "./ContainerViewReducer";
import { systemContextViewReducer } from "./SystemContextViewReducer";
import { systemLandscapeViewReducer } from "./SystemLandscapeViewReducer";

export const viewsReducer = (state: IViews, action: WorkspaceAction): IViews => {
    switch (action.type) {
        case ActionType.SET_SYSTEM_LANDSCAPE_VIEW:
        case ActionType.INCLUDE_SYSTEM_LANDSCAPE_VIEW_PERSON:
        case ActionType.INCLUDE_SYSTEM_LANDSCAPE_VIEW_SOFTWARE_SYSTEM:
            return {
                ...state,
                systemLandscape: systemLandscapeViewReducer(state.systemLandscape, action)
            };

        case ActionType.ADD_SYSTEM_CONTEXT_VIEW:
            return {
                ...state,
                systemContexts: [...state.systemContexts, action.payload.view]
            };

        case ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_PERSON:
        case ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_SOFTWARE_SYSTEM:
            return {
                ...state,
                systemContexts: state.systemContexts.map(systemContextView => 
                    systemContextView.identifier === action.payload.viewIdentifier 
                        ? systemContextViewReducer(systemContextView, action)
                        : systemContextView
                )
            };

        case ActionType.ADD_CONTAINER_VIEW:
            return {
                ...state,
                containers: [...state.containers, action.payload.view]
            };

        case ActionType.INCLUDE_CONTAINER_VIEW_PERSON:
        case ActionType.INCLUDE_CONTAINER_VIEW_SOFTWARE_SYSTEM:
        case ActionType.INCLUDE_CONTAINER_VIEW_CONTAINER:
            return {
                ...state,
                containers: state.containers.map(containerView => 
                    containerView.identifier === action.payload.viewIdentifier
                        ? containerViewReducer(containerView, action)
                        : containerView
                )
            };

        case ActionType.ADD_COMPONENT_VIEW:
            return {
                ...state,
                components: [...state.components, action.payload.view]
            };

        case ActionType.SET_COMPONENT_VIEW_ELEMENT_POSTION:
        case ActionType.INCLUDE_COMPONENT_VIEW_PERSON:
        case ActionType.INCLUDE_COMPONENT_VIEW_SOFTWARE_SYSTEM:
        case ActionType.INCLUDE_COMPONENT_VIEW_CONTAINER:
        case ActionType.INCLUDE_COMPONENT_VIEW_COMPONENT:
            return {
                ...state,
                components: state.components.map(componentView => 
                    componentView.identifier === action.payload.viewIdentifier
                        ? componentViewReducer(componentView, action)
                        : componentView
                )
            };
        default:
            return state;
    }
}
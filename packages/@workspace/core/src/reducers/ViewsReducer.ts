import { IComponentView, IContainerView, ISystemContextView, IViews } from "@structurizr/dsl";
import { ActionType, ViewsAction, WorkspaceAction } from "../actions";
import { componentViewReducer } from "./ComponentViewReducer";
import { containerViewReducer } from "./ContainerViewReducer";
import { systemContextViewReducer } from "./SystemContextViewReducer";
import { systemLandscapeViewReducer } from "./SystemLandscapeViewReducer";

export const viewsReducer = (state: IViews, action: WorkspaceAction): IViews => {
    switch (action.type) {
        case ActionType.SET_SYSTEM_LANDSCAPE_VIEW:
        case ActionType.SET_SYSTEM_LANDSCAPE_VIEW_ELEMENT_POSTION:
        case ActionType.SET_SYSTEM_LANDSCAPE_VIEW_ELEMENT_DIMENSIONS:
        case ActionType.INCLUDE_SYSTEM_LANDSCAPE_VIEW_PERSON:
        case ActionType.INCLUDE_SYSTEM_LANDSCAPE_VIEW_SOFTWARE_SYSTEM:

        case ActionType.ADD_SYSTEM_CONTEXT_VIEW:
        case ActionType.SET_SYSTEM_CONTEXT_VIEW_ELEMENT_POSTION:
        case ActionType.SET_SYSTEM_CONTEXT_VIEW_ELEMENT_DIMENSIONS:
        case ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_PERSON:
        case ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_SOFTWARE_SYSTEM:
        
        case ActionType.ADD_CONTAINER_VIEW:
        case ActionType.SET_CONTAINER_VIEW_ELEMENT_POSTION:
        case ActionType.SET_CONTAINER_VIEW_ELEMENT_DIMENSIONS:
        case ActionType.INCLUDE_CONTAINER_VIEW_PERSON:
        case ActionType.INCLUDE_CONTAINER_VIEW_SOFTWARE_SYSTEM:
        case ActionType.INCLUDE_CONTAINER_VIEW_CONTAINER:
            
        case ActionType.ADD_COMPONENT_VIEW:
        case ActionType.SET_COMPONENT_VIEW_ELEMENT_POSTION:
        case ActionType.SET_COMPONENT_VIEW_ELEMENT_DIMENSIONS:
        case ActionType.INCLUDE_COMPONENT_VIEW_PERSON:
        case ActionType.INCLUDE_COMPONENT_VIEW_SOFTWARE_SYSTEM:
        case ActionType.INCLUDE_COMPONENT_VIEW_CONTAINER:
        case ActionType.INCLUDE_COMPONENT_VIEW_COMPONENT:
            return {
                ...state,
                systemLandscape: systemLandscapeViewReducer(state.systemLandscape, action),
                systemContexts: systemContextViewArrayReducer(state.systemContexts, action),
                containers: containerViewArrayReducer(state.containers, action),
                components: componentViewArrayReducer(state.components, action)
            };
        
        default:
            return state;
    }
}

export const systemContextViewArrayReducer = (state: ISystemContextView[], action: ViewsAction): ISystemContextView[] => {
    switch (action.type) {
        case ActionType.ADD_SYSTEM_CONTEXT_VIEW:
        case ActionType.SET_SYSTEM_CONTEXT_VIEW_ELEMENT_POSTION:
        case ActionType.SET_SYSTEM_CONTEXT_VIEW_ELEMENT_DIMENSIONS:
        case ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_PERSON:
        case ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_SOFTWARE_SYSTEM:
            return state.find(x => x.key === action.payload.view.key)
                ? state.map(systemContextView => 
                    systemContextView.key === action.payload.view.key
                        ? systemContextViewReducer(systemContextView, action)
                        : systemContextView
                )
                : [
                    ...state,
                    systemContextViewReducer(action.payload.view, action)
                ];

        default:
            return state;
    }
}

export const containerViewArrayReducer = (state: IContainerView[], action: ViewsAction): IContainerView[] => {
    switch (action.type) {
        case ActionType.ADD_CONTAINER_VIEW:
        case ActionType.SET_CONTAINER_VIEW_ELEMENT_POSTION:
        case ActionType.SET_CONTAINER_VIEW_ELEMENT_DIMENSIONS:
        case ActionType.INCLUDE_CONTAINER_VIEW_PERSON:
        case ActionType.INCLUDE_CONTAINER_VIEW_SOFTWARE_SYSTEM:
        case ActionType.INCLUDE_CONTAINER_VIEW_CONTAINER:
            return state.find(x => x.key === action.payload.view.key)
                ? state.map(containerView => 
                    containerView.key === action.payload.view.key
                        ? containerViewReducer(containerView, action)
                        : containerView
                )
                : [
                    ...state,
                    containerViewReducer(action.payload.view, action)
                ];

        default:
            return state;
    }
}

export const componentViewArrayReducer = (state: IComponentView[], action: ViewsAction): IComponentView[] => {
    switch (action.type) {
        case ActionType.ADD_COMPONENT_VIEW:
        case ActionType.SET_COMPONENT_VIEW_ELEMENT_POSTION:
        case ActionType.SET_COMPONENT_VIEW_ELEMENT_DIMENSIONS:
        case ActionType.INCLUDE_COMPONENT_VIEW_PERSON:
        case ActionType.INCLUDE_COMPONENT_VIEW_SOFTWARE_SYSTEM:
        case ActionType.INCLUDE_COMPONENT_VIEW_CONTAINER:
        case ActionType.INCLUDE_COMPONENT_VIEW_COMPONENT:
            return state.find(x => x.key ===action.payload.view.key)
                ? state.map(componentView => 
                    componentView.key === action.payload.view.key
                        ? componentViewReducer(componentView, action)
                        : componentView
                )
                : [
                    ...state,
                    componentViewReducer(action.payload.view, action)
                ];

        default:
            return state;
    }
}
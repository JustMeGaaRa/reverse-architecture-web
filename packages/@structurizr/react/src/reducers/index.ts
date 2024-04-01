import { IContainer, IModel, ISoftwareSystem, IViews, IWorkspaceSnapshot } from "@structurizr/dsl";
import { Action, ActionType } from "../actions";

export const workspaceReducer = (state: IWorkspaceSnapshot, action: Action): IWorkspaceSnapshot => {
    switch (action.type) {
        case ActionType.ADD_PERSON:
        case ActionType.ADD_SOFTWARE_SYSTEM:
        case ActionType.ADD_CONTAINER:
        case ActionType.ADD_COMPONENT:
            return {
                ...state,
                model: modelReducer(state.model, action)
            };
        case ActionType.SET_SYSTEM_LANDSCAPE_VIEW:
            return {
                ...state,
                views: viewsReducer(state.views, action)
            };
        default:
            return state;
    }
}

const modelReducer = (state: IModel, action: Action): IModel => {
    switch (action.type) {
        case ActionType.ADD_PERSON:
            return {
                ...state,
                people: [...state.people, action.payload.person]
            };
        case ActionType.ADD_SOFTWARE_SYSTEM:
            return {
                ...state,
                softwareSystems: [...state.softwareSystems, action.payload.softwareSystem]
            };
        case ActionType.ADD_CONTAINER:
        case ActionType.ADD_COMPONENT:
            return {
                ...state,
                softwareSystems: state.softwareSystems.map(softwareSystem => {
                    if (softwareSystem.identifier === action.payload.softwareSystemIdentifier) {
                        return softwareSystemReducer(softwareSystem, action);
                    }

                    return softwareSystem;
                })
            };
        default:
            return state;
    }
}

const softwareSystemReducer = (state: ISoftwareSystem, action: Action): ISoftwareSystem => {
    switch (action.type) {
        case ActionType.ADD_CONTAINER:
            return {
                ...state,
                containers: [...state.containers, action.payload.container]
            };
        case ActionType.ADD_COMPONENT:
            return {
                ...state,
                containers: state.containers.map(container => {
                    if (container.identifier === action.payload.containerIdentifier) {
                        return containerReducer(container, action);
                    }

                    return container;
                })
            };
        default:
            return state;
    }
}

const containerReducer = (state: IContainer, action: Action): IContainer => {
    switch (action.type) {
        case ActionType.ADD_COMPONENT:
            return {
                ...state,
                components: [...state.components, action.payload.component]
            };
        default:
            return state;
    }
}

const viewsReducer = (state: IViews, action: Action): IViews => {
    switch (action.type) {
        case ActionType.SET_SYSTEM_LANDSCAPE_VIEW:
            return {
                ...state,
                systemLandscape: action.payload.view
            };
        default:
            return state;
    }
}
import { IComponentView } from "@structurizr/dsl";
import { ActionType, ComponentViewAction } from "../actions";

export const componentViewReducer = (state: IComponentView, action: ComponentViewAction): IComponentView => {
    switch (action.type) {
        case ActionType.SET_COMPONENT_VIEW_ELEMENT_POSTION:
            return {
                ...state,
                elements: [
                    ...state.elements.filter(element => element.id !== action.payload.elementIdentifier),
                    { id: action.payload.elementIdentifier, ...action.payload.position }
                ]
            };
        case ActionType.INCLUDE_COMPONENT_VIEW_PERSON:
            return {
                ...state,
                include: [...state.include, action.payload.person.identifier],
                elements: [
                    ...state.elements.filter(element => element.id !== action.payload.person.identifier),
                    { id: action.payload.person.identifier, ...action.payload.position }
                ]
            };
        case ActionType.INCLUDE_COMPONENT_VIEW_SOFTWARE_SYSTEM:
            return {
                ...state,
                include: [...state.include, action.payload.softwareSystem.identifier],
                elements: [
                    ...state.elements.filter(element => element.id !== action.payload.softwareSystem.identifier),
                    { id: action.payload.softwareSystem.identifier, ...action.payload.position }
                ]
            };
        case ActionType.INCLUDE_COMPONENT_VIEW_CONTAINER:
            return {
                ...state,
                include: [...state.include, action.payload.container.identifier],
                elements: [
                    ...state.elements.filter(element => element.id !== action.payload.container.identifier),
                    { id: action.payload.container.identifier, ...action.payload.position }
                ]
            };
        case ActionType.INCLUDE_COMPONENT_VIEW_COMPONENT:
            return {
                ...state,
                include: [...state.include, action.payload.component.identifier],
                elements: [
                    ...state.elements.filter(element => element.id !== action.payload.component.identifier),
                    { id: action.payload.component.identifier, ...action.payload.position }
                ]
            };
        default:
            return state;
    }
}
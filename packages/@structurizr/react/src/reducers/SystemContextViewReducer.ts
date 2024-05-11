import { ISystemContextView } from "@structurizr/dsl";
import { ActionType, SystemContextViewAction } from "../actions";

export const systemContextViewReducer = (state: ISystemContextView, action: SystemContextViewAction): ISystemContextView => {
    switch (action.type) {
        case ActionType.ADD_SYSTEM_CONTEXT_VIEW:
            return action.payload.view;
        
        case ActionType.SET_SYSTEM_CONTEXT_VIEW_ELEMENT_POSTION:
            const positionMetadata = state.elements.find(x => x.id ===action.payload.elementIdentifier) ?? {};
            return action.payload.position === undefined ? state : {
                ...state,
                elements: [
                    ...state.elements.filter(element => element.id !== action.payload.elementIdentifier),
                    { id: action.payload.elementIdentifier, ...positionMetadata, ...action.payload.position }
                ]
            };
        
        case ActionType.SET_SYSTEM_CONTEXT_VIEW_ELEMENT_DIMENSIONS:
            const dimensionsMetadata = state.elements.find(x => x.id ===action.payload.elementIdentifier) ?? {};
            return action.payload.dimensions === undefined ? state : {
                ...state,
                elements: [
                    ...state.elements.filter(element => element.id !== action.payload.elementIdentifier),
                    { id: action.payload.elementIdentifier, ...dimensionsMetadata, ...action.payload.dimensions }
                ]
            };

        case ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_PERSON:
            return {
                ...state,
                include: [...state.include, action.payload.person.identifier],
                elements: [
                    ...state.elements.filter(element => element.id !== action.payload.person.identifier),
                    { id: action.payload.person.identifier, ...action.payload.position }
                ]
            };

        case ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_SOFTWARE_SYSTEM:
            return {
                ...state,
                include: [...state.include, action.payload.softwareSystem.identifier],
                elements: [
                    ...state.elements.filter(element => element.id !== action.payload.softwareSystem.identifier),
                    { id: action.payload.softwareSystem.identifier, ...action.payload.position }
                ]
            };

        default:
            return state;
    }
}
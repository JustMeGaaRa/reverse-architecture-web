import { findContainerParent, IModel } from "@structurizr/dsl";
import { ActionType, WorkspaceAction } from "../actions";
import { deploymentEnvironmentReducer } from "./DeploymentEnvironmentReducer";
import { softwareSystemReducer } from "./SoftwareSystemReducer";

export const modelReducer = (state: IModel, action: WorkspaceAction): IModel => {
    switch (action.type) {
        case ActionType.ADD_MODEL_GROUP:
            return {
                ...state,
                groups: [...state.groups, action.payload.group]
            };
        case ActionType.ADD_MODEL_PERSON:
        case ActionType.INCLUDE_SYSTEM_LANDSCAPE_VIEW_PERSON:
        case ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_PERSON:
        case ActionType.INCLUDE_CONTAINER_VIEW_PERSON:
            return {
                ...state,
                people: [...state.people, action.payload.person]
            };

        case ActionType.ADD_MODEL_SOFTWARE_SYSTEM:
        case ActionType.INCLUDE_SYSTEM_LANDSCAPE_VIEW_SOFTWARE_SYSTEM:
        case ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_SOFTWARE_SYSTEM:
        case ActionType.INCLUDE_CONTAINER_VIEW_SOFTWARE_SYSTEM:
            return {
                ...state,
                softwareSystems: [...state.softwareSystems, action.payload.softwareSystem]
            };

        case ActionType.ADD_MODEL_SOFTWARE_SYSTEM_GROUP:
        case ActionType.ADD_MODEL_CONTAINER:
        case ActionType.INCLUDE_CONTAINER_VIEW_CONTAINER:
            return {
                ...state,
                softwareSystems: state.softwareSystems.map(softwareSystem => 
                    softwareSystem.identifier === action.payload.softwareSystemIdentifier 
                        ? softwareSystemReducer(softwareSystem, action)
                        : softwareSystem
                )
            };

        case ActionType.ADD_MODEL_CONTAINER_GROUP:
        case ActionType.ADD_MODEL_COMPONENT:
        case ActionType.INCLUDE_COMPONENT_VIEW_CONTAINER:
        case ActionType.INCLUDE_COMPONENT_VIEW_COMPONENT:
            const softwareSystemIdentifier = findContainerParent(state, action.payload.containerIdentifier)?.identifier;
            return {
                ...state,
                softwareSystems: state.softwareSystems.map(softwareSystem =>
                    softwareSystem.identifier === softwareSystemIdentifier
                        ? softwareSystemReducer(softwareSystem, action)
                        : softwareSystem
                )
            };
        
        case ActionType.ADD_MODEL_DEPLOYMENT_ENVIRONMENT:
            return {
                ...state,
                deploymentEnvironments: [...state.deploymentEnvironments, action.payload.deploymentEnvironment]
            };

        case ActionType.ADD_MODEL_DEPLOYMENT_NODE:
        case ActionType.ADD_MODEL_INFRASTRUCTURE_NODE_TO_DEPLOYMENT_NODE:
        case ActionType.ADD_MODEL_SOFTWARE_SYSTEM_INSTANCE_TO_DEPLOYMENT_NODE:
        case ActionType.ADD_MODEL_CONTAINER_INSTANCE_TO_DEPLOYMENT_NODE:
            return {
                ...state,
                deploymentEnvironments: state.deploymentEnvironments.map(deploymentEnvironment =>
                    deploymentEnvironment.name === action.payload.environment
                        ? deploymentEnvironmentReducer(deploymentEnvironment, action)
                        : deploymentEnvironment
                )
            };

        case ActionType.ADD_MODEL_RELATIONSHIP:
            return {
                ...state,
                relationships: [...state.relationships, action.payload.relationship]
            };

        default:
            return state;
    }
}
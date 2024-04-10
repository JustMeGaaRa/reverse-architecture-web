import { IDeploymentEnvironment, IDeploymentNode } from "@structurizr/dsl";
import { ActionType, DeploymentEnvironmentAction } from "../actions";

export const deploymentEnvironmentReducer = (state: IDeploymentEnvironment, action: DeploymentEnvironmentAction): IDeploymentEnvironment => {
    switch (action.type) {
        case ActionType.ADD_MODEL_DEPLOYMENT_NODE:
        case ActionType.ADD_MODEL_INFRASTRUCTURE_NODE_TO_DEPLOYMENT_NODE:
        case ActionType.ADD_MODEL_SOFTWARE_SYSTEM_INSTANCE_TO_DEPLOYMENT_NODE:
        case ActionType.ADD_MODEL_CONTAINER_INSTANCE_TO_DEPLOYMENT_NODE:
            return {
                ...state,
                deploymentNodes: deploymentNodeArrayReducer(state.deploymentNodes, action)
            };

        default:
            return state;
    }
}

export const deploymentNodeArrayReducer = (state: IDeploymentNode[], action: DeploymentEnvironmentAction): IDeploymentNode[] => {
    switch (action.type) {
        case ActionType.ADD_MODEL_DEPLOYMENT_NODE:
        case ActionType.ADD_MODEL_INFRASTRUCTURE_NODE_TO_DEPLOYMENT_NODE:
        case ActionType.ADD_MODEL_SOFTWARE_SYSTEM_INSTANCE_TO_DEPLOYMENT_NODE:
        case ActionType.ADD_MODEL_CONTAINER_INSTANCE_TO_DEPLOYMENT_NODE:
            return state.map(deploymentNode => deploymentNodeReducer(deploymentNode, action));

        default:
            return state;
    }
}

export const deploymentNodeReducer = (state: IDeploymentNode, action: DeploymentEnvironmentAction): IDeploymentNode => {
    if (state.identifier === action.payload.deploymentNodeIdentifier) {
        switch (action.type) {
            case ActionType.ADD_MODEL_DEPLOYMENT_NODE:
                return {
                    ...state,
                    deploymentNodes: [...state.deploymentNodes, action.payload.deploymentNode]
                };
    
            case ActionType.ADD_MODEL_INFRASTRUCTURE_NODE_TO_DEPLOYMENT_NODE:
                return {
                    ...state,
                    infrastructureNodes: [...state.infrastructureNodes, action.payload.infrastructureNode]
                };
    
            case ActionType.ADD_MODEL_SOFTWARE_SYSTEM_INSTANCE_TO_DEPLOYMENT_NODE:
                return {
                    ...state,
                    softwareSystemInstances: [...state.softwareSystemInstances, action.payload.softwareSystemInstance]
                };
    
            case ActionType.ADD_MODEL_CONTAINER_INSTANCE_TO_DEPLOYMENT_NODE:
                return {
                    ...state,
                    containerInstances: [...state.containerInstances, action.payload.containerInstance]
                };
    
            default:
                return state;
        }
    }

    return {
        ...state,
        deploymentNodes: deploymentNodeArrayReducer(state.deploymentNodes, action)
    };
}
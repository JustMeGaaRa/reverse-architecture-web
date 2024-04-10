import {
    IComponent,
    IContainer,
    IContainerInstance,
    IDeploymentEnvironment,
    IDeploymentNode,
    IGroup,
    IInfrastructureNode,
    IPerson,
    IRelationship,
    ISoftwareSystem,
    ISoftwareSystemInstance
} from "@structurizr/dsl";
import { Action } from "./Action";
import { ActionType } from "./ActionType";

export type AddModelGroupAction = Action<ActionType.ADD_MODEL_GROUP, {
    group: IGroup;
}>;

export type AddModelPersonAction = Action<ActionType.ADD_MODEL_PERSON, {
    person: IPerson;
}>

export type AddModelSoftwareSystemAction = Action<ActionType.ADD_MODEL_SOFTWARE_SYSTEM,{
    softwareSystem: ISoftwareSystem;
}>;

export type AddModelSoftwareSystemGroupAction = Action<ActionType.ADD_MODEL_SOFTWARE_SYSTEM_GROUP, {
    softwareSystemIdentifier: string;
    group: IGroup;
}>;

export type AddModelContainerAction = Action<ActionType.ADD_MODEL_CONTAINER, {
    softwareSystemIdentifier: string;
    container: IContainer;
}>;

export type AddModelContainerGroupAction = Action<ActionType.ADD_MODEL_CONTAINER_GROUP, {
    containerIdentifier: string;
    group: IGroup;
}>;

export type AddModelComponentAction = Action<ActionType.ADD_MODEL_COMPONENT, {
    containerIdentifier: string;
    component: IComponent;
}>;

export type AddModelDeploymentEnvironmentAction = Action<ActionType.ADD_MODEL_DEPLOYMENT_ENVIRONMENT, {
    environment: string;
    deploymentEnvironment: IDeploymentEnvironment;
}>;

export type AddModelDeploymentNodeAction = Action<ActionType.ADD_MODEL_DEPLOYMENT_NODE, {
    environment: string;
    deploymentNodeIdentifier?: string;
    deploymentNode: IDeploymentNode;
}>;

export type AddModelInfrastructureNodeToDeploymentNodeAction = Action<ActionType.ADD_MODEL_INFRASTRUCTURE_NODE_TO_DEPLOYMENT_NODE, {
    environment: string;
    deploymentNodeIdentifier: string;
    infrastructureNode: IInfrastructureNode;
}>;

export type AddModelSoftwareSystemInstanceToDeploymentNodeAction = Action<ActionType.ADD_MODEL_SOFTWARE_SYSTEM_INSTANCE_TO_DEPLOYMENT_NODE, {
    environment: string;
    deploymentNodeIdentifier: string;
    softwareSystemInstance: ISoftwareSystemInstance;
}>;

export type AddModelContainerInstanceToDeploymentNodeAction = Action<ActionType.ADD_MODEL_CONTAINER_INSTANCE_TO_DEPLOYMENT_NODE, {
    environment: string;
    deploymentNodeIdentifier: string;
    containerInstance: IContainerInstance;
}>;

export type AddModelRelationshipAction = Action<ActionType.ADD_MODEL_RELATIONSHIP, {
    relationship: IRelationship;
}>;
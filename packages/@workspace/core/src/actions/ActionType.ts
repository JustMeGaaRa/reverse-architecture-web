export enum ActionType {
    SET_WORKSPACE = "SET_WORKSPACE",

    ADD_MODEL_GROUP = "ADD_MODEL_GROUP",
    ADD_MODEL_PERSON = "ADD_MODEL_PERSON",
    ADD_MODEL_SOFTWARE_SYSTEM = "ADD_MODEL_SOFTWARE_SYSTEM",
    ADD_MODEL_SOFTWARE_SYSTEM_GROUP = "ADD_MODEL_SOFTWARE_SYSTEM_GROUP",
    ADD_MODEL_CONTAINER = "ADD_MODEL_CONTAINER",
    ADD_MODEL_CONTAINER_GROUP = "ADD_MODEL_CONTAINER_GROUP",
    ADD_MODEL_COMPONENT = "ADD_MODEL_COMPONENT",
    ADD_MODEL_DEPLOYMENT_ENVIRONMENT = "ADD_MODEL_DEPLOYMENT_ENVIRONMENT",
    ADD_MODEL_DEPLOYMENT_NODE = "ADD_MODEL_DEPLOYMENT_NODE",
    ADD_MODEL_INFRASTRUCTURE_NODE_TO_DEPLOYMENT_NODE = "ADD_MODEL_INFRASTRUCTURE_NODE_TO_DEPLOYMENT_NODE",
    ADD_MODEL_SOFTWARE_SYSTEM_INSTANCE_TO_DEPLOYMENT_NODE = "ADD_MODEL_SOFTWARE_SYSTEM_INSTANCE_TO_DEPLOYMENT_NODE",
    ADD_MODEL_CONTAINER_INSTANCE_TO_DEPLOYMENT_NODE = "ADD_MODEL_CONTAINER_INSTANCE_TO_DEPLOYMENT_NODE",
    ADD_MODEL_RELATIONSHIP = "ADD_MODEL_RELATIONSHIP",

    SET_SYSTEM_LANDSCAPE_VIEW = "SET_SYSTEM_LANDSCAPE_VIEW",
    SET_SYSTEM_LANDSCAPE_VIEW_ELEMENT_POSTION = "SET_SYSTEM_LANDSCAPE_VIEW_ELEMENT_POSTION",
    SET_SYSTEM_LANDSCAPE_VIEW_ELEMENT_DIMENSIONS = "SET_SYSTEM_LANDSCAPE_VIEW_ELEMENT_DIMENSIONS",
    INCLUDE_SYSTEM_LANDSCAPE_VIEW_PERSON = "INCLUDE_SYSTEM_LANDSCAPE_VIEW_PERSON",
    INCLUDE_SYSTEM_LANDSCAPE_VIEW_SOFTWARE_SYSTEM = "INCLUDE_SYSTEM_LANDSCAPE_VIEW_SOFTWARE_SYSTEM",

    ADD_SYSTEM_CONTEXT_VIEW = "ADD_SYSTEM_CONTEXT_VIEW",
    SET_SYSTEM_CONTEXT_VIEW_ELEMENT_POSTION = "SET_SYSTEM_CONTEXT_VIEW_ELEMENT_POSTION",
    SET_SYSTEM_CONTEXT_VIEW_ELEMENT_DIMENSIONS = "SET_SYSTEM_CONTEXT_VIEW_ELEMENT_DIMENSIONS",
    INCLUDE_SYSTEM_CONTEXT_VIEW_PERSON = "INCLUDE_SYSTEM_CONTEXT_VIEW_PERSON",
    INCLUDE_SYSTEM_CONTEXT_VIEW_SOFTWARE_SYSTEM = "INCLUDE_SYSTEM_CONTEXT_VIEW_SOFTWARE_SYSTEM",

    ADD_CONTAINER_VIEW = "ADD_CONTAINER_VIEW",
    SET_CONTAINER_VIEW_ELEMENT_POSTION = "SET_CONTAINER_VIEW_ELEMENT_POSTION",
    SET_CONTAINER_VIEW_ELEMENT_DIMENSIONS = "SET_CONTAINER_VIEW_ELEMENT_DIMENSIONS",
    INCLUDE_CONTAINER_VIEW_PERSON = "INCLUDE_CONTAINER_VIEW_PERSON",
    INCLUDE_CONTAINER_VIEW_SOFTWARE_SYSTEM = "INCLUDE_CONTAINER_VIEW_SOFTWARE_SYSTEM",
    INCLUDE_CONTAINER_VIEW_CONTAINER = "INCLUDE_CONTAINER_VIEW_CONTAINER",

    ADD_COMPONENT_VIEW = "ADD_COMPONENT_VIEW",
    SET_COMPONENT_VIEW_ELEMENT_POSTION = "SET_COMPONENT_VIEW_ELEMENT_POSTION",
    SET_COMPONENT_VIEW_ELEMENT_DIMENSIONS = "SET_COMPONENT_VIEW_ELEMENT_DIMENSIONS",
    INCLUDE_COMPONENT_VIEW_PERSON = "INCLUDE_COMPONENT_VIEW_PERSON",
    INCLUDE_COMPONENT_VIEW_SOFTWARE_SYSTEM = "INCLUDE_COMPONENT_VIEW_SOFTWARE_SYSTEM",
    INCLUDE_COMPONENT_VIEW_CONTAINER = "INCLUDE_COMPONENT_VIEW_CONTAINER",
    INCLUDE_COMPONENT_VIEW_COMPONENT = "INCLUDE_COMPONENT_VIEW_COMPONENT",
}
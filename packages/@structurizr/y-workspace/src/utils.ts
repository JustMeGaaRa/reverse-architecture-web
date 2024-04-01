import * as Y from "yjs";
import { v4 } from "uuid";
import { AutoLayoutDirection } from "@structurizr/dsl";

export const createUniqueIdentifier = () => {
    return new String(v4()).substring(0, 8);
}

export const createGroupPropertiesMap = () => {
    const uniqueId = new String(v4()).substring(0, 8);
    const groupMap = new Y.Map([
        ["identifier", `group_${uniqueId}`],
        ["name", "Group"],
        ["tags", new Y.Array<string>()],
        ["people", new Y.Array<Y.Map<unknown>>()],
        ["softwareSystems", new Y.Array<Y.Map<unknown>>()],
        ["containers", new Y.Array<Y.Map<unknown>>()],
        ["components", new Y.Array<Y.Map<unknown>>()]
    ]);
    return groupMap;
}

export const createPersonPropertiesMap = () => {
    const uniqueId = new String(v4()).substring(0, 8);
    const personMap = new Y.Map([
        ["identifier", `person_${uniqueId}`],
        ["name", "Person"],
        ["description", ""],
        ["tags", new Y.Array<string>()],
        ["url", ""],
        ["relationships", new Y.Array<Y.Map<unknown>>()]
    ]);
    return personMap;
}

export const createSoftwareSystemPropertiesMap = () => {
    const uniqueId = new String(v4()).substring(0, 8);
    const softwareSystemMap = new Y.Map([
        ["identifier", `software_system_${uniqueId}`],
        ["name", "Software System"],
        ["description", ""],
        ["technology", new Y.Array<string>()],
        ["tags", new Y.Array<string>()],
        ["url", ""],
        ["groups", new Y.Array<Y.Map<unknown>>()],
        ["containers", new Y.Array<Y.Map<unknown>>()],
        ["relationships", new Y.Array<Y.Map<unknown>>()]
    ]);
    return softwareSystemMap;
}

export const createContainerPropertiesMap = () => {
    const uniqueId = new String(v4()).substring(0, 8);
    const containerMap = new Y.Map([
        ["identifier", `container_${uniqueId}`],
        ["name", "Container"],
        ["description", ""],
        ["technology", new Y.Array<string>()],
        ["tags", new Y.Array<string>()],
        ["url", ""],
        ["groups", new Y.Array<Y.Map<unknown>>()],
        ["components", new Y.Array<Y.Map<unknown>>()],
        ["relationships", new Y.Array<Y.Map<unknown>>()]
    ]);
    return containerMap;
}

export const createComponentPropertiesMap = () => {
    const uniqueId = new String(v4()).substring(0, 8);
    const componentMap = new Y.Map([
        ["identifier", `component_${uniqueId}`],
        ["name", "Component"],
        ["description", ""],
        ["technology", new Y.Array<string>()],
        ["tags", new Y.Array<string>()],
        ["url", ""],
        ["relationships", new Y.Array<Y.Map<unknown>>()]
    ]);
    return componentMap;
}

export const createDeploymentEnvironmentPropertiesMap = () => {
    const uniqueId = new String(v4()).substring(0, 8);
    const deploymentEnvironmentMap = new Y.Map([
        ["identifier", `deployment_environment_${uniqueId}`],
        ["name", "Deployment Environment"],
        ["deploymentGroups", new Y.Array<string>()],
        ["deploymentNodes", new Y.Array<Y.Map<unknown>>()],
        ["relationships", new Y.Array<Y.Map<unknown>>()]
    ]);
    return deploymentEnvironmentMap;
}

export const createDeploymentNodePropertiesMap = () => {
    const uniqueId = new String(v4()).substring(0, 8);
    const deploymentNodeMap = new Y.Map([
        ["identifier", `deployment_node_${uniqueId}`],
        ["name", ""],
        ["description", ""],
        ["technology", new Y.Array<string>()],
        ["instances", 1],
        ["tags", new Y.Array<string>()],
        ["url", ""],
        ["deploymentNodes", new Y.Array<Y.Map<unknown>>()],
        ["infrastructureNodes", new Y.Array<Y.Map<unknown>>()],
        ["softwareSystemInstances", new Y.Array<Y.Map<unknown>>()],
        ["containerInstances", new Y.Array<Y.Map<unknown>>()],
        ["relationships", new Y.Array<Y.Map<unknown>>()]
    ]);
    return deploymentNodeMap;
}

export const createInfrastructureNodePropertiesMap = () => {
    const uniqueId = new String(v4()).substring(0, 8);
    const infrastructureNodeMap = new Y.Map([
        ["identifier", `infrastructure_node_${uniqueId}`],
        ["name", ""],
        ["description", ""],
        ["technology", new Y.Array<string>()],
        ["tags", new Y.Array<string>()],
        ["url", ""],
        ["relationships", new Y.Array<Y.Map<unknown>>()]
    ]);
    return infrastructureNodeMap;
}

export const createSoftwareSystemInstancePropertiesMap = () => {
    const uniqueId = new String(v4()).substring(0, 8);
    const softwareSystemInstanceMap = new Y.Map([
        ["identifier", `software_system_instance_${uniqueId}`],
        ["softwareSystemIdentifier", ""],
        ["deploymentGroups", new Y.Array<string>()],
        ["description", ""],
        ["tags", new Y.Array<string>()],
        ["url", ""]
    ]);
    return softwareSystemInstanceMap;
}

export const createContainerInstancePropertiesMap = () => {
    const uniqueId = new String(v4()).substring(0, 8);
    const containerInstanceMap = new Y.Map([
        ["identifier", `container_instance_${uniqueId}`],
        ["containerIdentifier", ""],
        ["deploymentGroups", new Y.Array<string>()],
        ["description", ""],
        ["tags", new Y.Array<string>()],
        ["url", ""]
    ]);
    return containerInstanceMap;
}

export const createRelationshipPropertiesMap = () => {
    const relationshipMap = new Y.Map([
        ["sourceIdentifier", ""],
        ["targetIdentifier", ""],
        ["description", ""],
        ["technology", new Y.Array<string>()],
        ["tags", new Y.Array<string>()],
        ["url", ""]
    ]);
    return relationshipMap;
}

export const createSystemLandscapeViewPropertiesMap = () => {
    const uniqueId = createUniqueIdentifier();
    const systemLandscapeMap = new Y.Map([
        ["identifier", `system_landscape_${uniqueId}`],
        ["key", ""],
        ["description", ""],
        ["include", ""],
        ["exclude", ""],
        ["title", ""],
        ["elements", new Y.Array<Y.Map<unknown>>()],
        ["relationships", new Y.Array<Y.Map<unknown>>()],
        ["autoLayout", new Y.Map<unknown>()],
        ["animation", new Y.Map<unknown>()],
        ["properties", new Y.Map<unknown>()]
    ]);
    return systemLandscapeMap;
}

export const createSoftwareContextViewPropertiesMap = () => {
    const uniqueId = createUniqueIdentifier();
    const systemContextMap = new Y.Map([
        ["identifier", `system_context_${uniqueId}`],
        ["softwareSystemIdentifier", ""],
        ["key", ""],
        ["description", ""],
        ["include", ""],
        ["exclude", ""],
        ["title", ""],
        ["elements", new Y.Array<Y.Map<unknown>>()],
        ["relationships", new Y.Array<Y.Map<unknown>>()],
        ["autoLayout", new Y.Map<unknown>()],
        ["animation", new Y.Map<unknown>()],
        ["properties", new Y.Map<unknown>()]
    ]);
    return systemContextMap;
}

export const createContainerViewPropertiesMap = () => {
    const uniqueId = createUniqueIdentifier();
    const containerViewMap = new Y.Map([
        ["identifier", `container_${uniqueId}`],
        ["softwareSystemIdentifier", ""],
        ["key", ""],
        ["description", ""],
        ["include", ""],
        ["exclude", ""],
        ["title", ""],
        ["elements", new Y.Array<Y.Map<unknown>>()],
        ["relationships", new Y.Array<Y.Map<unknown>>()],
        ["autoLayout", new Y.Map<unknown>()],
        ["animation", new Y.Map<unknown>()],
        ["properties", new Y.Map<unknown>()]
    ]);
    return containerViewMap;
}

export const createComponentViewPropertiesMap = () => {
    const uniqueId = createUniqueIdentifier();
    const componentViewMap = new Y.Map([
        ["identifier", `component_${uniqueId}`],
        ["containerIdentifier", ""],
        ["key", ""],
        ["description", ""],
        ["include", ""],
        ["exclude", ""],
        ["title", ""],
        ["elements", new Y.Array<Y.Map<unknown>>()],
        ["relationships", new Y.Array<Y.Map<unknown>>()],
        ["autoLayout", new Y.Map<unknown>()],
        ["animation", new Y.Map<unknown>()],
        ["properties", new Y.Map<unknown>()]
    ]);
    return componentViewMap;
}

export const createDeploymentViewPropertiesMap = () => {
    const uniqueId = createUniqueIdentifier();
    const deploymentViewMap = new Y.Map([
        ["identifier", `deployment_${uniqueId}`],
        ["softwareSystemIdentifier", ""],
        ["environment", ""],
        ["key", ""],
        ["description", ""],
        ["include", ""],
        ["exclude", ""],
        ["title", ""],
        ["elements", new Y.Array<Y.Map<unknown>>()],
        ["relationships", new Y.Array<Y.Map<unknown>>()],
        ["autoLayout", new Y.Map<unknown>()],
        ["animation", new Y.Map<unknown>()],
        ["properties", new Y.Map<unknown>()]
    ]);
    return deploymentViewMap;
}

export const createAutoLayoutPropertiesMap = () => {
    const autoLayoutMap = new Y.Map([
        ["direction", AutoLayoutDirection.TopBotom],
        ["rankSeparation", 300],
        ["nodeSeparation", 300]
    ]);
    return autoLayoutMap;
}

export const createAnimationPropertiesMap = () => {
    // TODO: initialize the animation properties map
    const animationMap = new Y.Map();
    return animationMap;
}
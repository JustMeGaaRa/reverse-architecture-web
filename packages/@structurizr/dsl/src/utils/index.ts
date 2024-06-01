import {
    Identifier,
    Relationship,
    ElementType,
    SoftwareSystem,
    Container,
    Component,
    Person,
    DeploymentNode,
    InfrastructureNode,
    Group,
    ViewType,
    SystemContextViewDefinition,
    SystemLandscapeViewDefinition,
    ContainerViewDefinition,
    ComponentViewDefinition,
    DeploymentViewDefinition,
    RelationshipType,
    AutoLayoutDirection,
    Configuration
} from "../types";
import { v4 } from "uuid";
import {
    IComponent,
    IComponentView,
    IConfiguration,
    IContainer,
    IContainerView,
    IDeploymentNode,
    IDeploymentView,
    IElement,
    IGroup,
    IInfrastructureNode,
    IModel,
    IModelView,
    IPerson,
    IRelationship,
    ISoftwareSystem,
    ISystemContextView,
    ISystemLandscapeView,
    IWorkspaceSnapshot,
    ITheme,
    ViewDefinition
} from "../interfaces";

export const applyTheme = (workspace: IWorkspaceSnapshot, theme: ITheme): IWorkspaceSnapshot => {
    return {
        ...workspace,
        views: {
            ...workspace.views,
            configuration: {
                ...workspace.views.configuration,
                styles: {
                    ...workspace.views.configuration.styles,
                    elements: workspace.views.configuration.styles.elements.concat(theme.elements ?? []),
                    relationships: workspace.views.configuration.styles.relationships.concat(theme.relationships ?? [])
                }
            }
        }
    };
}

export const fetchTheme = async (url: string): Promise<ITheme> => {
    const themeResponse = await fetch(url);
    if (!themeResponse.ok) throw new Error(`Theme not found`);
    return await themeResponse.json() as ITheme;
}

export const findViewByKey = (workspace: IWorkspaceSnapshot, viewKey: string): ViewDefinition => {
    return [workspace.views.systemLandscape].find(x => x.key === viewKey)
        ?? workspace.views.systemContexts.find(x => x.key === viewKey)
        ?? workspace.views.containers.find(x => x.key === viewKey)
        ?? workspace.views.components.find(x => x.key === viewKey)
        ?? workspace.views.deployments.find(x => x.key === viewKey);
}

export const findViewForElement = (workspace: IWorkspaceSnapshot, viewType: ViewType, elementIdentifier: Identifier): ViewDefinition => {
    return [workspace.views.systemLandscape].find(x => x.type === viewType)
        ?? workspace.views.systemContexts.find(x => x.type === viewType && x.softwareSystemIdentifier === elementIdentifier)
        ?? workspace.views.containers.find(x => x.type === viewType && x.softwareSystemIdentifier === elementIdentifier)
        ?? workspace.views.components.find(x => x.type === viewType && x.containerIdentifier === elementIdentifier)
        ?? workspace.views.deployments.find(x => x.type === viewType && x.softwareSystemIdentifier === elementIdentifier);
}

export const findViewByType = (workspace: IWorkspaceSnapshot, viewType?: ViewType): ViewDefinition => {
    return [workspace.views.systemLandscape].find(x => x.type === viewType)
        ?? workspace.views.systemContexts.find(x => x.type === viewType)
        ?? workspace.views.containers.find(x => x.type === viewType)
        ?? workspace.views.components.find(x => x.type === viewType)
        ?? workspace.views.deployments.find(x => x.type === viewType);
}

export const findAnyExisting = (workspace: IWorkspaceSnapshot): ViewDefinition => {
    return workspace.views.systemLandscape
        ?? workspace.views.systemContexts[0]
        ?? workspace.views.containers[0]
        ?? workspace.views.components[0]
        ?? workspace.views.deployments[0];
}

export const findElement = (model: IModel, identifier: Identifier): IElement | undefined => {
    const softwareSystems = model.groups
        .flatMap(group => group.softwareSystems)
        .concat(model.softwareSystems);

    for (let softwareSystem of softwareSystems) {
        if (softwareSystem.identifier === identifier) {
            return softwareSystem;
        }

        const containers = softwareSystem.groups
            .flatMap(group => group.containers)
            .concat(softwareSystem.containers)

        for (let container of containers) {
            if (container.identifier === identifier) {
                return container;
            }

            const components = container.groups
                .flatMap(group => group.components)
                .concat(container.components);

            for (let component of components) {
                if (component.identifier === identifier) {
                    return component;
                }
            }
        }
    }

    return undefined;
}

export const findElementPath = (model: IModel, identifier: Identifier): Array<IElement> => {
    const softwareSystems = model.groups
        .flatMap(group => group.softwareSystems)
        .concat(model.softwareSystems);

    for (let softwareSystem of softwareSystems) {
        const containers = softwareSystem.groups
            .flatMap(group => group.containers)
            .concat(softwareSystem.containers)

        for (let container of containers) {
            const components = container.groups
                .flatMap(group => group.components)
                .concat(container.components);

            for (let component of components) {
                if (component.identifier === identifier) {
                    return [softwareSystem, container, component];
                }
            }

            if (container.identifier === identifier) {
                return [softwareSystem, container];
            }
        }

        if (softwareSystem.identifier === identifier) {
            return [softwareSystem];
        }
    }

    return [];
}

export const findSoftwareSystem = (model: IModel, identifier: Identifier) => {
    return model.softwareSystems
        .concat(model.groups.flatMap(x => x.softwareSystems))
        .find(x => x.identifier === identifier);
}

export const findContainer = (model: IModel, identifier: Identifier) => {
    return model.softwareSystems
        .flatMap(x => x.containers)
        .concat(model.groups
            .flatMap(x => x.softwareSystems)
            .flatMap(x => x.containers))
        .find(x => x.identifier === identifier);
}

export const findContainerParent = (model: IModel, containerId: Identifier): ISoftwareSystem | undefined => {
    return model.softwareSystems
        .concat(model.groups.flatMap(x => x.softwareSystems))
        .find(x => x.containers.some(c => c.identifier === containerId));
}

export const findComponentParent = (model: IModel, componentId: Identifier): IContainer | undefined => {
    const groupContainers = model.groups
        .flatMap(x => x.softwareSystems)
        .flatMap(x => x.containers);
    const softwareSystemContainers = model.softwareSystems
        .flatMap(x => x.containers);
    return softwareSystemContainers
        .concat(groupContainers)
        .find(x => x.components.some(c => c.identifier === componentId));
}

export const relationshipExistsOverall = (
    relationships: IRelationship[],
    sourceIdentifier: Identifier,
    targetIdentifier: Identifier
) => {
    return relationships.some(x => 
        x.sourceIdentifier === sourceIdentifier && x.targetIdentifier === targetIdentifier
        || x.sourceIdentifier === targetIdentifier && x.targetIdentifier === sourceIdentifier
    )
}

export const relationshipExistsForElementsInView = (elementsInView: Identifier[], relationship: IRelationship) => {
    return elementsInView.some(x => x === relationship.sourceIdentifier)
        && elementsInView.some(x => x === relationship.targetIdentifier)
}

export const relationshipExistsBetweenElements = (view: ViewDefinition, relationship: IRelationship) => {
    return view?.elements?.find(x => x.id === relationship.sourceIdentifier)
        && view?.elements?.find(x => x.id === relationship.targetIdentifier)
}

export const elementIncludedInView = (view: ViewDefinition, elementIdentifier: Identifier) => {
    switch (view.type) {
        case ViewType.SystemLandscape:
        case ViewType.SystemContext:
        case ViewType.Container:
        case ViewType.Component:
        case ViewType.Deployment:
            return view.include?.some(identifier => identifier === elementIdentifier);
        default:
            return false;
    }
}

export const getRelationships = (model: IModel, implied: boolean) => {
    const relationships = Array.from<IRelationship>([]);

    for (const relationship of model.relationships) {
        // add relationship
        relationships.push(relationship);
    }
    
    getSoftwareSystemImpliedRelationships(
        model.groups.flatMap(x => x.softwareSystems).concat(model.softwareSystems)
    );

    return relationships;

    function getSoftwareSystemImpliedRelationships(
        softwareSystems: ISoftwareSystem[]
    ) {
        for (const softwareSystem of softwareSystems) {
            for (const relationship of softwareSystem.relationships) {
                // add software system relationship
                relationships.push(relationship);
            }

            getContainerImpliedRelationships(
                softwareSystem.groups.flatMap(x => x.containers).concat(softwareSystem.containers),
                softwareSystem.identifier
            );
        }
    }

    function getContainerImpliedRelationships(
        containers: IContainer[],
        softwareSystemIdentifier: Identifier
    ) {
        for (const container of containers) {
            for (const relationship of container.relationships) {
                // add container relationship
                relationships.push(relationship);

                // add implied software system relationship
                relationships.push({
                    type: RelationshipType.Relationship,
                    sourceIdentifier: relationship.sourceIdentifier === container.identifier
                        ? softwareSystemIdentifier
                        : relationship.sourceIdentifier,
                    targetIdentifier: relationship.targetIdentifier === container.identifier
                        ? softwareSystemIdentifier
                        : relationship.targetIdentifier,
                    tags: []
                });
            }

            getComponentImpliedRelationships(
                container.groups.flatMap(x => x.components).concat(container.components),
                container.identifier,
                softwareSystemIdentifier
            );
        }
    }

    function getComponentImpliedRelationships(
        components: IComponent[],
        containerIdentifier: Identifier,
        softwareSystemIdentifier: Identifier
    ) {
        for (const component of components) {
            for (const relationship of component.relationships) {
                // add component relationsip
                relationships.push(relationship);

                // add implied container relationship
                relationships.push({
                    type: RelationshipType.Relationship,
                    sourceIdentifier: relationship.sourceIdentifier === component.identifier
                        ? containerIdentifier
                        : relationship.sourceIdentifier,
                    targetIdentifier: relationship.targetIdentifier === component.identifier
                        ? containerIdentifier
                        : relationship.targetIdentifier,
                    tags: []
                });

                // add implied software system relationship
                relationships.push({
                    type: RelationshipType.Relationship,
                    sourceIdentifier: relationship.sourceIdentifier === component.identifier
                        ? softwareSystemIdentifier
                        : relationship.sourceIdentifier,
                    targetIdentifier: relationship.targetIdentifier === component.identifier
                        ? softwareSystemIdentifier
                        : relationship.targetIdentifier,
                    tags: []
                });
            }
        }
    }
}

export const createDefaultGroup = (): IGroup => {
    const uniqueId = new String(v4()).substring(0, 8);
    return new Group({
        identifier: `group_${uniqueId}`,
        name: "Group"
    }).toSnapshot();
}

export const createDefaultSoftwareSystem = (): ISoftwareSystem => {
    const uniqueId = new String(v4()).substring(0, 8);
    return new SoftwareSystem({
        identifier: `softwareSystem_${uniqueId}`,
        name: "Software System"
    }).toSnapshot();
}

export const createDefaultContainer = (): IContainer => {
    const uniqueId = new String(v4()).substring(0, 8);
    return new Container({
        identifier: `container_${uniqueId}`,
        name: "Container"
    }).toSnapshot();
}

export const createDefaultComponent = (): IComponent => {
    const uniqueId = new String(v4()).substring(0, 8);
    return new Component({
        identifier: `component_${uniqueId}`,
        name: "Component"
    }).toSnapshot();
}

export const createDefaultPerson = (): IPerson => {
    const uniqueId = new String(v4()).substring(0, 8);
    return new Person({
        identifier: `person_${uniqueId}`,
        name: "Person"
    }).toSnapshot();
}

export const createDefaultDeploymentNode = (): IDeploymentNode => {
    const uniqueId = new String(v4()).substring(0, 8);
    return new DeploymentNode({
        identifier: `deployment_node_${uniqueId}`,
        name: "Deployment Node"
    }).toSnapshot();
}

export const createDefaultInfrastructureNode = (): IInfrastructureNode => {
    const uniqueId = new String(v4()).substring(0, 8);
    return new InfrastructureNode({
        identifier: `infrastructure_node_${uniqueId}`,
        name: "Infrastructure Node"
    }).toSnapshot();
}

export const createRelationship = (sourceIdentifier: Identifier, targetIdentifier: Identifier): IRelationship => {
    return new Relationship({
        sourceIdentifier,
        targetIdentifier
    }).toSnapshot();
}

export const createDefaultSystemLandscapeView = (): ISystemLandscapeView => {
    const uniqueId = new String(v4()).substring(0, 8);
    return new SystemLandscapeViewDefinition({
        key: `system_landscape_view_${uniqueId}`,
        title: "System Landscape",
        description: "Default system landscape view.",
        autoLayout: {
            direction: AutoLayoutDirection.TopBotom,
            rankSeparation: 300,
            nodeSeparation: 300
        }
    }).toSnapshot();
}

export const createDefaultSystemContextView = (softwareSystemIdentifier: Identifier): ISystemContextView => {
    const uniqueId = new String(v4()).substring(0, 8);
    return new SystemContextViewDefinition({
        softwareSystemIdentifier,
        key: `system_context_view_${uniqueId}`,
        title: "System Context",
        autoLayout: {
            direction: AutoLayoutDirection.TopBotom,
            rankSeparation: 300,
            nodeSeparation: 300
        }
    }).toSnapshot();
}

export const createDefaultContainerView = (softwareSystemIdentifier: Identifier): IContainerView => {
    const uniqueId = new String(v4()).substring(0, 8);
    return new ContainerViewDefinition({
        softwareSystemIdentifier,
        key: `container_view_${uniqueId}`,
        title: "Container",
        autoLayout: {
            direction: AutoLayoutDirection.TopBotom,
            rankSeparation: 300,
            nodeSeparation: 300
        }
    }).toSnapshot();
}

export const createDefaultComponentView = (containerIdentifier: Identifier): IComponentView => {
    const uniqueId = new String(v4()).substring(0, 8);
    return new ComponentViewDefinition({
        containerIdentifier,
        key: `component_view_${uniqueId}`,
        title: "Component",
        autoLayout: {
            direction: AutoLayoutDirection.TopBotom,
            rankSeparation: 300,
            nodeSeparation: 300
        }
    }).toSnapshot();
}

export const createDefaultDeploymentView = (): IDeploymentView => {
    const uniqueId = new String(v4()).substring(0, 8);
    return new DeploymentViewDefinition({
        environment: "New Environment",
        key: `deployment_view_${uniqueId}`,
        title: "Deployment for New Environment",
        autoLayout: {
            direction: AutoLayoutDirection.TopBotom,
            rankSeparation: 300,
            nodeSeparation: 300
        }
    }).toSnapshot();
}

export const createDefaultModelView = (): IModelView => {
    return {
        type: ViewType.Model,
        key: "model_view",
        elements: [],
        relationships: []
    };
}

export const createDefaultConfiguration = (): IConfiguration => {
    return new Configuration({
        styles: {
            elements: [],
            relationships: []
        },
        themes: []
    }).toSnapshot();
}

export const getDefaultElement = (type: ElementType): IElement | undefined => {
    switch (type) {
        case ElementType.Group:
            return createDefaultGroup();
        case ElementType.SoftwareSystem:
            return createDefaultSoftwareSystem();
        case ElementType.Container:
            return createDefaultContainer();
        case ElementType.Component:
            return createDefaultComponent();
        case ElementType.Person:
            return createDefaultPerson();
        case ElementType.DeploymentNode:
            return createDefaultDeploymentNode();
        case ElementType.InfrastructureNode:
            return createDefaultInfrastructureNode();
        default:
            return undefined;
    }
}

export const getDefaultChildForElement = (parentType?: ElementType): IElement => {
    const uniqueId = new String(v4()).substring(0, 8);

    switch (parentType) {
        case ElementType.SoftwareSystem:
            return new Container({
                identifier: `container_${uniqueId}`,
                name: "Container",
            })
        case ElementType.Container:
            return new Component({
                identifier: `component_${uniqueId}`,
                name: "Component",
            })
    }

    return new SoftwareSystem({
        identifier: `softwareSystem_${uniqueId}`,
        name: "Software System",
    })
}

export const createDefaultWorkspace = (): IWorkspaceSnapshot => {
    return {
        version: 1,
        lastModifiedDate: new Date().toISOString(),
        name: "Workspace",
        description: "An empty workspace with default values.",
        model: {
            people: [],
            softwareSystems: [],
            deploymentEnvironments: [],
            relationships: [],
            groups: []
        },
        views: {
            systemLandscape: createDefaultSystemLandscapeView(),
            systemContexts: [],
            containers: [],
            components: [],
            deployments: [],
            configuration: createDefaultConfiguration(),
        }
    }
}
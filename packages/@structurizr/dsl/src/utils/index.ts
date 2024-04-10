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
    RelationshipType
} from "../types";
import { v4 } from "uuid";
import {
    IComponent,
    IContainer,
    IDeploymentNode,
    IElement,
    IGroup,
    IInfrastructureNode,
    IModel,
    IPerson,
    IRelationship,
    ISoftwareSystem,
    IViewDefinition,
    IWorkspaceSnapshot,
    IWorkspaceTheme,
    ViewDefinition
} from "../interfaces";

export const applyTheme = (workspace: IWorkspaceSnapshot, theme: IWorkspaceTheme): IWorkspaceSnapshot => {
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

export const fetchTheme = async (url: string): Promise<IWorkspaceTheme> => {
    const themeResponse = await fetch(url);
    if (!themeResponse.ok) {
        throw new Error(`Theme not found`);
    }
    const theme = await themeResponse.json() as IWorkspaceTheme;
    return theme;
}

export const findViewByKeys = (workspace: IWorkspaceSnapshot, viewDefinition?: { type: ViewType, identifier: Identifier }): ViewDefinition => {
    return [workspace.views.systemLandscape].find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.systemContexts.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.containers.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.components.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.deployments.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier);
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

export const getDefaultView = (type: ViewType, identifier: Identifier): ViewDefinition => {
    switch (type) {
        case ViewType.SystemLandscape:
            return SystemLandscapeViewDefinition.default();
        case ViewType.SystemContext:
            return SystemContextViewDefinition.default(identifier);
        case ViewType.Container:
            return ContainerViewDefinition.default(identifier);
        case ViewType.Component:
            return ComponentViewDefinition.default(identifier);
        case ViewType.Deployment:
            return DeploymentViewDefinition.default();
        // case ViewType.Model:
        //     return { type: ViewType.Model, identifier: identifier };
    }
}

export const findViewOrDefault = (workspace: IWorkspaceSnapshot, viewDefinition: { type: ViewType, identifier: Identifier }): ViewDefinition => {
    return findViewByKeys(workspace, viewDefinition)
        ?? findViewByType(workspace, viewDefinition.type)
        ?? getDefaultView(viewDefinition.type, viewDefinition.identifier);
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

export const relationshipExistsBetweenElements = (view: IViewDefinition, relationship: IRelationship) => {
    return view?.elements?.find(x => x.id === relationship.sourceIdentifier)
        && view?.elements?.find(x => x.id === relationship.targetIdentifier)
}

export const elementIncludedInView = (view: IViewDefinition, elementIdentifier: Identifier) => {
    return view.include?.some(identifier => identifier === elementIdentifier);
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

export const emptyWorkspace = (): IWorkspaceSnapshot => {
    return {
        version: 1,
        name: "Empty Workspace",
        description: "An empty workspace.",
        model: {
            people: [],
            softwareSystems: [],
            deploymentEnvironments: [],
            relationships: [],
            groups: []
        },
        views: {
            systemContexts: [],
            containers: [],
            components: [],
            deployments: [],
            configuration: {
                styles: {
                    elements: [],
                    relationships: []
                },
                themes: []
            },
        }
    }
}
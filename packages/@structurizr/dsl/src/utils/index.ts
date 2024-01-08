import {
    IWorkspaceMetadata,
    IWorkspaceTheme,
    Identifier,
    Relationship,
    IViewDefinition,
    IWorkspace,
    ISoftwareSystem,
    IContainer,
    IComponent,
    IModel,
    IRelationship,
    IComponentView,
    IContainerView,
    ISystemContextView,
    IDeploymentView,
    ElementType,
    IElement,
    SoftwareSystem,
    Container,
    Component,
    Person,
    DeploymentNode,
    InfrastructureNode,
    Group
} from "../";
import { v4 } from "uuid";

export const applyTheme = (workspace: IWorkspace, theme: IWorkspaceTheme): IWorkspace => {
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
                relationships.push(new Relationship({
                    sourceIdentifier: relationship.sourceIdentifier === container.identifier
                        ? softwareSystemIdentifier
                        : relationship.sourceIdentifier,
                    targetIdentifier: relationship.targetIdentifier === container.identifier
                        ? softwareSystemIdentifier
                        : relationship.targetIdentifier
                }));
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
                relationships.push(new Relationship({
                    sourceIdentifier: relationship.sourceIdentifier === component.identifier
                        ? containerIdentifier
                        : relationship.sourceIdentifier,
                    targetIdentifier: relationship.targetIdentifier === component.identifier
                        ? containerIdentifier
                        : relationship.targetIdentifier
                }));

                // add implied software system relationship
                relationships.push(new Relationship({
                    sourceIdentifier: relationship.sourceIdentifier === component.identifier
                        ? softwareSystemIdentifier
                        : relationship.sourceIdentifier,
                    targetIdentifier: relationship.targetIdentifier === component.identifier
                        ? softwareSystemIdentifier
                        : relationship.targetIdentifier
                }));
            }
        }
    }
}

export const getDefaultElement = (type: ElementType): IElement | undefined => {
    const uniqueId = new String(v4()).substring(0, 8);

    switch (type) {
        case ElementType.Group:
            return new Group({
                identifier: `group_${uniqueId}`,
                name: "Group",
            })
        case ElementType.SoftwareSystem:
            return new SoftwareSystem({
                identifier: `softwareSystem_${uniqueId}`,
                name: "Software System",
            })
        case ElementType.Container:
            return new Container({
                identifier: `container_${uniqueId}`,
                name: "Container",
            })
        case ElementType.Component:
            return new Component({
                identifier: `component_${uniqueId}`,
                name: "Component",
            })
        case ElementType.Person:
            return new Person({
                identifier: `person_${uniqueId}`,
                name: "Person",
            })
        case ElementType.DeploymentNode:
            return new DeploymentNode({
                identifier: `deployment_node_${uniqueId}`,
                name: "Deployment Node",
        });
        case ElementType.InfrastructureNode:
            return new InfrastructureNode({
                identifier: `infrastructure_node_${uniqueId}`,
                name: "Infrastructure Node",
            });
    }

    return undefined;
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
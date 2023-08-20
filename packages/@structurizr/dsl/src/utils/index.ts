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
    IDeploymentView
} from "../";

export const applyMetadata = (workspace: IWorkspace, metadata: IWorkspaceMetadata): IWorkspace => {
    return {
        ...workspace,
        views: {
            ...workspace.views,
            systemLandscape: workspace.views.systemLandscape && {
                ...workspace.views.systemLandscape,
                elements: metadata.views.systemLandscape?.elements ?? [],
                relationships: metadata.views.systemLandscape?.relationships ?? []
            },
            systemContexts: workspace.views.systemContexts.map((view: ISystemContextView) => ({
                ...view,
                elements: metadata.views.systemContexts
                    .find(x => x.identifier === view.identifier)?.elements ?? [],
                relationships: metadata.views.systemContexts
                    .find(x => x.identifier === view.identifier)?.relationships ?? []
            })),
            containers: workspace.views.containers.map((view: IContainerView) => ({
                ...view,
                elements: metadata.views.containers
                    .find(x => x.identifier === view.identifier)?.elements ?? [],
                relationships: metadata.views.containers
                    .find(x => x.identifier === view.identifier)?.relationships ?? []
            })),
            components: workspace.views.components.map((view: IComponentView) => ({
                ...view,
                elements: metadata.views.components
                    .find(x => x.identifier === view.identifier)?.elements ?? [],
                relationships: metadata.views.components
                    .find(x => x.identifier === view.identifier)?.relationships ?? []
            })),
            deployments: workspace.views.deployments.map((view: IDeploymentView) => ({
                ...view,
                elements: metadata.views.deployments
                    .find(x => x.identifier === view.identifier)?.elements ?? [],
                relationships: metadata.views.deployments
                    .find(x => x.identifier === view.identifier)?.relationships ?? []
            }))
        }
    };
}

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
    return view.elements.find(x => x.id === relationship.sourceIdentifier)
        && view.elements.find(x => x.id === relationship.targetIdentifier)
}

export const elementIncludedInView = (view: IViewDefinition, elementIdentifier: Identifier) => {
    return view.include.some(identifier => identifier === elementIdentifier);
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
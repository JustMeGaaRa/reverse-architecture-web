import {
    Workspace,
    IWorkspaceMetadata,
    IWorkspaceTheme,
    Identifier,
    SystemContextView,
    ContainerView,
    ComponentView,
    DeploymentView
} from "../";

export const applyMetadata = (workspace: Workspace, metadata: IWorkspaceMetadata): Workspace => {
    return {
        ...workspace,
        views: {
            ...workspace.views,
            systemLandscape: workspace.views.systemLandscape && {
                ...workspace.views.systemLandscape,
                elements: metadata.views.systemLandscape?.elements ?? [],
                relationships: metadata.views.systemLandscape?.relationships ?? []
            },
            systemContexts: workspace.views.systemContexts.map((view: SystemContextView) => ({
                ...view,
                elements: metadata.views.systemContexts
                    .find(x => x.identifier === view.identifier)?.elements ?? [],
                relationships: metadata.views.systemContexts
                    .find(x => x.identifier === view.identifier)?.relationships ?? []
            })),
            containers: workspace.views.containers.map((view: ContainerView) => ({
                ...view,
                elements: metadata.views.containers
                    .find(x => x.identifier === view.identifier)?.elements ?? [],
                relationships: metadata.views.containers
                    .find(x => x.identifier === view.identifier)?.relationships ?? []
            })),
            components: workspace.views.components.map((view: ComponentView) => ({
                ...view,
                elements: metadata.views.components
                    .find(x => x.identifier === view.identifier)?.elements ?? [],
                relationships: metadata.views.components
                    .find(x => x.identifier === view.identifier)?.relationships ?? []
            })),
            deployments: workspace.views.deployments.map((view: DeploymentView) => ({
                ...view,
                elements: metadata.views.deployments
                    .find(x => x.identifier === view.identifier)?.elements ?? [],
                relationships: metadata.views.deployments
                    .find(x => x.identifier === view.identifier)?.relationships ?? []
            }))
        }
    };
}

export const applyTheme = (workspace: Workspace, theme: IWorkspaceTheme): Workspace => {
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

export const findSoftwareSystem = (workspace: Workspace, identifier: Identifier) => {
    return workspace?.model.softwareSystems
        .concat(workspace?.model.groups.flatMap(x => x.softwareSystems))
        .find(x => x.identifier === identifier);
}

export const findContainer = (workspace: Workspace, identifier: Identifier) => {
    return workspace?.model.softwareSystems
        .flatMap(x => x.containers)
        .concat(workspace?.model.groups
            .flatMap(x => x.softwareSystems)
            .flatMap(x => x.containers))
        .find(x => x.identifier === identifier);
}

export const relationshipExists = (
    workspace: Workspace,
    sourceIdentifier: Identifier,
    targetIdentifier: Identifier
) => {
    return workspace?.model.relationships.some(x => 
        x.sourceIdentifier === sourceIdentifier && x.targetIdentifier === targetIdentifier
        || x.sourceIdentifier === targetIdentifier && x.targetIdentifier === sourceIdentifier
    )
}
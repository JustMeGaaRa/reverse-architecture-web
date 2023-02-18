import { create } from "zustand";
import { ComponentView, ContainerView, DeploymentView, SystemContextView } from "..";
import { Identifier } from "../model/Identifier";
import { findContainer, findSoftwareSystem, Workspace } from "../Workspace";

type WorkspaceState = {
    workspace: Workspace;
}

type Action<TParam> = (param: TParam) => void;
type Func<TParam, TResult> = (param: TParam) => TResult;

type WorkspaceActions = {
    setWorkspace: Action<Workspace>;
    setName: Action<string>;
    systemContextView: Func<Identifier, SystemContextView>;
    containerView: Func<Identifier, ContainerView>;
    componentView: Func<Identifier, ComponentView>;
    deploymentView: Func<{ identifier: Identifier, environment: string }, DeploymentView>;
}

type WorkspaceStore = WorkspaceState & WorkspaceActions;

const relationshipExists = (
    workspace: Workspace,
    sourceIdentifier: Identifier,
    targetIdentifier: Identifier
) => {
    return workspace?.model.relationships.some(x => 
        x.sourceIdentifier === sourceIdentifier && x.targetIdentifier === targetIdentifier
        || x.sourceIdentifier === targetIdentifier && x.targetIdentifier === sourceIdentifier
    )
}

const buildSystemContextView = (workspace: Workspace, identifier: Identifier) => {
    const view = workspace.views.systemContexts.find(x => x.softwareSystemIdentifier === identifier);
    return {
        ...view,
        people: workspace.model.people
            .filter(x => relationshipExists(workspace, identifier, x.identifier)),
        softwareSystems: workspace.model.softwareSystems
            .filter(x => relationshipExists(workspace, identifier, x.identifier))
    }
}

const buildContainerView = (workspace: Workspace, identifier: Identifier) => {
    const view = workspace.views.containers.find(x => x.softwareSystemIdentifier === identifier);
    const softwareSystem = findSoftwareSystem(workspace, identifier);
    return {
        ...view,
        containers: softwareSystem.containers,
        people: workspace.model.people
            .filter(x => softwareSystem.containers.some(container => relationshipExists(workspace, container.identifier, x.identifier))),
        softwareSystems: workspace.model.softwareSystems
            .filter(x => softwareSystem.containers.some(container => relationshipExists(workspace, container.identifier, x.identifier)))
            .filter(system => system.identifier !== softwareSystem?.identifier)
    }
}

const buildComponentView = (workspace: Workspace, identifier: Identifier) => {
    const view = workspace.views.components.find(x => x.containerIdentifier === identifier);
    const container = findContainer(workspace, identifier);
    return {
        ...view,
        components: container.components,
        people: workspace.model.people
            .filter(x => container.components.some(component => relationshipExists(workspace, component.identifier, x.identifier))),
        softwareSystems: workspace.model.softwareSystems
            .filter(x => container.components.some(component => relationshipExists(workspace, component.identifier, x.identifier))),
        containers: workspace.model.softwareSystems
            .flatMap(system => system.containers)
            .filter(x => container.components.some(component => relationshipExists(workspace, component.identifier, x.identifier)))
    }
}

const buildDeploymentView = (workspace: Workspace, identifier: Identifier, environment: string ) => {
    const deploymentEnvironment = workspace.model.deploymentEnvironments
        ?.find(deployment => deployment.name === environment);
    const view = workspace.views.deployments.find(x => x.softwareSystemIdentifier === identifier);
    return {
        ...view,
        deploymentNodes: deploymentEnvironment.deploymentNodes
    }
}

export const useWorkspace = create<WorkspaceStore>((set, get) => ({
    workspace: {
        lastModifiedData: new Date(),
        model: {},
        views: {},
    },
    setWorkspace: (workspace: Workspace) => {
        set({
            workspace: {
                ...workspace,
                views: {
                    ...workspace.views,
                    systemContexts: workspace.views.systemContexts
                        .map(view => buildSystemContextView(workspace, view.softwareSystemIdentifier)),
                    containers: workspace.views.containers
                        .map(view => buildContainerView(workspace, view.softwareSystemIdentifier)),
                    components: workspace.views.components
                        .map(view => buildComponentView(workspace, view.containerIdentifier)),
                    deployments: workspace.views.deployments
                        .map(view => buildDeploymentView(workspace, view.softwareSystemIdentifier, view.environment))
                }
            }
        });
    },
    setName: (name: string) => {
        set((state) => ({
            workspace: { ...state.workspace, name }
        }));
    },
    systemContextView: (identifier: Identifier) => {
        const workspace = get().workspace;
        return buildSystemContextView(workspace, identifier);
    },
    containerView: (identifier: Identifier) => {
        const workspace = get().workspace;
        return buildContainerView(workspace, identifier);
    },
    componentView: (identifier: Identifier) => {
        const workspace = get().workspace;
        return buildComponentView(workspace, identifier);
    },
    deploymentView: ({ identifier, environment }) => {
        const workspace = get().workspace;
        return buildDeploymentView(workspace, identifier, environment);
    }
}));
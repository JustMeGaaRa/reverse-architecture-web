import { create } from "zustand";
import {
    Identifier,
    findContainer,
    findSoftwareSystem,
    Workspace,
    GenericView
} from "..";
import { ElementDimensions } from "./ElementDimensions";
import { WorkspaceActions } from "./WorkspaceActions";
import { WorkspaceState } from "./WorkspaceState";

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
        components: container.components ?? [],
        people: workspace.model.people
            .filter(x => container.components?.some(component => relationshipExists(workspace, component.identifier, x.identifier))),
        softwareSystems: workspace.model.softwareSystems
            .filter(x => container.components?.some(component => relationshipExists(workspace, component.identifier, x.identifier))),
        containers: workspace.model.softwareSystems
            .flatMap(system => system.containers)
            .filter(x => container?.components?.some(component => relationshipExists(workspace, component.identifier, x.identifier)))
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
    addPerson: (identifier: Identifier) => {
        // set((state) => {
        //     const workspace = state.workspace;
        //     const people = workspace.model.people;
        // });
    },
    addSoftwareSystem: (identifier: Identifier) => {
        // set((state) => {
        //     const workspace = state.workspace;
        //     const softwareSystems = workspace.model.softwareSystems;
        // });
    },
    addContainer: (identifier: Identifier) => {
        // set((state) => {
        //     const workspace = state.workspace;
        //     const containers = workspace.model.softwareSystems
        // });
    },
    addComponent: (identifier: Identifier) => {
        // set((state) => {
        //     const workspace = state.workspace;
        //     const components = workspace.model.softwareSystems
        // });
    },
    addDeploymentEnvironment: (identifier: Identifier) => {
        // set((state) => {
        //     const workspace = state.workspace;
        //     const deploymentEnvironments = workspace.model.deploymentEnvironments
        // });
    },
    addDeploymentNode: (identifier: Identifier) => {
        // set((state) => {
        //     const workspace = state.workspace;
        //     const deploymentNodes = workspace.model.softwareSystems
        // });
    },
    setElementDimensions: (dimensions: ElementDimensions) => {
        const updateView = <TView extends GenericView>(view: TView): TView => {
            return {
                ...view,
                layout: {
                    ...view.layout,
                    [dimensions.elementIdentifier]: {
                        x: dimensions.x,
                        y: dimensions.y,
                        width: dimensions.width,
                        height: dimensions.height
                    }
                }
            }
        }

        set((state) => ({
            workspace: {
                ...state.workspace,
                views: {
                    ...state.workspace.views,
                    systemContexts: state.workspace.views.systemContexts
                        .map(view => view.softwareSystemIdentifier === dimensions.viewIdentifier ? updateView(view) : view),
                    containers: state.workspace.views.containers
                        .map(view => view.softwareSystemIdentifier === dimensions.viewIdentifier ? updateView(view) : view),
                    components: state.workspace.views.components
                        .map(view => view.containerIdentifier === dimensions.viewIdentifier ? updateView(view) : view),
                    deployments: state.workspace.views.deployments
                        .map(view => view.softwareSystemIdentifier === dimensions.viewIdentifier ? updateView(view) : view)
                },
                lastModifiedData: new Date()
            }
        }));
    }
}));
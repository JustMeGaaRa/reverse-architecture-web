import {
    Workspace,
    Relationship,
    IView,
    ViewPath,
} from "@structurizr/dsl";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WorkspaceActions } from "./WorkspaceActions";
import { WorkspaceState } from "./WorkspaceState";

export type WorkspaceStore = WorkspaceState & WorkspaceActions;

export const useWorkspaceStore = create(immer<WorkspaceStore>((set) => ({
    workspace: Workspace.Empty,
    viewPath: { path: [] },
    
    setWorkspace: (workspace: Workspace) => {
        set({ workspace });
    },
    setSelectedView: (view: IView) => {
        set({ selectedView: view });
    },
    setViewPath: (path: ViewPath) => {
        set({ viewPath: path });
    },
    setElementDimension: ({ viewIdentifier, elementIdentifier, position, size }) => {
        set((state) => {
            if (state.workspace && viewIdentifier) {
                // TODO: adapt to new api
                // state.layout[viewIdentifier][elementIdentifier] = {
                //     ...position,
                //     ...size
                // }   
                state.workspace.lastModifiedDate = new Date();
            }
        });
    },
    setName: (name: string) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.name = name;
                state.workspace.lastModifiedDate = new Date();
            }
        });
    },
    addPerson: ({ person }) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.model.people.push(person);
                state.workspace.lastModifiedDate = new Date();
            }
        });
    },
    addSoftwareSystem: ({ softwareSystem }) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.model.softwareSystems.push(softwareSystem);
                state.workspace.lastModifiedDate = new Date();
            }
        });
    },
    addContainer: ({ softwareSystemIdentifier, container }) => {
        set((state) => {
            if (state.workspace) {
                const index = state.workspace.model.softwareSystems
                    .findIndex(x => x.identifier === softwareSystemIdentifier);
                state.workspace.model
                    .softwareSystems[index]
                    .containers
                    .push(container);
                state.workspace.lastModifiedDate = new Date();
            }
        });
    },
    addComponent: ({ softwareSystemIdentifier, containerIdentifier, component }) => {
        set((state) => {
            if (state.workspace) {
                const systemIndex = state.workspace.model
                    .softwareSystems
                    .findIndex(x => x.identifier === softwareSystemIdentifier);
                const containerIndex = state.workspace.model
                    .softwareSystems[systemIndex]
                    .containers
                    .findIndex(x => x.identifier === containerIdentifier);
                state.workspace.model
                    .softwareSystems[systemIndex]
                    .containers[containerIndex]
                    .components
                    .push(component);
                state.workspace.lastModifiedDate = new Date();
            }
        });
    },
    addDeploymentEnvironment: ({ deploymentEnvironment }) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.model.deploymentEnvironments.push(deploymentEnvironment);
                state.workspace.lastModifiedDate = new Date();
            }
        });
    },
    addDeploymentNode: ({ environment, deploymentNode }) => {
        set((state) => {
            if (state.workspace) {
                const index = state.workspace.model
                    .deploymentEnvironments
                    .findIndex(x => x.name === environment);
                state.workspace.model
                    .deploymentEnvironments[index]
                    .deploymentNodes
                    .push(deploymentNode);
                state.workspace.lastModifiedDate = new Date();
            }
        });
    },
    addRelationship: (relationship: Relationship) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.model.relationships.push(relationship);
                state.workspace.lastModifiedDate = new Date();
            }
        });
    }
})));

export * from "./WorkspaceActions";
export * from "./WorkspaceState";
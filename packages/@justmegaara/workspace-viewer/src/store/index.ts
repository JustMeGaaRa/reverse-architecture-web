import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
    Workspace,
    Relationship,
    workspace,
    model,
    views,
} from "@justmegaara/structurizr-dsl";
import { WorkspaceActions } from "./WorkspaceActions";
import { Level, WorkspaceState } from "./WorkspaceState";

export type WorkspaceStore = WorkspaceState & WorkspaceActions;

export const useWorkspaceStore = create(immer<WorkspaceStore>((set) => ({
    workspace: workspace("Workspace", "This is a workspace", model(), views()),
    layout: {},
    levels: [],
    setWorkspace: (workspace: Workspace) => {
        set({ workspace });
    },
    setName: (name: string) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.name = name;
                state.workspace.lastModifiedData = new Date();
            }
        });
    },
    addPerson: ({ person }) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.model.people.push(person);
                state.workspace.lastModifiedData = new Date();
            }
        });
    },
    addSoftwareSystem: ({ softwareSystem }) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.model.softwareSystems.push(softwareSystem);
                state.workspace.lastModifiedData = new Date();
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
                state.workspace.lastModifiedData = new Date();
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
                state.workspace.lastModifiedData = new Date();
            }
        });
    },
    addDeploymentEnvironment: ({ deploymentEnvironment }) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.model.deploymentEnvironments.push(deploymentEnvironment);
                state.workspace.lastModifiedData = new Date();
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
                state.workspace.lastModifiedData = new Date();
            }
        });
    },
    addRelationship: (relationship: Relationship) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.model.relationships.push(relationship);
                state.workspace.lastModifiedData = new Date();
            }
        });
    },
    setElementDimension: ({ viewIdentifier, elementIdentifier, position, size }) => {
        set((state) => {
            if (state.workspace && viewIdentifier) {
                state.layout[viewIdentifier][elementIdentifier] = {
                    ...position,
                    ...size
                }   
                state.workspace.lastModifiedData = new Date();
            }
        });
    },
    setLevels: (levels: Array<Level>) => {
        set({ levels });
    }
})));

export * from "./WorkspaceActions";
export * from "./WorkspaceState";
import {
    Component,
    Container,
    DeploymentEnvironment,
    DeploymentNode,
    IViewDefinition,
    Identifier,
    Person,
    Position,
    Relationship,
    Size,
    SoftwareSystem,
    ViewPath,
    Workspace,
} from "@structurizr/dsl";
import { create } from "zustand";

export type WorkspaceStore = {
    workspace: Workspace;
    selectedView?: IViewDefinition;
    viewPath: ViewPath;
    
    setWorkspace: Action<Workspace>;
    setSelectedView: Action<IViewDefinition>;
    setViewPath: Action<ViewPath>;
    setName: Action<string>;
    addPerson: Action<PersonParams>;
    addSoftwareSystem: Action<SoftwareSystemParams>;
    addContainer: Action<ContainerParams>;
    addComponent: Action<ComponentParams>;
    addDeploymentEnvironment: Action<DeploymentEnvironmentParams>;
    addDeploymentNode: Action<DeploymentNodeParams>;
    addRelationship: Action<Relationship>;
};

export type Action<TParam> = (param: TParam) => void;

export type Func<TParam, TResult> = (param: TParam) => TResult;

export type PersonParams = {
    person: Person;
    position: Position;
}

export type SoftwareSystemParams = {
    softwareSystem: SoftwareSystem;
    position: Position;
}

export type ContainerParams = {
    softwareSystemIdentifier: Identifier;
    container: Container;
    position: Position;
}

export type ComponentParams = {
    softwareSystemIdentifier: Identifier;
    containerIdentifier: Identifier;
    component: Component;
    position: Position;
}

export type DeploymentEnvironmentParams = {
    deploymentEnvironment: DeploymentEnvironment;
}

export type DeploymentNodeParams = {
    softwareSystemIdentifier: Identifier;
    environment: string;
    deploymentNode: DeploymentNode;
    position: Position;
};

export type LayoutElementParams = {
    viewIdentifier: Identifier;
    elementIdentifier: Identifier;
    position: Position;
    size: Size;
};

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
    workspace: Workspace.Empty,
    viewPath: { path: [] },
    
    setWorkspace: (workspace: Workspace) => {
        set({ workspace });
    },
    setSelectedView: (view: IViewDefinition) => {
        set({ selectedView: view });
    },
    setViewPath: (path: ViewPath) => {
        set({ viewPath: path });
    },
    setName: (name: string) => {
        set(state => ({
            ...state,
            workspace: {
                ...state.workspace,
                name: name,
                lastModifiedDate: new Date()
            }
        }));
    },
    addPerson: ({ person }) => {
        set((state) => ({
            ...state,
            workspace: {
                ...state.workspace,
                model: {
                    ...state.workspace.model,
                    people: [
                        ...state.workspace.model.people,
                        person
                    ]
                },
                lastModifiedDate: new Date()
            }
        }));
    },
    addSoftwareSystem: ({ softwareSystem }) => {
        set((state) => ({
            ...state,
            workspace: {
                ...state.workspace,
                model: {
                    ...state.workspace.model,
                    softwareSystems: [
                        ...state.workspace.model.softwareSystems,
                        softwareSystem
                    ]
                },
                lastModifiedDate: new Date()
            }
        }));
    },
    addContainer: ({ softwareSystemIdentifier, container }) => {
        set((state) => ({
            ...state,
            workspace: {
                ...state.workspace,
                model: {
                    ...state.workspace.model,
                    softwareSystems: state.workspace.model.softwareSystems.map(softwareSystem => {
                        if (softwareSystem.identifier === softwareSystemIdentifier) {
                            return {
                                ...softwareSystem,
                                containers: [
                                    ...softwareSystem.containers,
                                    container
                                ]
                            }
                        }
                        return softwareSystem;
                    }
                    )
                },
                lastModifiedDate: new Date()
            }
        }));
    },
    addComponent: ({ softwareSystemIdentifier, containerIdentifier, component }) => {
        set((state) => ({
            ...state,
            workspace: {
                ...state.workspace,
                model: {
                    ...state.workspace.model,
                    softwareSystems: state.workspace.model.softwareSystems.map(softwareSystem => {
                        if (softwareSystem.identifier === softwareSystemIdentifier) {
                            return {
                                ...softwareSystem,
                                containers: softwareSystem.containers.map(container => {
                                    if (container.identifier === containerIdentifier) {
                                        return {
                                            ...container,
                                            components: [
                                                ...container.components,
                                                component
                                            ]
                                        }
                                    }
                                    return container;
                                })
                            }
                        }
                        return softwareSystem;
                    })
                }
            }
        }));
    },
    addDeploymentEnvironment: ({ deploymentEnvironment }) => {
        set((state) => ({
            ...state,
            workspace: {
                ...state.workspace,
                model: {
                    ...state.workspace.model,
                    deploymentEnvironments: [
                        ...state.workspace.model.deploymentEnvironments,
                        deploymentEnvironment
                    ]
                },
                lastModifiedDate: new Date()
            }
        }));
    },
    addDeploymentNode: ({ environment, deploymentNode }) => {
        set((state) => ({
            ...state,
            workspace: {
                ...state.workspace,
                model: {
                    ...state.workspace.model,
                    deploymentEnvironments: state.workspace.model.deploymentEnvironments.map(deploymentEnvironment => {
                        if (deploymentEnvironment.name === environment) {
                            return {
                                ...deploymentEnvironment,
                                deploymentNodes: [
                                    ...deploymentEnvironment.deploymentNodes,
                                    deploymentNode
                                ]
                            }
                        }
                        return deploymentEnvironment;
                    }
                    )
                },
                lastModifiedDate: new Date()
            }
        }));
    },
    addRelationship: (relationship: Relationship) => {
        set((state) => ({
            ...state,
            workspace: {
                ...state.workspace,
                model: {
                    ...state.workspace.model,
                    relationships: [
                        ...state.workspace.model.relationships,
                        relationship
                    ]
                },
                lastModifiedDate: new Date()
            }
        }));
    }
}));
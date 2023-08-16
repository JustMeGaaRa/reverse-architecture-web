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
    Workspace,
    ViewType,
    ViewKeys,
    IWorkspace,
    IModel,
    IPerson,
    ISoftwareSystem,
    IRelationship,
    IDeploymentEnvironment,
    IGroup,
    IContainer,
    IComponent,
    IDeploymentNode,
} from "@structurizr/dsl";
import { create } from "zustand";

export type WorkspaceStore = {
    workspace: IWorkspace;
    selectedView: IViewDefinition;
    selectedViewPath: Array<ViewKeys>;
};

export const useWorkspaceStore = create<WorkspaceStore>(() => ({
    workspace: Workspace.Empty.toObject(),
    selectedView: {
        type: ViewType.SystemLandscape,
        identifier: "SystemLandscape",
        elements: [],
        relationships: []
    },
    selectedViewPath: [],
}));

export type Action<TParam> = (state: WorkspaceStore, param: TParam) => void;

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

namespace WorkspaceActions {
    const addPerson: Action<PersonParams> = (state, { person }) => {
        return {
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
        };
    }

    const addSoftwareSystem: Action<SoftwareSystemParams> = (state, { softwareSystem }) => {
        return {
            ...state,
            workspace: {
                ...state.workspace,
                model: addSoftwareSystemAction(state.workspace.model, softwareSystem),
                lastModifiedDate: new Date()
            }
        }
    }

    const addContainer: Action<ContainerParams> = (state, { softwareSystemIdentifier, container }) => {
        return {
            ...state,
            workspace: {
                ...state.workspace,
                model: {
                    ...state.workspace.model,
                    softwareSystems: state.workspace.model.softwareSystems.map(softwareSystem =>
                        softwareSystem.identifier === softwareSystemIdentifier
                            ? addContainerAction(softwareSystem, container)
                            : softwareSystem
                    )
                },
                lastModifiedDate: new Date()
            }
        }
    }

    const addComponent: Action<ComponentParams> = (state, { softwareSystemIdentifier, containerIdentifier, component }) => {
        return {
            ...state,
            workspace: {
                ...state.workspace,
                model: {
                    ...state.workspace.model,
                    softwareSystems: state.workspace.model.softwareSystems.map(softwareSystem => 
                        softwareSystem.identifier === softwareSystemIdentifier
                        ? {
                            ...softwareSystem,
                            containers: softwareSystem.containers.map(container => 
                                container.identifier === containerIdentifier
                                    ? addComponentAction(container, component)
                                    : container
                            )
                        }
                        : softwareSystem
                    )
                }
            }
        }
    }

    const addDeploymentEnvironment: Action<DeploymentEnvironmentParams> = (state, { deploymentEnvironment }) => {
        return {
            ...state,
            workspace: {
                ...state.workspace,
                model: addDeploymentEnvironmentAction(state.workspace.model, deploymentEnvironment),
                lastModifiedDate: new Date()
            }
        }
    }

    const addDeploymentNode: Action<DeploymentNodeParams> = (state, { environment, deploymentNode }) => {
        return {
            ...state,
            workspace: {
                ...state.workspace,
                model: {
                    ...state.workspace.model,
                    deploymentEnvironments: state.workspace.model.deploymentEnvironments.map(deploymentEnvironment =>
                        deploymentEnvironment.name === environment
                            ? addDeploymentNodeAction(deploymentEnvironment, deploymentNode)
                            : deploymentEnvironment
                    )
                },
                lastModifiedDate: new Date()
            }
        }
    }

    const addRelationship: Action<Relationship> = (state, relationship: Relationship) => {
        return {
            ...state,
            workspace: {
                ...state.workspace,
                model: addRelationshipAction(state.workspace.model, relationship),
                lastModifiedDate: new Date()
            }
        }
    }

    function addPersonAction(model: IModel, person: IPerson) {
        return {
            ...model,
            people: [
                ...model.people.filter(p => p.identifier !== person.identifier),
                person
            ]
        }
    }
    
    function addSoftwareSystemAction(model: IModel, softwareSystem: ISoftwareSystem) {
        return {
            ...model,
            softwareSystems: [
                ...model.softwareSystems.filter(s => s.identifier !== softwareSystem.identifier),
                softwareSystem
            ]
        }
    }
    
    function addDeploymentEnvironmentAction(model: IModel, deploymentEnvironment: IDeploymentEnvironment) {
        return {
            ...model,
            deploymentEnvironments: [
                ...model.deploymentEnvironments
                    .filter(d => d.identifier !== deploymentEnvironment.identifier),
                deploymentEnvironment
            ]
        }
    }
    
    function addRelationshipAction(model: IModel, relationship: IRelationship) {
        return {
            ...model,
            relationships: [
                ...model.relationships
                    .filter(r => !(
                        r.sourceIdentifier === relationship.sourceIdentifier
                        && r.targetIdentifier === relationship.targetIdentifier
                    )),
                relationship
            ]
        }
    }
    
    function addGroupAction(model: IModel, group: IGroup) {
        return {
            ...model,
            groups: [
                ...model.groups.filter(g => g.identifier !== group.identifier),
                group
            ]
        }
    }
    
    function removePersonAction(model: IModel, person: IPerson) {
        return {
            ...model,
            people: model.people.filter(p => p.identifier !== person.identifier)
        }
    }
    
    function removeSoftwareSystemAction(model: IModel, softwareSystem: ISoftwareSystem) {
        return {
            ...model,
            softwareSystems: model.softwareSystems.filter(s => s.identifier !== softwareSystem.identifier)
        }
    }
    
    function removeDeploymentEnvironmentAction(model: IModel, deploymentEnvironment: IDeploymentEnvironment) {
        return {
            ...model,
            deploymentEnvironments: model.deploymentEnvironments
                .filter(d => d.identifier !== deploymentEnvironment.identifier)
        }
    }
    
    function removeRelationshipAction(model: IModel, relationship: IRelationship) {
        return {
            ...model,
            relationships: model.relationships
                .filter(r => !(
                    r.sourceIdentifier === relationship.sourceIdentifier
                    && r.targetIdentifier === relationship.targetIdentifier
                ))
        }
    }
    
    function removeGroupAction(model: IModel, group: IGroup) {
        return {
            ...model,
            groups: model.groups.filter(g => g.identifier !== group.identifier)
        }
    }
    
    function addContainerAction(softwareSystem: ISoftwareSystem, container: IContainer) {
        return {
            ...softwareSystem,
            containers: [
                ...softwareSystem.containers.filter(x => x.identifier !== container.identifier),
                container
            ]
        }
    }
    
    function removeContainerAction(softwareSystem: ISoftwareSystem, container: IContainer) {
        return {
            ...softwareSystem,
            containers: softwareSystem.containers.filter(x => x.identifier !== container.identifier)
        }
    }
    
    function addComponentAction(container: IContainer, component: IComponent) {
        return {
            ...container,
            components: [
                ...container.components.filter(x => x.identifier !== component.identifier),
                component
            ]
        }
    }
    
    function removeComponentAction(container: IContainer, component: IComponent) {
        return {
            ...container,
            components: container.components.filter(x => x.identifier !== component.identifier)
        }
    }
    
    function addDeploymentNodeAction(deploymentEnvironment: IDeploymentEnvironment, deploymentNode: IDeploymentNode) {
        return {
            ...deploymentEnvironment,
            deploymentNodes: [
                ...deploymentEnvironment.deploymentNodes
                    .filter(n => n.identifier !== deploymentNode.identifier),
                deploymentNode
            ]
        }
    }
    
    function removeDeploymentNodeAction(deploymentEnvironment: IDeploymentEnvironment, deploymentNode: IDeploymentNode) {
        return {
            ...deploymentEnvironment,
            deploymentNodes: deploymentEnvironment.deploymentNodes
                .filter(n => n.identifier !== deploymentNode.identifier)
        }
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWorkspace = void 0;
const zustand_1 = require("zustand");
const immer_1 = require("zustand/middleware/immer");
const __1 = require("..");
const relationshipExists = (workspace, sourceIdentifier, targetIdentifier) => {
    return workspace?.model.relationships.some(x => x.sourceIdentifier === sourceIdentifier && x.targetIdentifier === targetIdentifier
        || x.sourceIdentifier === targetIdentifier && x.targetIdentifier === sourceIdentifier);
};
const buildSystemContextView = (workspace, identifier) => {
    const view = workspace.views.systemContexts.find(x => x.softwareSystemIdentifier === identifier);
    if (view) {
        return {
            ...view,
            people: workspace.model.people
                .filter(x => relationshipExists(workspace, identifier, x.identifier)),
            softwareSystems: workspace.model.softwareSystems
                .filter(x => relationshipExists(workspace, identifier, x.identifier))
        };
    }
    return undefined;
};
const buildContainerView = (workspace, identifier) => {
    const view = workspace.views.containers.find(x => x.softwareSystemIdentifier === identifier);
    const softwareSystem = (0, __1.findSoftwareSystem)(workspace, identifier);
    if (view && softwareSystem) {
        return {
            ...view,
            containers: softwareSystem?.containers ?? [],
            people: workspace.model.people
                .filter(x => softwareSystem?.containers.some(container => relationshipExists(workspace, container.identifier, x.identifier))),
            softwareSystems: workspace.model.softwareSystems
                .filter(x => softwareSystem?.containers.some(container => relationshipExists(workspace, container.identifier, x.identifier)))
                .filter(system => system.identifier !== softwareSystem?.identifier)
        };
    }
    return undefined;
};
const buildComponentView = (workspace, identifier) => {
    const view = workspace.views.components.find(x => x.containerIdentifier === identifier);
    const container = (0, __1.findContainer)(workspace, identifier);
    if (view && container) {
        return {
            ...view,
            components: container?.components ?? [],
            people: workspace.model.people
                .filter(x => container?.components?.some(component => relationshipExists(workspace, component.identifier, x.identifier))),
            softwareSystems: workspace.model.softwareSystems
                .filter(x => container?.components?.some(component => relationshipExists(workspace, component.identifier, x.identifier))),
            containers: workspace.model.softwareSystems
                .flatMap(system => system.containers)
                .filter(x => container?.components?.some(component => relationshipExists(workspace, component.identifier, x.identifier)))
        };
    }
    return undefined;
};
const buildDeploymentView = (workspace, identifier, environment) => {
    const deploymentEnvironment = workspace.model.deploymentEnvironments
        ?.find(deployment => deployment.name === environment);
    const view = workspace.views.deployments.find(x => x.softwareSystemIdentifier === identifier);
    if (view && deploymentEnvironment) {
        return {
            ...view,
            deploymentNodes: deploymentEnvironment?.deploymentNodes ?? [],
        };
    }
    return undefined;
};
exports.useWorkspace = (0, zustand_1.create)((0, immer_1.immer)((set) => ({
    setWorkspace: (workspace) => {
        set({
            workspace: {
                ...workspace,
                views: {
                    ...workspace.views,
                    systemContexts: workspace.views.systemContexts
                        .map(view => buildSystemContextView(workspace, view.softwareSystemIdentifier) ?? view),
                    containers: workspace.views.containers
                        .map(view => buildContainerView(workspace, view.softwareSystemIdentifier) ?? view),
                    components: workspace.views.components
                        .map(view => buildComponentView(workspace, view.containerIdentifier) ?? view),
                    deployments: workspace.views.deployments
                        .map(view => buildDeploymentView(workspace, view.softwareSystemIdentifier, view.environment) ?? view)
                }
            }
        });
    },
    setName: (name) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.name = name;
            }
        });
    },
    addPerson: (person) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.model.people.push(person);
            }
        });
    },
    addSoftwareSystem: (softwareSystem) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.model.softwareSystems.push(softwareSystem);
            }
        });
    },
    addContainer: (params) => {
        set((state) => {
            if (state.workspace) {
                const index = state.workspace.model.softwareSystems
                    .findIndex(x => x.identifier === params.softwareSystemIdentifier);
                state.workspace.model
                    .softwareSystems[index]
                    .containers
                    .push(params.container);
            }
        });
    },
    addComponent: (params) => {
        set((state) => {
            if (state.workspace) {
                const systemIndex = state.workspace.model
                    .softwareSystems
                    .findIndex(x => x.identifier === params.softwareSystemIdentifier);
                const containerIndex = state.workspace.model
                    .softwareSystems[systemIndex]
                    .containers
                    .findIndex(x => x.identifier === params.containerIdentifier);
                state.workspace.model
                    .softwareSystems[systemIndex]
                    .containers[containerIndex]
                    .components
                    .push(params.component);
            }
        });
    },
    addDeploymentEnvironment: (deploymentEnvironment) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.model.deploymentEnvironments.push(deploymentEnvironment);
            }
        });
    },
    addDeploymentNode: (params) => {
        set((state) => {
            if (state.workspace) {
                const index = state.workspace.model
                    .deploymentEnvironments
                    .findIndex(x => x.name === params.environment);
                state.workspace.model
                    .deploymentEnvironments[index]
                    .deploymentNodes
                    .push(params.deploymentNode);
            }
        });
    },
    addRelationship: (relationship) => {
        set((state) => {
            if (state.workspace) {
                state.workspace.model.relationships.push(relationship);
            }
        });
    },
    setLayoutElement: (params) => {
        set((state) => {
            if (state.workspace && params.viewIdentifier) {
                const dimentions = {
                    x: params.x,
                    y: params.y,
                    width: params.width,
                    height: params.height
                };
                // state.workspace.views
                //     .systemContexts[params.viewIdentifier]
                //     .layout[params.elementIdentifier] = dimentions;
                // state.workspace.views
                //     .containers[params.viewIdentifier]
                //     .layout[params.elementIdentifier] = dimentions;
                // state.workspace.views
                //     .components[params.viewIdentifier]
                //     .layout[params.elementIdentifier] = dimentions;
                // state.workspace.views
                //     .deployments[params.viewIdentifier]
                //     .layout[params.elementIdentifier] = dimentions;
                state.workspace.lastModifiedData = new Date();
            }
        });
    }
})));
//# sourceMappingURL=index.js.map
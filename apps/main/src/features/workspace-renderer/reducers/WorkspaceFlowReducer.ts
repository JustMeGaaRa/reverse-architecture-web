import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { ActionFlowType, WorkspaceFlowAction } from "../actions";

export const workspaceFlowReducer = (state: IWorkspaceSnapshot, action: WorkspaceFlowAction): IWorkspaceSnapshot => {
    switch (action.type) {
        case ActionFlowType.CONNECT_PERSON_ON_SYSTEM_LANDSCAPE_VIEW:
            return {
                ...state,
                model: {
                    ...state.model,
                    people: [...state.model.people, action.payload.person],
                    relationships: [...state.model.relationships, action.payload.relationship]
                },
                views: {
                    ...state.views,
                    systemLandscape: {
                        ...state.views.systemLandscape,
                        include: [...state.views.systemLandscape.include, action.payload.person.identifier]
                    }
                }
            };
        case ActionFlowType.CONNECT_SOFTWARE_SYSTEM_ON_SYSTEM_LANDSCAPE_VIEW:
            return {
                ...state,
                model: {
                    ...state.model,
                    softwareSystems: [...state.model.softwareSystems, action.payload.softwareSystem],
                    relationships: [...state.model.relationships, action.payload.relationship]
                },
                views: {
                    ...state.views,
                    systemLandscape: {
                        ...state.views.systemLandscape,
                        include: [...state.views.systemLandscape.include, action.payload.softwareSystem.identifier]
                    }
                }
            };
        case ActionFlowType.CONNECT_PERSON_ON_SYSTEM_CONTEXT_VIEW:
            return {
                ...state,
                model: {
                    ...state.model,
                    people: [...state.model.people, action.payload.person],
                    relationships: [...state.model.relationships, action.payload.relationship]
                },
                views: {
                    ...state.views,
                    systemContexts: state.views.systemContexts.map(systemContextView => 
                        systemContextView.key === action.payload.viewIdentifier 
                            ? {
                                ...systemContextView,
                                include: [...systemContextView.include, action.payload.person.identifier]
                            }
                            : systemContextView
                    )
                }
            };
        case ActionFlowType.CONNECT_SOFTWARE_SYSTEM_ON_SYSTEM_CONTEXT_VIEW:
            return {
                ...state,
                model: {
                    ...state.model,
                    softwareSystems: [...state.model.softwareSystems, action.payload.softwareSystem],
                    relationships: [...state.model.relationships, action.payload.relationship]
                },
                views: {
                    ...state.views,
                    systemContexts: state.views.systemContexts.map(systemContextView => 
                        systemContextView.key === action.payload.viewIdentifier 
                            ? {
                                ...systemContextView,
                                include: [...systemContextView.include, action.payload.softwareSystem.identifier]
                            }
                            : systemContextView
                    )
                }
            };
        case ActionFlowType.CONNECT_PERSON_ON_CONTAINER_VIEW:
            return {
                ...state,
                model: {
                    ...state.model,
                    people: [...state.model.people, action.payload.person],
                    relationships: [...state.model.relationships, action.payload.relationship]
                },
                views: {
                    ...state.views,
                    containers: state.views.containers.map(containerView => 
                        containerView.key === action.payload.viewIdentifier 
                            ? {
                                ...containerView,
                                include: [...containerView.include, action.payload.person.identifier]
                            }
                            : containerView
                    )
                }
            };
        case ActionFlowType.CONNECT_SOFTWARE_SYSTEM_ON_CONTAINER_VIEW:
            return {
                ...state,
                model: {
                    ...state.model,
                    softwareSystems: [...state.model.softwareSystems, action.payload.softwareSystem],
                    relationships: [...state.model.relationships, action.payload.relationship]
                },
                views: {
                    ...state.views,
                    containers: state.views.containers.map(containerView => 
                        containerView.key === action.payload.viewIdentifier 
                            ? {
                                ...containerView,
                                include: [...containerView.include, action.payload.softwareSystem.identifier]
                            }
                            : containerView
                    )
                }
            };
        case ActionFlowType.CONNECT_CONTAINER_ON_CONTAINER_VIEW:
            return {
                ...state,
                model: {
                    ...state.model,
                    softwareSystems: state.model.softwareSystems.map(softwareSystem => {
                        if (softwareSystem.identifier === action.payload.softwareSystemIdentifier) {
                            return {
                                ...softwareSystem,
                                containers: [...softwareSystem.containers, action.payload.container]
                            };
                        }
                        return softwareSystem;
                    }),
                    relationships: [...state.model.relationships, action.payload.relationship]
                },
                views: {
                    ...state.views,
                    containers: state.views.containers.map(containerView => 
                        containerView.key === action.payload.viewIdentifier 
                            ? {
                                ...containerView,
                                include: [...containerView.include, action.payload.container.identifier]
                            }
                            : containerView
                    )
                }
            };
        case ActionFlowType.CONNECT_PERSON_ON_COMPONENT_VIEW:
            return {
                ...state,
                model: {
                    ...state.model,
                    people: [...state.model.people, action.payload.person],
                    relationships: [...state.model.relationships, action.payload.relationship]
                },
                views: {
                    ...state.views,
                    components: state.views.components.map(componentView => 
                        componentView.key === action.payload.viewIdentifier 
                            ? {
                                ...componentView,
                                include: [...componentView.include, action.payload.person.identifier]
                            }
                            : componentView
                    )
                }
            };
        case ActionFlowType.CONNECT_SOFTWARE_SYSTEM_ON_COMPONENT_VIEW:
            return {
                ...state,
                model: {
                    ...state.model,
                    softwareSystems: [...state.model.softwareSystems, action.payload.softwareSystem],
                    relationships: [...state.model.relationships, action.payload.relationship]
                },
                views: {
                    ...state.views,
                    components: state.views.components.map(componentView => 
                        componentView.key === action.payload.viewIdentifier 
                            ? {
                                ...componentView,
                                include: [...componentView.include, action.payload.softwareSystem.identifier]
                            }
                            : componentView
                    )
                }
            };
        // case ActionFlowType.CONNECT_CONTAINER_ON_COMPONENT_VIEW:
        //     return {
        //         ...state,
        //         model: {
        //             ...state.model,
        //             softwareSystems: state.model.softwareSystems.map(softwareSystem => {
        //                 if (softwareSystem.identifier === action.payload.softwareSystemIdentifier) {
        //                     return {
        //                         ...softwareSystem,
        //                         containers: [...softwareSystem.containers, action.payload.container]
        //                     };
        //                 }
        //                 return softwareSystem;
        //             }),
        //             relationships: [...state.model.relationships, action.payload.relationship]
        //         },
        //         views: {
        //             ...state.views,
        //             components: state.views.components.map(componentView => 
        //                 componentView.identifier === action.payload.viewIdentifier 
        //                     ? {
        //                         ...componentView,
        //                         include: [...componentView.include, action.payload.container.identifier]
        //                     }
        //                     : componentView
        //             )
        //         }
        //     };
        // case ActionFlowType.CONNECT_COMPONENT_ON_COMPONENT_VIEW:
        //     return {
        //         ...state,
        //         model: {
        //             ...state.model,
        //             softwareSystems: state.model.softwareSystems.map(softwareSystem => {
        //                 if (softwareSystem.identifier === action.payload.softwareSystemIdentifier) {
        //                     return {
        //                         ...softwareSystem,
        //                         containers: softwareSystem.containers.map(container => {
        //                             if (container.identifier === action.payload.containerIdentifier) {
        //                                 return {
        //                                     ...container,
        //                                     components: [...container.components, action.payload.component]
        //                                 };
        //                             }
        //                             return container;
        //                         })
        //                     };
        //                 }
        //                 return softwareSystem;
        //             }),
        //             relationships: [...state.model.relationships, action.payload.relationship]
        //         },
        //         views: {
        //             ...state.views,
        //             components: state.views.components.map(componentView => 
        //                 componentView.identifier === action.payload.viewIdentifier 
        //                     ? {
        //                         ...componentView,
        //                         include: [...componentView.include, action.payload.component.identifier]
        //                     }
        //                     : componentView
        //             )
        //         }
        //     };
        default:
            return state;
    }
}
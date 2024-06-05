import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { WorkspaceAction, ActionType } from "@workspace/core";
import { Workspace as YWorkspace } from "@structurizr/y-workspace";
import { Reducer } from "react";
import * as Y from "yjs";

export const createCollaborativeWorkspaceReducer = (document: Y.Doc): Reducer<IWorkspaceSnapshot, WorkspaceAction> => {
    const yworkspace = new YWorkspace(document);

    const workspaceReducer: Reducer<IWorkspaceSnapshot, WorkspaceAction> = (state, action) => {
        switch (action.type) {
            case ActionType.ADD_MODEL_PERSON:
                yworkspace.model
                    .addPerson()
                    .fromSnapshot(action.payload.person);
                break;
            case ActionType.ADD_MODEL_SOFTWARE_SYSTEM:
                yworkspace.model
                    .addSoftwareSystem()
                    .fromSnapshot(action.payload.softwareSystem);
                break;
            case ActionType.ADD_MODEL_CONTAINER:
                yworkspace.model.softwareSystems
                    .find(softwareSystem => softwareSystem.identifier === action.payload.softwareSystemIdentifier)
                    .addContainer()
                    .fromSnapshot(action.payload.container);
                break;
            // case ActionType.ADD_MODEL_COMPONENT:
            //     yworkspace.model.softwareSystems
            //         .find(softwareSystem => softwareSystem.identifier === action.payload.softwareSystemIdentifier)
            //         .containers
            //         .find(container => container.identifier === action.payload.containerIdentifier)
            //         .addComponent()
            //         .fromSnapshot(action.payload.component);
            //     break;
            
            case ActionType.INCLUDE_SYSTEM_LANDSCAPE_VIEW_PERSON:
                yworkspace.model
                    .addPerson()
                    .fromSnapshot(action.payload.person);
                yworkspace.views.systemLandscape
                    ?.includeElement(action.payload.person.identifier, action.payload.position);
                break;
            case ActionType.INCLUDE_SYSTEM_LANDSCAPE_VIEW_SOFTWARE_SYSTEM:
                yworkspace.model
                    .addSoftwareSystem()
                    .fromSnapshot(action.payload.softwareSystem);
                yworkspace.views.systemLandscape
                    ?.includeElement(action.payload.softwareSystem.identifier, action.payload.position);
                break;
            
            case ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_PERSON:
                yworkspace.model
                    .addPerson()
                    .fromSnapshot(action.payload.person);
                yworkspace.views.systemContexts
                    .find(view => view.key === view.key)
                    ?.includeElement(action.payload.person.identifier, action.payload.position);
                break;
            case ActionType.INCLUDE_SYSTEM_CONTEXT_VIEW_SOFTWARE_SYSTEM:
                yworkspace.model
                    .addSoftwareSystem()
                    .fromSnapshot(action.payload.softwareSystem);
                yworkspace.views.systemContexts
                    .find(view => view.key === view.key)
                    ?.includeElement(action.payload.softwareSystem.identifier, action.payload.position);
                break;
            
            case ActionType.INCLUDE_CONTAINER_VIEW_PERSON:
                yworkspace.model
                    .addPerson()
                    .fromSnapshot(action.payload.person);
                yworkspace.views.containers
                    .find(view => view.key === view.key)
                    ?.includeElement(action.payload.person.identifier, action.payload.position);
                break;
            case ActionType.INCLUDE_CONTAINER_VIEW_SOFTWARE_SYSTEM:
                yworkspace.model
                    .addSoftwareSystem()
                    .fromSnapshot(action.payload.softwareSystem);
                yworkspace.views.containers
                    .find(view => view.key === view.key)
                    ?.includeElement(action.payload.softwareSystem.identifier, action.payload.position);
                break;

            case ActionType.INCLUDE_CONTAINER_VIEW_CONTAINER:
                yworkspace.model
                    .softwareSystems
                    .find(softwareSystem => softwareSystem.identifier === softwareSystem.identifier)
                    .addContainer()
                    .fromSnapshot(action.payload.container);
                yworkspace.views.components
                    .find(view => view.key === view.key)
                    ?.includeElement(action.payload.container.identifier, action.payload.position);
                break;
            default:
                return state;
        }
    }

    return workspaceReducer;
}
import {
    ViewKeys,
    IViewMetadata,
    IWorkspaceMetadata,
    Position,
    ViewType,
    applyMetadata,
    Workspace,
    Identifier,
    IViewDefinition,
    IWorkspace
} from "@structurizr/dsl";
import { useCallback } from "react";
import { useWorkspaceStore } from "../hooks";

export type ViewParams = {
    type: ViewType;
    identifier: Identifier;
}

export const useMetadata = () => {
    const applyElementPosition = (
        workspace: IWorkspace,
        view: ViewParams,
        elementId: string,
        position: Position
    ): IWorkspace => {
        const updateViewMetadata = (view: IViewDefinition, elementId: string, position: Position) => {
            return {
                ...view,
                elements: [
                    ...view.elements.filter(x => x.id !== elementId),
                    { id: elementId, x: position.x, y: position.y }
                ]
            }
        }

        const updateViewMetadataArray = (type: ViewType, views: IViewDefinition[], elementId: string, position: Position) => {
            const emptyView: IViewDefinition = { type, identifier: view.identifier, elements: [], relationships: [] };
            const existingView = views.find(view => view.identifier === view.identifier);
            return [
                ...views.filter(view => view.identifier !== view.identifier),
                updateViewMetadata(existingView ?? emptyView, elementId, position)
            ];
        }

        switch (view.type) {
            case ViewType.SystemLandscape:
                return {
                    ...workspace,
                    views: {
                        ...workspace.views,
                        // systemLandscape: updateViewMetadata(workspace.views.systemLandscape, elementId, position)
                    }
                };
            case ViewType.SystemContext:
                return {
                    ...workspace,
                    views: {
                        ...workspace.views,
                        // systemContexts: updateViewMetadataArray(ViewType.SystemContext, workspace.views.systemContexts, elementId, position)
                    }
                };
            case ViewType.Container:
                return {
                    ...workspace,
                    views: {
                        ...workspace.views,
                        // containers: updateViewMetadataArray(ViewType.Container, workspace.views.containers, elementId, position)
                    }
                };
            case ViewType.Component:
                return {
                    ...workspace,
                    views: {
                        ...workspace.views,
                        // components: updateViewMetadataArray(ViewType.Component, workspace.views.components, elementId, position)
                    }
                };
            // TODO: figure out the environment property
            // case ViewType.Deployment:
            //     return {
            //         ...workspace,
            //         views: {
            //             ...workspace.views,
            //             deployments: updateViewMetadataArray(ViewType.Deployment, workspace.views.deployments, elementId, position)
            //         }
            //     };
        }
    };

    const setMetadata = useCallback((metadata: IWorkspaceMetadata) => {
        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: applyMetadata(state.workspace, metadata)
        }));
    }, []);

    const setElementPosition = useCallback((view: ViewParams, elementId: string, position: Position) => {
        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: applyElementPosition(state.workspace, view, elementId, position)
        }))
    }, []);

    return {
        setMetadata,
        setElementPosition
    }
}
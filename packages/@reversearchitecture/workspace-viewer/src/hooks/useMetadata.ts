import {
    ViewKeys,
    IViewMetadata,
    IWorkspaceMetadata,
    Position,
    ViewType
} from "@structurizr/dsl";
import { useCallback } from "react";

export const useMetadata = () => {    
    const addViewLayout = useCallback((
        metadata: IWorkspaceMetadata,
        view: ViewKeys,
        viewMetadata: IViewMetadata
    ) => {
        switch (view.type) {
            case ViewType.SystemLandscape:
                return {
                    ...metadata,
                    views: {
                        ...metadata.views,
                        systemLandscape: viewMetadata
                    }
                };
            case ViewType.SystemContext:
                return {
                    ...metadata,
                    views: {
                        ...metadata.views,
                        systemContexts: [
                            ...metadata.views.systemContexts,
                            viewMetadata
                        ]
                    }
                };
            case ViewType.Container:
                return {
                    ...metadata,
                    views: {
                        ...metadata.views,
                        containers: [
                            ...metadata.views.containers,
                            viewMetadata
                        ]
                    }
                };
            case ViewType.Component:
                return {
                    ...metadata,
                    views: {
                        ...metadata.views,
                        components: [
                            ...metadata.views.components,
                            viewMetadata
                        ]
                    }
                };
            case ViewType.Deployment:
                return {
                    ...metadata,
                    views: {
                        ...metadata.views,
                        deployments: [
                            ...metadata.views.deployments,
                            viewMetadata
                        ]
                    }
                };
        }
    }, []);

    const applyElementPosition = useCallback((
        metadata: IWorkspaceMetadata,
        view: ViewKeys,
        elementId: string,
        position: Position
    ) => {
        const emptyMetadata = {
            name: "",
            lastModifiedDate: new Date(),
            views: {
                systemLandscape: undefined,
                systemContexts: [],
                containers: [],
                components: [],
                deployments: []
            }
        };
        metadata = (metadata ?? emptyMetadata);
        
        const updateViewMetadata = (metadata: IViewMetadata, elementId: string, position: Position) => {
            return {
                ...metadata,
                elements: [
                    ...metadata.elements.filter(x => x.id !== elementId),
                    { id: elementId, x: position.x, y: position.y }
                ]
            }
        }

        const updateViewMetadataArray = (metadata: IViewMetadata[], elementId: string, position: Position) => {
            const emptySystemContext: IViewMetadata = { identifier: view.identifier, elements: [], relationships: [] };
            const systemContext = metadata.find(systemContext => systemContext.identifier === view.identifier);
            return [
                ...metadata.filter(systemContext => systemContext.identifier !== view.identifier),
                updateViewMetadata(systemContext ?? emptySystemContext, elementId, position)
            ];
        }

        switch (view.type) {
            case ViewType.SystemLandscape:
                return {
                    ...metadata,
                    views: {
                        ...metadata.views,
                        systemLandscape: updateViewMetadata(metadata.views.systemLandscape, elementId, position)
                    }
                };
            case ViewType.SystemContext:
                return {
                    ...metadata,
                    views: {
                        ...metadata.views,
                        systemContexts: updateViewMetadataArray(metadata.views.systemContexts, elementId, position)
                    }
                };
            case ViewType.Container:
                return {
                    ...metadata,
                    views: {
                        ...metadata.views,
                        containers: updateViewMetadataArray(metadata.views.containers, elementId, position)
                    }
                };
            case ViewType.Component:
                return {
                    ...metadata,
                    views: {
                        ...metadata.views,
                        components: updateViewMetadataArray(metadata.views.components, elementId, position)
                    }
                };
            case ViewType.Deployment:
                return {
                    ...metadata,
                    views: {
                        ...metadata.views,
                        deployments: updateViewMetadataArray(metadata.views.deployments, elementId, position)
                    }
                };
            }
    }, []);

    return {
        addViewLayout,
        applyElementPosition
    }
}
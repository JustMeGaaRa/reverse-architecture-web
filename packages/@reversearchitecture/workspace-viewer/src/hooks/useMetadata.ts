import {
    IView,
    IVIewMetadata,
    Position,
    ViewType
} from "@structurizr/dsl";
import { useCallback } from "react";
import { useMetadataStore } from "../store";

export const useMetadata = () => {
    const { metadata, setMetadata } = useMetadataStore();
    
    const addViewLayout = useCallback((
        view: Pick<IView, "identifier" | "type">,
        viewMetadata: IVIewMetadata
    ) => {
        switch (view.type) {
            case ViewType.SystemLandscape:
                setMetadata({
                    ...metadata,
                    views: {
                        ...metadata.views,
                        systemLandscape: viewMetadata
                    }
                });
                break;
            case ViewType.SystemContext:
                setMetadata({
                    ...metadata,
                    views: {
                        ...metadata.views,
                        systemContexts: [
                            ...metadata.views.systemContexts,
                            viewMetadata
                        ]
                    }
                });
                break;
            case ViewType.Container:
                setMetadata({
                    ...metadata,
                    views: {
                        ...metadata.views,
                        containers: [
                            ...metadata.views.containers,
                            viewMetadata
                        ]
                    }
                });
                break;
            case ViewType.Component:
                setMetadata({
                    ...metadata,
                    views: {
                        ...metadata.views,
                        components: [
                            ...metadata.views.components,
                            viewMetadata
                        ]
                    }
                });
                break;
            case ViewType.Deployment:
                setMetadata({
                    ...metadata,
                    views: {
                        ...metadata.views,
                        deployments: [
                            ...metadata.views.deployments,
                            viewMetadata
                        ]
                    }
                });
                break;
        }
    }, [metadata, setMetadata]);

    const setViewElementPosition = useCallback((
        view: Pick<IView, "identifier" | "type">,
        elementId: string,
        position: Position
    ) => {
        const updateViewMetadata = (metadata: IVIewMetadata, elementId: string, position: Position) => {
            return {
                ...metadata,
                elements: [
                    ...metadata.elements,
                    {
                        id: elementId,
                        x: position.x,
                        y: position.y
                    }
                ]
            }
        }

        const updateViewMetadataArray = (metadata: IVIewMetadata[], elementId: string, position: Position) => {
            return metadata.map(systemContext => {
                return systemContext.identifier === view.identifier
                    ? updateViewMetadata(systemContext, elementId, position)
                    : systemContext;
            })
        }

        switch (view.type) {
            case ViewType.SystemLandscape:
                setMetadata({
                    ...metadata,
                    views: {
                        ...metadata.views,
                        systemLandscape: updateViewMetadata(metadata.views.systemLandscape, elementId, position)
                    }
                });
                break;
            case ViewType.SystemContext:
                setMetadata({
                    ...metadata,
                    views: {
                        ...metadata.views,
                        systemContexts: updateViewMetadataArray(metadata.views.systemContexts, elementId, position)
                    }
                });
                break;
            case ViewType.Container:
                setMetadata({
                    ...metadata,
                    views: {
                        ...metadata.views,
                        containers: updateViewMetadataArray(metadata.views.containers, elementId, position)
                    }
                });
                break;
            case ViewType.Component:
                setMetadata({
                    ...metadata,
                    views: {
                        ...metadata.views,
                        components: updateViewMetadataArray(metadata.views.components, elementId, position)
                    }
                });
                break;
            }
    }, [metadata, setMetadata]);

    return {
        metadata,
        setMetadata,
        addViewLayout,
        setViewElementPosition
    }
}
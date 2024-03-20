import { Position } from "@structurizr/dsl";
import { useContext, useCallback } from "react";
import { ModelContext, ThemesContext, ViewMetadataContext, WorkspaceContext } from "../contexts";

export const useWorkspace = () => {
    return useContext(WorkspaceContext);
}

export const useThemes = () => {
    return useContext(ThemesContext);
}

export const useModel = () => {
    const { model, metadata, setModel, setMetadata } = useContext(ModelContext);
    
    const getElementMetadata = useCallback((identifier: string) => {
        return metadata.elements.find(e => e.id === identifier);
    }, [metadata.elements]);

    const getRelationshipMetadata = useCallback((identifier: string) => {
        return metadata.relationships.find(r => r.id === identifier);
    }, [metadata.relationships]);

    return {
        model,
        metadata,
        setModel,
        setMetadata,
        getElementMetadata,
        getRelationshipMetadata
    }
}

export const useViewMetadata = () => {
    const { metadata, setMetadata } = useContext(ViewMetadataContext);

    const getElement = useCallback((identifier: string) => {
        return metadata.elements.find(e => e.id === identifier);
    }, [metadata.elements]);

    const setElement = useCallback((identifier: string, position: Position) => {
        setMetadata(metadata => ({
            ...metadata,
            elements: [
                ...metadata.elements.filter(e => e.id !== identifier),
                {
                    id: identifier,
                    x: position.x,
                    y: position.y
                }
            ]
        }));
    }, [setMetadata]);

    const deleteElement = useCallback((identifier: string) => {
        setMetadata(metadata => ({
            ...metadata,
            elements: metadata.elements.filter(e => e.id !== identifier)
        }));
    }, [setMetadata]);

    const getRelationship = useCallback((identifier: string) => {
        return metadata.relationships.find(r => r.id === identifier);
    }, [metadata.relationships]);

    const setRelationship = useCallback((identifier: string, position: Position) => {
        setMetadata(metadata => ({
            ...metadata,
            relationships: [
                ...metadata.relationships.filter(r => r.id !== identifier),
                {
                    id: identifier,
                    x: position.x,
                    y: position.y
                }
            ]
        }));
    }, [setMetadata]);

    const deleteRelationship = useCallback((identifier: string) => {
        setMetadata(metadata => ({
            ...metadata,
            relationships: metadata.relationships.filter(r => r.id !== identifier)
        }));
    }, [setMetadata]);

    return {
        getElement,
        setElement,
        deleteElement,
        getRelationship,
        setRelationship,
        deleteRelationship
    }
}
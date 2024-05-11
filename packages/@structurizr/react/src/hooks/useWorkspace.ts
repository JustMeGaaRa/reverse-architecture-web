import { useContext, useCallback } from "react";
import { ElementContext, ModelContext, ThemesContext, ViewMetadataContext, WorkspaceContext } from "../contexts";

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
    const { metadata } = useContext(ViewMetadataContext);

    const getElement = useCallback((identifier: string) => {
        return metadata.elements.find(e => e.id === identifier);
    }, [metadata.elements]);

    const getRelationship = useCallback((identifier: string) => {
        return metadata.relationships.find(r => r.id === identifier);
    }, [metadata.relationships]);

    return {
        getElement,
        getRelationship,
    }
}

export const useElement = () => {
    return useContext(ElementContext);
}
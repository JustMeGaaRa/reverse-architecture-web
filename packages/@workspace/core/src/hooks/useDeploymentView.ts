import { Identifier, Position } from "@structurizr/dsl";
import { useCallback } from "react";

export const useDeploymentView = (viewIdentifier: Identifier, environment: string) => {
    
    const addDeploymentNode = useCallback((position: Position, parentNodeIdentifier?: Identifier) => {

    }, []);
    
    const addInfrastructureNode = useCallback((position: Position, parentNodeIdentifier: Identifier) => {

    }, []);
    
    const addSoftwareSystemInstance = useCallback((position: Position, parentNodeIdentifier: Identifier) => {

    }, []);
    
    const addContainerInstance = useCallback((position: Position, parentNodeIdentifier: Identifier) => {

    }, []);
    
    const addRelationship = useCallback((sourceIdentifier: Identifier, targetIdentifier: Identifier) => {

    }, []);

    const setElementPosition = useCallback((elementId: string, position: Position) => {

    }, []);

    return {
        addDeploymentNode,
        addInfrastructureNode,
        addSoftwareSystemInstance,
        addContainerInstance,
        addRelationship,
        setElementPosition
    }
}
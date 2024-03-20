import { useReactFlow } from "@reactflow/core";
import {
    Group,
    Identifier,
    Person,
    Position,
    Relationship,
    SoftwareSystem
} from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { useCallback } from "react";
import {
    getNodeFromElement,
    getEdgeFromRelationship
} from "../utils";

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
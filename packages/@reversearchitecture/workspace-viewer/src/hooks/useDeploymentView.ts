import { useReactFlow } from "@reactflow/core";
import {
    Group,
    Identifier,
    Person,
    Position,
    Relationship,
    SoftwareSystem,
    Workspace
} from "@structurizr/dsl";
import { useCallback } from "react";
import { v4 } from "uuid";
import { useWorkspaceStore } from "../hooks";
import { getNodeFromElement, getEdgeFromRelationship } from "../utils";

export const useDeploymentView = (viewIdentifier: Identifier, environment: string) => {
    const { workspace } = useWorkspaceStore();
    
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

    return {
        addDeploymentNode,
        addInfrastructureNode,
        addSoftwareSystemInstance,
        addContainerInstance,
        addRelationship
    }
}
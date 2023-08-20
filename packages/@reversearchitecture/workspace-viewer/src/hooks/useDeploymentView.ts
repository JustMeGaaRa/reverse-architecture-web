import { useReactFlow } from "@reactflow/core";
import {
    Group,
    Identifier,
    Person,
    Position,
    Relationship,
    SoftwareSystem,
    Workspace,
    WorkspaceMetadata
} from "@structurizr/dsl";
import { useCallback } from "react";
import { v4 } from "uuid";
import { useWorkspaceMetadataStore, useWorkspaceStore } from "../hooks";
import { getNodeFromElement, getEdgeFromRelationship } from "../utils";

export const useDeploymentView = (viewIdentifier: Identifier, environment: string) => {
    const { workspace } = useWorkspaceStore();
    const { metadata } = useWorkspaceMetadataStore();
    
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
        const builder = new WorkspaceMetadata(metadata);
        builder.views.deployments
            .filter(x => x.identifier === viewIdentifier && x?.["environment"] === environment)
            .forEach(x => x.setElementPosition(elementId, position));

        useWorkspaceMetadataStore.setState(state => ({
            ...state,
            metadata: builder.toObject()
        }));
    }, [viewIdentifier, environment, metadata]);

    return {
        addDeploymentNode,
        addInfrastructureNode,
        addSoftwareSystemInstance,
        addContainerInstance,
        addRelationship,
        setElementPosition
    }
}
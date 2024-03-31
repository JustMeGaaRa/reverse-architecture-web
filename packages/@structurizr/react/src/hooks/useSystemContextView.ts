import { useReactFlow } from "@reactflow/core";
import {
    ElementType,
    getDefaultElement,
    Group,
    Identifier,
    Person,
    Position,
    Relationship,
    SoftwareSystem,
    Workspace
} from "@structurizr/dsl";
import { useCallback } from "react";
import { createReactFlowViewNode, createReactFlowViewEdge } from "../utils";
import { useWorkspace } from "./useWorkspace";

export const useSystemContextView = (systemSoftwareIdentifier: Identifier) => {
    const { setWorkspace } = useWorkspace();
    const { setNodes, setEdges } = useReactFlow();
    
    const addSoftwareSystem = useCallback((position: Position, groupId?: Identifier) => {
        const softwareSystem = getDefaultElement(ElementType.SoftwareSystem) as SoftwareSystem;
        
        const node = createReactFlowViewNode({
            element: softwareSystem,
            position,
            parentId: groupId
        });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model.addSoftwareSystem(softwareSystem, groupId);
            builder.views.systemContexts
                .find(x => x.identifier === systemSoftwareIdentifier)
                ?.addSoftwareSystem(softwareSystem, position);
            return builder.toSnapshot();
        });

        return softwareSystem;
    }, [systemSoftwareIdentifier, setNodes, setWorkspace]);
    
    const addPerson = useCallback((position: Position, groupId?: Identifier) => {
        const person = getDefaultElement(ElementType.Person) as Person;

        const node = createReactFlowViewNode({
            element: person,
            position,
            parentId: groupId
        });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model.addPerson(person, groupId);
            builder.views.systemContexts
                .find(x => x.identifier === systemSoftwareIdentifier)
                ?.addPerson(person, position);
            return builder.toSnapshot();
        });

        return person;
    }, [systemSoftwareIdentifier, setNodes, setWorkspace]);

    const addGroup = useCallback((position: Position) => {
        const group = getDefaultElement(ElementType.Group) as Group;

        const node = createReactFlowViewNode({
            element: group,
            position,
            size: {
                height: 300,
                width: 300,
            }
        });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
        
            const builder = new Workspace(workspace);
            builder.model.addGroup(group);
            builder.views.systemContexts
                .find(x => x.identifier === systemSoftwareIdentifier)
                ?.addGroup(group, position);
            return builder.toSnapshot();
        });

        return group;
    }, [systemSoftwareIdentifier, setNodes, setWorkspace]);
    
    const addRelationship = useCallback((sourceIdentifier: Identifier, targetIdentifier: Identifier) => {
        const relationship = new Relationship({
            sourceIdentifier,
            targetIdentifier
        });

        const edge = createReactFlowViewEdge({ relationship });
        setEdges(edges => [...edges, edge]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model.addRelationship(relationship);
            return builder.toSnapshot();
        });

        return relationship;
    }, [setEdges, setWorkspace]);

    const setElementPosition = useCallback((elementId: string, position: Position) => {
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.views.systemContexts
                .filter(x => x.identifier === systemSoftwareIdentifier)
                .forEach(x => x.setElementPosition(elementId, position));
            return builder.toSnapshot();
        });
    }, [systemSoftwareIdentifier, setWorkspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addGroup,
        addRelationship,
        setElementPosition
    }
}
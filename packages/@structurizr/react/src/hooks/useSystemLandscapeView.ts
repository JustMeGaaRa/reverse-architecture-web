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

export const useSystemLandscapeView = () => {
    const { setWorkspace } = useWorkspace();
    const { setNodes, setEdges } = useReactFlow();
    
    const addSoftwareSystem = useCallback((position: Position, groupId?: Identifier) => {
        const softwareSystem = getDefaultElement(ElementType.SoftwareSystem) as SoftwareSystem;

        const node = createReactFlowViewNode({
            element: softwareSystem,
            position,
            parentId: groupId,
        });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            // TODO: refactor and adapt to the collection of views
            builder?.views.systemLandscape?.addSoftwareSystem(softwareSystem, position);
            builder?.model.addSoftwareSystem(softwareSystem, groupId);
            return builder.toSnapshot()
        });

        return softwareSystem;
    }, [setNodes, setWorkspace]);
    
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
            builder?.model.addPerson(person);
            builder?.views.systemLandscape?.addPerson(person, position);
            return builder.toSnapshot();
        });

        return person;
    }, [setNodes, setWorkspace]);

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
            builder?.model.addGroup(group);
            builder?.views.systemLandscape?.addGroup(group, position);
            return builder.toSnapshot();
        });

        return group;
    }, [setNodes, setWorkspace]);
    
    const addRelationship = useCallback((sourceIdentifier: Identifier, targetIdentifier: Identifier) => {
        const relationship = new Relationship({
            sourceIdentifier,
            targetIdentifier
        })

        const edge = createReactFlowViewEdge({ relationship });
        setEdges(edges => [...edges, edge]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder?.model.addRelationship(relationship);
            return builder.toSnapshot();
        });

        return relationship;
    }, [setEdges, setWorkspace]);

    const setElementPosition = useCallback((elementId: string, position: Position) => {
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.views.systemLandscape?.setElementPosition(elementId, position);
            return builder.toSnapshot();
        });
    }, [setWorkspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addGroup,
        addRelationship,
        setElementPosition
    }
}
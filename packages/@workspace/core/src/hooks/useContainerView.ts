import { useReactFlow } from "@reactflow/core";
import {
    Container,
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
import { createReactFlowViewEdge, createReactFlowViewNode } from "../utils";
import { useWorkspace } from "./useWorkspace";

export const useContainerView = (softwareSystemIdentifier: Identifier) => {
    const { setWorkspace } = useWorkspace();
    const { setNodes, setEdges } = useReactFlow();
    
    // NOTE: the person added can either be an existing one or a new one
    // The existing person is included in the view, while the new one is also added to the model
    const addPerson = useCallback((position: Position) => {
        const person = getDefaultElement(ElementType.Person) as Person;
        
        // NOTE: in this context the person can only be added outside of container
        const node = createReactFlowViewNode({ element: person, position });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model.addPerson(person);
            builder.views.containers
                .find(x => x.softwareSystemIdentifier === softwareSystemIdentifier)
                ?.addPerson(person, position);
            return builder.toSnapshot();
        });

        return person;
    }, [softwareSystemIdentifier, setNodes, setWorkspace]);
    
    // NOTE: the software system added can either be an existing one or a new one
    // The existing system is included in the view, while the new one is also added to the model
    const addSoftwareSystem = useCallback((position: Position) => {
        const softwareSystem = getDefaultElement(ElementType.SoftwareSystem) as SoftwareSystem;
        
        // NOTE: in this context the software system can only be added outside of container
        const node = createReactFlowViewNode({ element: softwareSystem, position });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model.addSoftwareSystem(softwareSystem);
            builder.views.containers
                .find(x => x.softwareSystemIdentifier === softwareSystemIdentifier)
                ?.addSoftwareSystem(softwareSystem, position);
            return builder.toSnapshot();
        });

        return softwareSystem;
    }, [softwareSystemIdentifier, setNodes, setWorkspace]);
    
    const addContainer = useCallback((position: Position, groupId?: Identifier) => {
        const container = getDefaultElement(ElementType.Container) as Container;
        
        // NOTE: in this context the container can only be added as a child of the software system or a group
        const node = createReactFlowViewNode({
            element: container,
            position,
            parentId: groupId ?? softwareSystemIdentifier
        });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model
                .findSoftwareSystem(softwareSystemIdentifier)
                .addContainer(container, groupId);
            builder.views.containers
                .find(x => x.softwareSystemIdentifier === softwareSystemIdentifier)
                ?.addContainer(container, position);
            return builder.toSnapshot();
        });
        return container;
    }, [softwareSystemIdentifier, setNodes, setWorkspace]);
    
    const addGroup = useCallback((position: Position) => {
        const group = getDefaultElement(ElementType.Group) as Group;
        
        // NOTE: in this context the group can only be added as a child of the software system
        const node = createReactFlowViewNode({
            element: group,
            position,
            size: {
                height: 300,
                width: 300,
            },
            parentId: softwareSystemIdentifier
        });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.views.containers
                .find(x => x.softwareSystemIdentifier === softwareSystemIdentifier)
                ?.addGroup(group, position);
                builder.model
                .findSoftwareSystem(softwareSystemIdentifier)
                .addGroup(group);
            return builder.toSnapshot();
        });
        
        return group;
    }, [softwareSystemIdentifier, setNodes, setWorkspace]);
    
    const addRelationship = useCallback((sourceIdentifier: Identifier, targetIdentifier: Identifier) => {
        const relationship = new Relationship({
            sourceIdentifier,
            targetIdentifier
        })

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
            builder.views.containers
                .filter(x => x.softwareSystemIdentifier === softwareSystemIdentifier)
                .forEach(x => x.setElementPosition(elementId, position));
            return builder.toSnapshot();
        });
    }, [softwareSystemIdentifier, setWorkspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addContainer,
        addGroup,
        addRelationship,
        setElementPosition
    }
}
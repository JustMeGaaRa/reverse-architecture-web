import { useReactFlow } from "@reactflow/core";
import {
    Component,
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

export const useComponentView = (containerIdentifier: Identifier) => {
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
            builder.views.components
                .find(x => x.identifier === containerIdentifier)
                ?.addPerson(person, position);
            return builder.toSnapshot();
        });

        return person;
    }, [containerIdentifier, setNodes, setWorkspace]);
    
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
            builder.views.components
                .find(x => x.identifier === containerIdentifier)
                ?.addSoftwareSystem(softwareSystem, position);
            return builder.toSnapshot();
        });

        return softwareSystem;
    }, [containerIdentifier, setNodes, setWorkspace]);
    
    // NOTE: the container added can either be an existing one or a new one
    // The existing container is included in the view, while the new one is also added to the model
    const addContainer = useCallback((position: Position) => {
        const container = getDefaultElement(ElementType.Container) as Container;
        
        // NOTE: in this context the container can only be added outside of container
        const node = createReactFlowViewNode({ element: container, position });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model
                .findContainerParent(containerIdentifier)
                .addContainer(container);
            builder.views.components
                .find(x => x.identifier === containerIdentifier)
                ?.addContainer(container, position);
            return builder.toSnapshot();
        });

        return container;
    }, [containerIdentifier, setNodes, setWorkspace]);
    
    const addComponent = useCallback((position: Position, groupId?: Identifier) => {
        const component = getDefaultElement(ElementType.Component) as Component;
        
        // NOTE: in this context the component can only be added as a child of the container or a group
        const node = createReactFlowViewNode({
            element: component,
            position,
            parentId: groupId ?? containerIdentifier
        });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model
                .findContainer(containerIdentifier)
                .addComponent(component, groupId);
            builder.views.components
                .find(x => x.identifier === containerIdentifier)
                ?.addComponent(component, position);
            return builder.toSnapshot();
        });

        return component;
    }, [containerIdentifier, setNodes, setWorkspace]);
    
    const addGroup = useCallback((position: Position) => {
        const group = getDefaultElement(ElementType.Group) as Group;

        // NOTE: in this context the group can only be added as a child of the container
        const node = createReactFlowViewNode({
            element: group,
            position,
            size: {
                height: 300,
                width: 300,
            },
            parentId: containerIdentifier
        });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model
                .findContainer(containerIdentifier)
                .addGroup(group);
            builder.views.components
                .find(x => x.identifier === containerIdentifier)
                ?.addGroup(group, position);
            return builder.toSnapshot();
        });

        return group;
    }, [containerIdentifier, setNodes, setWorkspace]);
    
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
            builder.views.components
                .filter(x => x.identifier === containerIdentifier)
                .forEach(x => x.setElementPosition(elementId, position));
            return builder.toSnapshot();
        });
    }, [containerIdentifier, setWorkspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addContainer,
        addComponent,
        addGroup,
        addRelationship,
        setElementPosition
    }
}
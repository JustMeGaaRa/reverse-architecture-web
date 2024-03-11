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
import { useWorkspace } from "@workspace/core";
import { useCallback } from "react";
import {
    getNodeFromElement,
    getEdgeFromRelationship
} from "../utils";

export const useComponentView = (containerIdentifier: Identifier) => {
    const { workspace, setWorkspace } = useWorkspace();
    const { setNodes, setEdges } = useReactFlow();
    
    // NOTE: the person added can either be an existing one or a new one
    // The existing person is included in the view, while the new one is also added to the model
    const addPerson = useCallback((position: Position) => {
        const person = getDefaultElement(ElementType.Person) as Person;

        // NOTE: in this context the person can only be added outside of container
        const node = getNodeFromElement({
            element: person,
            position,
            styles: workspace.views.configuration.styles
        });
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
    }, [containerIdentifier, workspace, setNodes, setWorkspace]);
    
    // NOTE: the software system added can either be an existing one or a new one
    // The existing system is included in the view, while the new one is also added to the model
    const addSoftwareSystem = useCallback((position: Position) => {
        const softwareSystem = getDefaultElement(ElementType.SoftwareSystem) as SoftwareSystem;

        // NOTE: in this context the software system can only be added outside of container
        const node = getNodeFromElement({
            element: softwareSystem,
            position,
            styles: workspace.views.configuration.styles
        });
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
    }, [containerIdentifier, workspace, setNodes, setWorkspace]);
    
    // NOTE: the container added can either be an existing one or a new one
    // The existing container is included in the view, while the new one is also added to the model
    const addContainer = useCallback((position: Position) => {
        const container = getDefaultElement(ElementType.Container) as Container;
        
        // NOTE: in this context the container can only be added outside of container
        const node = getNodeFromElement({
            element: container,
            position,
            styles: workspace.views.configuration.styles
        });
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
    }, [containerIdentifier, workspace, setNodes, setWorkspace]);
    
    const addComponent = useCallback((position: Position, groupId?: Identifier) => {
        const component = getDefaultElement(ElementType.Component) as Component;
        
        // NOTE: in this context the component can only be added as a child of the container or a group
        const node = getNodeFromElement({
            element: component,
            position,
            parentId: groupId ?? containerIdentifier,
            styles: workspace.views.configuration.styles
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
    }, [containerIdentifier, workspace, setNodes, setWorkspace]);
    
    const addGroup = useCallback((position: Position) => {
        const group = getDefaultElement(ElementType.Group) as Group;

        // NOTE: in this context the group can only be added as a child of the container
        const node = getNodeFromElement({
            element: group,
            position,
            size: {
                height: 300,
                width: 300,
            },
            parentId: containerIdentifier,
            styles: workspace.views.configuration.styles
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
    }, [containerIdentifier, workspace, setNodes, setWorkspace]);
    
    const addRelationship = useCallback((sourceIdentifier: Identifier, targetIdentifier: Identifier) => {
        const relationship = new Relationship({
            sourceIdentifier,
            targetIdentifier
        })

        const edge = getEdgeFromRelationship({
            relationship,
            styles: workspace.views.configuration.styles
        });
        setEdges(edges => [...edges, edge]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model.addRelationship(relationship);
            return builder.toSnapshot();
        });

        return relationship;
    }, [workspace, setEdges, setWorkspace]);

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
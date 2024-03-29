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
import { useWorkspace } from "@workspace/core";
import { useCallback } from "react";
import { v4 } from "uuid";
import {
    getNodeFromElement,
    getEdgeFromRelationship
} from "../utils";

export const useContainerView = (systemSoftwareIdentifier: Identifier) => {
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
            builder.views.containers
                .find(x => x.identifier === systemSoftwareIdentifier)
                ?.addPerson(person, position);
            return builder.toObject();
        });

        return person;
    }, [systemSoftwareIdentifier, workspace, setNodes, setWorkspace]);
    
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
            builder.views.containers
                .find(x => x.identifier === systemSoftwareIdentifier)
                ?.addSoftwareSystem(softwareSystem, position);
            return builder.toObject();
        });

        return softwareSystem;
    }, [systemSoftwareIdentifier, workspace, setNodes, setWorkspace]);
    
    const addContainer = useCallback((position: Position, groupId?: Identifier) => {
        const container = getDefaultElement(ElementType.Container) as Container;
        
        // NOTE: in this context the container can only be added as a child of the software system or a group
        const node = getNodeFromElement({
            element: container,
            position,
            parentId: groupId ?? systemSoftwareIdentifier,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model
                .findSoftwareSystem(systemSoftwareIdentifier)
                .addContainer(container, groupId);
            builder.views.containers
                .find(x => x.identifier === systemSoftwareIdentifier)
                ?.addContainer(container, position);
            return builder.toObject();
        });
        return container;
    }, [systemSoftwareIdentifier, workspace, setNodes, setWorkspace]);
    
    const addGroup = useCallback((position: Position) => {
        const group = getDefaultElement(ElementType.Group) as Group;
        
        // NOTE: in this context the group can only be added as a child of the software system
        const node = getNodeFromElement({
            element: group,
            position,
            size: {
                height: 300,
                width: 300,
            },
            parentId: systemSoftwareIdentifier,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.views.containers
                .find(x => x.identifier === systemSoftwareIdentifier)
                ?.addGroup(group, position);
                builder.model
                .findSoftwareSystem(systemSoftwareIdentifier)
                .addGroup(group);
            return builder.toObject();
        });
        
        return group;
    }, [systemSoftwareIdentifier, workspace, setNodes, setWorkspace]);
    
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
            return builder.toObject();
        });

        return relationship;
    }, [workspace, setEdges, setWorkspace]);

    const setElementPosition = useCallback((elementId: string, position: Position) => {
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.views.containers
                .filter(x => x.identifier === systemSoftwareIdentifier)
                .forEach(x => x.setElementPosition(elementId, position));
            return builder.toObject();
        });
    }, [systemSoftwareIdentifier, setWorkspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addContainer,
        addGroup,
        addRelationship,
        setElementPosition
    }
}
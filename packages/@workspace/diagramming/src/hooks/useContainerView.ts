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
    SoftwareSystem
} from "@structurizr/dsl";
import { useWorkspace } from "@workspace/core";
import { useCallback } from "react";
import { v4 } from "uuid";
import {
    getNodeFromElement,
    getEdgeFromRelationship
} from "../utils";

export const useContainerView = (systemSoftwareIdentifier: Identifier) => {
    const { workspace } = useWorkspace();
    const { setNodes, setEdges } = useReactFlow();
    
    // NOTE: the person added can either be an existing one or a new one
    // The existing person is included in the view, while the new one is also added to the model
    const addPerson = useCallback((position: Position) => {
        const person = getDefaultElement(ElementType.Person) as Person;
        
        workspace.model.addPerson(person);
        workspace.views.containers
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addPerson(person, position);
        
        // NOTE: in this context the person can only be added outside of container
        const node = getNodeFromElement({
            element: person,
            position,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [systemSoftwareIdentifier, setNodes, workspace]);
    
    // NOTE: the software system added can either be an existing one or a new one
    // The existing system is included in the view, while the new one is also added to the model
    const addSoftwareSystem = useCallback((position: Position) => {
        const softwareSystem = getDefaultElement(ElementType.SoftwareSystem) as SoftwareSystem;

        workspace.model.addSoftwareSystem(softwareSystem);
        workspace.views.containers
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addSoftwareSystem(softwareSystem, position);
        
        // NOTE: in this context the software system can only be added outside of container
        const node = getNodeFromElement({
            element: softwareSystem,
            position,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [systemSoftwareIdentifier, setNodes, workspace]);
    
    const addContainer = useCallback((position: Position, groupId?: Identifier) => {
        const container = getDefaultElement(ElementType.Container) as Container;
        
        workspace.model
            .findSoftwareSystem(systemSoftwareIdentifier)
            .addContainer(container, groupId);
        workspace.views.containers
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addContainer(container, position);
        
        // NOTE: in this context the container can only be added as a child of the software system or a group
        const node = getNodeFromElement({
            element: container,
            position,
            parentId: groupId ?? systemSoftwareIdentifier,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [systemSoftwareIdentifier, workspace, setNodes]);
    
    const addGroup = useCallback((position: Position) => {
        const group = getDefaultElement(ElementType.Group) as Group;
        
        workspace.views.containers
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addGroup(group, position);
        workspace.model
            .findSoftwareSystem(systemSoftwareIdentifier)
            .addGroup(group);
        
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
        
        return workspace;
    }, [systemSoftwareIdentifier, workspace, setNodes]);
    
    const addRelationship = useCallback((sourceIdentifier: Identifier, targetIdentifier: Identifier) => {
        const relationship = new Relationship({
            sourceIdentifier,
            targetIdentifier
        })
        
        workspace.model.addRelationship(relationship);

        const edge = getEdgeFromRelationship({
            relationship,
            styles: workspace.views.configuration.styles
        });
        setEdges(edges => [...edges, edge]);

        return workspace;
    }, [workspace, setEdges]);

    const setElementPosition = useCallback((elementId: string, position: Position) => {
        workspace.views.containers
            .filter(x => x.identifier === systemSoftwareIdentifier)
            .forEach(x => x.setElementPosition(elementId, position));

        return workspace;
    }, [systemSoftwareIdentifier, workspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addContainer,
        addGroup,
        addRelationship,
        setElementPosition
    }
}
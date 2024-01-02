import { useReactFlow } from "@reactflow/core";
import {
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
import {
    getNodeFromElement,
    getEdgeFromRelationship
} from "../utils";

export const useSystemLandscapeView = () => {
    const { workspace } = useWorkspace();
    const { setNodes, setEdges } = useReactFlow();
    
    const addSoftwareSystem = useCallback((position: Position, groupId?: Identifier) => {
        const softwareSystem = getDefaultElement(ElementType.SoftwareSystem) as SoftwareSystem;
        
        workspace?.views.systemLandscape?.addSoftwareSystem(softwareSystem, position);
        workspace?.model.addSoftwareSystem(softwareSystem, groupId);
        
        const node = getNodeFromElement({
            element: softwareSystem,
            position,
            parentId: groupId,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);
    
    const addPerson = useCallback((position: Position, groupId?: Identifier) => {
        const person = getDefaultElement(ElementType.Person) as Person;
        
        workspace?.model.addPerson(person);
        workspace?.views.systemLandscape?.addPerson(person, position);

        const node = getNodeFromElement({
            element: person,
            position,
            parentId: groupId,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);

    const addGroup = useCallback((position: Position) => {
        const group = getDefaultElement(ElementType.Group) as Group;
        
        workspace?.model.addGroup(group);
        workspace?.views.systemLandscape?.addGroup(group, position);

        const node = getNodeFromElement({
            element: group,
            position,
            size: {
                height: 300,
                width: 300,
            },
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [workspace, setNodes]);
    
    const addRelationship = useCallback((sourceIdentifier: Identifier, targetIdentifier: Identifier) => {
        const relationship = new Relationship({
            sourceIdentifier,
            targetIdentifier
        })
        
        workspace?.model.addRelationship(relationship);

        const edge = getEdgeFromRelationship({
            relationship,
            styles: workspace.views.configuration.styles
        });
        setEdges(edges => [...edges, edge]);

        return workspace;
    }, [workspace, setEdges]);

    const setElementPosition = useCallback((elementId: string, position: Position) => {
        workspace.views.systemLandscape
            ?.setElementPosition(elementId, position);
        
        return workspace;
    }, [workspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addGroup,
        addRelationship,
        setElementPosition
    }
}
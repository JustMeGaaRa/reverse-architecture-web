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
import { v4 } from "uuid";
import {
    getNodeFromElement,
    getEdgeFromRelationship
} from "../utils";

export const useSystemContextView = (systemSoftwareIdentifier: Identifier) => {
    const { workspace } = useWorkspace();
    const { setNodes, setEdges } = useReactFlow();
    
    const addSoftwareSystem = useCallback((position: Position, groupId?: Identifier) => {
        const softwareSystem = getDefaultElement(ElementType.SoftwareSystem) as SoftwareSystem;
        
        workspace.model.addSoftwareSystem(softwareSystem, groupId);
        workspace.views.systemContexts
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addSoftwareSystem(softwareSystem, position);
        
        const node = getNodeFromElement({
            element: softwareSystem,
            position,
            parentId: groupId,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [systemSoftwareIdentifier, workspace, setNodes]);
    
    const addPerson = useCallback((position: Position, groupId?: Identifier) => {
        const person = getDefaultElement(ElementType.Person) as Person;
        
        workspace.model.addPerson(person, groupId);
        workspace.views.systemContexts
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addPerson(person, position);

        const node = getNodeFromElement({
            element: person,
            position,
            parentId: groupId,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [systemSoftwareIdentifier, workspace, setNodes]);

    const addGroup = useCallback((position: Position) => {
        const group = getDefaultElement(ElementType.Group) as Group;
        
        workspace.model.addGroup(group);
        workspace.views.systemContexts
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addGroup(group, position);

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
        workspace.views.systemContexts
            .filter(x => x.identifier === systemSoftwareIdentifier)
            .forEach(x => x.setElementPosition(elementId, position));

        return workspace;
    }, [systemSoftwareIdentifier, workspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addGroup,
        addRelationship,
        setElementPosition
    }
}
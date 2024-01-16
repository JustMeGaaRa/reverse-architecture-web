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
import { useWorkspace } from "@workspace/core";
import { useCallback } from "react";
import {
    getNodeFromElement,
    getEdgeFromRelationship
} from "../utils";

export const useSystemContextView = (systemSoftwareIdentifier: Identifier) => {
    const { workspace, setWorkspace } = useWorkspace();
    const { setNodes, setEdges } = useReactFlow();
    
    const addSoftwareSystem = useCallback((position: Position, groupId?: Identifier) => {
        const softwareSystem = getDefaultElement(ElementType.SoftwareSystem) as SoftwareSystem;
        
        const node = getNodeFromElement({
            element: softwareSystem,
            position,
            parentId: groupId,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model.addSoftwareSystem(softwareSystem, groupId);
            builder.views.systemContexts
                .find(x => x.identifier === systemSoftwareIdentifier)
                ?.addSoftwareSystem(softwareSystem, position);
            return builder.toObject();
        });

        return softwareSystem;
    }, [systemSoftwareIdentifier, workspace, setNodes, setWorkspace]);
    
    const addPerson = useCallback((position: Position, groupId?: Identifier) => {
        const person = getDefaultElement(ElementType.Person) as Person;

        const node = getNodeFromElement({
            element: person,
            position,
            parentId: groupId,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            builder.model.addPerson(person, groupId);
            builder.views.systemContexts
                .find(x => x.identifier === systemSoftwareIdentifier)
                ?.addPerson(person, position);
            return builder.toObject();
        });

        return person;
    }, [systemSoftwareIdentifier, workspace, setNodes, setWorkspace]);

    const addGroup = useCallback((position: Position) => {
        const group = getDefaultElement(ElementType.Group) as Group;

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
        setWorkspace(workspace => {
        
            const builder = new Workspace(workspace);
            builder.model.addGroup(group);
            builder.views.systemContexts
                .find(x => x.identifier === systemSoftwareIdentifier)
                ?.addGroup(group, position);
            return builder.toObject();
        });

        return group;
    }, [systemSoftwareIdentifier, workspace, setNodes, setWorkspace]);
    
    const addRelationship = useCallback((sourceIdentifier: Identifier, targetIdentifier: Identifier) => {
        const relationship = new Relationship({
            sourceIdentifier,
            targetIdentifier
        });

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
            builder.views.systemContexts
                .filter(x => x.identifier === systemSoftwareIdentifier)
                .forEach(x => x.setElementPosition(elementId, position));
            return builder.toObject();
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
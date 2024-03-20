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
import { useWorkspace } from "@structurizr/react";
import { useCallback } from "react";
import {
    getNodeFromElement,
    getEdgeFromRelationship
} from "../utils";

export const useSystemLandscapeView = () => {
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
            // TODO: refactor and adapt to the collection of views
            // builder?.views.systemLandscape?.addSoftwareSystem(softwareSystem, position);
            builder?.model.addSoftwareSystem(softwareSystem, groupId);
            return builder.toSnapshot()
        });

        return softwareSystem;
    }, [workspace, setNodes, setWorkspace]);
    
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
            builder?.model.addPerson(person);
            // builder?.views.systemLandscape?.addPerson(person, position);
            return builder.toSnapshot();
        });

        return person;
    }, [workspace, setNodes, setWorkspace]);

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
            builder?.model.addGroup(group);
            // builder?.views.systemLandscape?.addGroup(group, position);
            return builder.toSnapshot();
        });

        return group;
    }, [workspace, setNodes, setWorkspace]);
    
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
            builder?.model.addRelationship(relationship);
            return builder.toSnapshot();
        });

        return relationship;
    }, [workspace, setEdges, setWorkspace]);

    const setElementPosition = useCallback((elementId: string, position: Position) => {
        setWorkspace(workspace => {
            const builder = new Workspace(workspace);
            // builder.views.systemLandscape
            //     ?.setElementPosition(elementId, position);
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
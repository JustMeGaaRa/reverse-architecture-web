import { useReactFlow } from "@reactflow/core";
import {
    Group,
    Identifier,
    Person,
    Position,
    Relationship,
    SoftwareSystem,
    Workspace
} from "@structurizr/dsl";
import { useCallback } from "react";
import { v4 } from "uuid";
import { useWorkspaceStore } from "../hooks";
import { getNodeFromElement, getEdgeFromRelationship } from "../utils";

export const useSystemLandscapeView = () => {
    const { workspace } = useWorkspaceStore();
    const { setNodes, setEdges } = useReactFlow();

    const addGroup = useCallback((position: Position) => {
        const group = new Group({
            identifier: `group_${v4()}`,
            name: "Group",
        })

        const builder = new Workspace(workspace);
        builder.views.systemLandscape?.addGroup(group, position);
        builder.model.addGroup(group);

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));

        const node = getNodeFromElement({
            element: group,
            position,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);
    }, [workspace, setNodes]);
    
    const addSoftwareSystem = useCallback((position: Position, groupId?: Identifier) => {
        const softwareSystem = new SoftwareSystem({
            identifier: `softwareSystem_${v4()}`,
            name: "Software System",
        })
        
        const builder = new Workspace(workspace);
        builder.views.systemLandscape?.addSoftwareSystem(softwareSystem, position);
        builder.model.addSoftwareSystem(softwareSystem, groupId);

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));
        
        const node = getNodeFromElement({
            element: softwareSystem,
            position,
            parentId: groupId,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);
    }, [workspace, setNodes]);
    
    const addPerson = useCallback((position: Position, groupId?: Identifier) => {
        const person = new Person({
            identifier: `person_${v4()}`,
            name: "Person",
        })
        
        const builder = new Workspace(workspace);
        builder.views.systemLandscape?.addPerson(person, position);
        builder.model.addPerson(person);

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));

        const node = getNodeFromElement({
            element: person,
            position,
            parentId: groupId,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);
    }, [workspace, setNodes]);
    
    const addRelationship = useCallback((sourceIdentifier: Identifier, targetIdentifier: Identifier) => {
        const relationship = new Relationship({
            sourceIdentifier,
            targetIdentifier
        })
        
        const builder = new Workspace(workspace);
        builder.model.addRelationship(relationship);

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));

        const edge = getEdgeFromRelationship({
            relationship,
            styles: workspace.views.configuration.styles
        });
        setEdges(edges => [...edges, edge]);
    }, [workspace, setEdges]);

    return {
        addGroup,
        addSoftwareSystem,
        addPerson,
        addRelationship
    }
}
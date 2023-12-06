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
import { useWorkspaceStore } from "@workspace/core";
import { useCallback } from "react";
import { v4 } from "uuid";
import {
    getNodeFromElement,
    getEdgeFromRelationship
} from "../utils";

export const useSystemContextView = (systemSoftwareIdentifier: Identifier) => {
    const { workspace } = useWorkspaceStore();
    const { setNodes, setEdges } = useReactFlow();
    
    const addSoftwareSystem = useCallback((position: Position, groupId?: Identifier) => {
        const softwareSystem = new SoftwareSystem({
            identifier: `softwareSystem_${new String(v4()).substring(0, 8)}`,
            name: "Software System",
        })
        
        const builder = new Workspace(workspace);
        builder.views.systemContexts
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addSoftwareSystem(softwareSystem, position);
        builder.model
            .addSoftwareSystem(softwareSystem, groupId);

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

        return builder.toObject();
    }, [systemSoftwareIdentifier, workspace, setNodes]);
    
    const addPerson = useCallback((position: Position, groupId?: Identifier) => {
        const person = new Person({
            identifier: `person_${new String(v4()).substring(0, 8)}`,
            name: "Person",
        })
        
        const builder = new Workspace(workspace);
        builder.views.systemContexts
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addPerson(person, position);
        builder.model.addPerson(person, groupId);

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

        return builder.toObject();
    }, [systemSoftwareIdentifier, workspace, setNodes]);

    const addGroup = useCallback((position: Position) => {
        const group = new Group({
            identifier: `group_${new String(v4()).substring(0, 8)}`,
            name: "Group",
        })

        const builder = new Workspace(workspace);
        builder.views.systemContexts
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addGroup(group, position);
        builder.model.addGroup(group);

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));

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

        return builder.toObject();
    }, [systemSoftwareIdentifier, workspace, setNodes]);
    
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

        return builder.toObject();
    }, [workspace, setEdges]);

    const setElementPosition = useCallback((elementId: string, position: Position) => {
        const builder = new Workspace(workspace);
        builder.views.systemContexts
            .filter(x => x.identifier === systemSoftwareIdentifier)
            .forEach(x => x.setElementPosition(elementId, position));

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));

        return builder.toObject();
    }, [systemSoftwareIdentifier, workspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addGroup,
        addRelationship,
        setElementPosition
    }
}
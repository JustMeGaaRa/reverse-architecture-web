import { useReactFlow } from "@reactflow/core";
import {
    Container,
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

export const useContainerView = (systemSoftwareIdentifier: Identifier) => {
    const { workspace } = useWorkspaceStore();
    const { setNodes, setEdges } = useReactFlow();
    
    // NOTE: the person added can either be an existing one or a new one
    // The existing person is included in the view, while the new one is also added to the model
    const addPerson = useCallback((position: Position) => {
        const person = new Person({
            identifier: `person_${new String(v4()).substring(0, 8)}`,
            name: "Person",
        })
        
        const builder = new Workspace(workspace);
        builder.model
            .addPerson(person);
        builder.views.containers
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addPerson(person, position);

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));

        // NOTE: in this context the person can only be added outside of container
        const node = getNodeFromElement({
            element: person,
            position,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return builder.toObject();
    }, [systemSoftwareIdentifier, setNodes, workspace]);
    
    // NOTE: the software system added can either be an existing one or a new one
    // The existing system is included in the view, while the new one is also added to the model
    const addSoftwareSystem = useCallback((position: Position) => {
        const softwareSystem = new SoftwareSystem({
            identifier: `softwareSystem_${new String(v4()).substring(0, 8)}`,
            name: "Software System",
        })
        
        const builder = new Workspace(workspace);
        builder.model
            .addSoftwareSystem(softwareSystem);
        builder.views.containers
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addSoftwareSystem(softwareSystem, position);

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));

        // NOTE: in this context the software system can only be added outside of container
        const node = getNodeFromElement({
            element: softwareSystem,
            position,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return builder.toObject();
    }, [systemSoftwareIdentifier, setNodes, workspace]);
    
    const addContainer = useCallback((position: Position, groupId?: Identifier) => {
        const container = new Container({
            identifier: `container_${new String(v4()).substring(0, 8)}`,
            name: "Container",
        })

        const builder = new Workspace(workspace);
        builder.views.containers
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addContainer(container, position);
        builder.model
            .findSoftwareSystem(systemSoftwareIdentifier)
            .addContainer(container, groupId);

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));

        // NOTE: in this context the container can only be added as a child of the software system or a group
        const node = getNodeFromElement({
            element: container,
            position,
            parentId: groupId ?? systemSoftwareIdentifier,
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
        builder.views.containers
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addGroup(group, position);
        builder.model
            .findSoftwareSystem(systemSoftwareIdentifier)
            .addGroup(group);

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));

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
        builder.views.containers
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
        addContainer,
        addGroup,
        addRelationship,
        setElementPosition
    }
}
import { useReactFlow } from "@reactflow/core";
import {
    Component,
    Group,
    Identifier,
    Position,
    Relationship,
    Workspace
} from "@structurizr/dsl";
import {
    useWorkspaceStore,
    getNodeFromElement,
    getEdgeFromRelationship
} from "@workspace/core";
import { useCallback } from "react";
import { v4 } from "uuid";

export const useComponentView = (containerIdentifier: Identifier) => {
    const { workspace } = useWorkspaceStore();
    const { setNodes, setEdges } = useReactFlow();
    
    // NOTE: the software system added can either be an existing one or a new one
    // The existing system is included in the view, while the new one is also added to the model
    const addSoftwareSystem = useCallback((position: Position) => {
    }, []);
    
    // NOTE: the person added can either be an existing one or a new one
    // The existing person is included in the view, while the new one is also added to the model
    const addPerson = useCallback((position: Position) => {
    }, []);
    
    // NOTE: the container added can either be an existing one or a new one
    // The existing container is included in the view, while the new one is also added to the model
    const addContainer = useCallback((position: Position) => {
    }, []);
    
    const addComponent = useCallback((position: Position, groupId?: Identifier) => {
        const component = new Component({
            identifier: `component_${v4()}`,
            name: "Component",
        })

        const builder = new Workspace(workspace);
        builder.views.components
            .find(x => x.identifier === containerIdentifier)
            ?.addComponent(component, position);
        builder.model
            .findContainer(containerIdentifier)
            .addComponent(component, groupId);

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));

        // NOTE: in this context the component can only be added as a child of the container or a group
        const node = getNodeFromElement({
            element: component,
            position,
            parentId: groupId ?? containerIdentifier,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);
    }, [containerIdentifier, workspace, setNodes]);
    
    const addGroup = useCallback((position: Position) => {
        const group = new Group({
            identifier: `group_${v4()}`,
            name: "Group",
        })

        const builder = new Workspace(workspace);
        builder.views.components
            .find(x => x.identifier === containerIdentifier)
            ?.addGroup(group, position);
        builder.model
            .findContainer(containerIdentifier)
            .addGroup(group);

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));

        // NOTE: in this context the group can only be added as a child of the container
        const node = getNodeFromElement({
            element: group,
            position,
            parentId: containerIdentifier,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);
    }, [containerIdentifier, workspace, setNodes]);
    
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

    const setElementPosition = useCallback((elementId: string, position: Position) => {
        const builder = new Workspace(workspace);
        builder.views.components
            .filter(x => x.identifier === containerIdentifier)
            .forEach(x => x.setElementPosition(elementId, position));

        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: builder.toObject()
        }));
    }, [containerIdentifier, workspace]);

    return {
        addGroup,
        addSoftwareSystem,
        addPerson,
        addContainer,
        addComponent,
        addRelationship,
        setElementPosition
    }
}
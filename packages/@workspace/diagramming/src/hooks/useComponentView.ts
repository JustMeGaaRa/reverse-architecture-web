import { useReactFlow } from "@reactflow/core";
import {
    Component,
    Container,
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

export const useComponentView = (containerIdentifier: Identifier) => {
    const { workspace } = useWorkspace();
    const { setNodes, setEdges } = useReactFlow();
    
    // NOTE: the person added can either be an existing one or a new one
    // The existing person is included in the view, while the new one is also added to the model
    const addPerson = useCallback((position: Position) => {
        const person = new Person({
            identifier: `person_${new String(v4()).substring(0, 8)}`,
            name: "Person",
        })
        
        workspace.model
            .addPerson(person);
        workspace.views.components
            .find(x => x.identifier === containerIdentifier)
            ?.addPerson(person, position);

        // NOTE: in this context the person can only be added outside of container
        const node = getNodeFromElement({
            element: person,
            position,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [containerIdentifier, setNodes, workspace]);
    
    // NOTE: the software system added can either be an existing one or a new one
    // The existing system is included in the view, while the new one is also added to the model
    const addSoftwareSystem = useCallback((position: Position) => {
        const softwareSystem = new SoftwareSystem({
            identifier: `softwareSystem_${new String(v4()).substring(0, 8)}`,
            name: "Software System",
        })
        
        workspace.model
            .addSoftwareSystem(softwareSystem);
        workspace.views.components
            .find(x => x.identifier === containerIdentifier)
            ?.addSoftwareSystem(softwareSystem, position);

        // NOTE: in this context the software system can only be added outside of container
        const node = getNodeFromElement({
            element: softwareSystem,
            position,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [containerIdentifier, setNodes, workspace]);
    
    // NOTE: the container added can either be an existing one or a new one
    // The existing container is included in the view, while the new one is also added to the model
    const addContainer = useCallback((position: Position) => {
        const container = new Container({
            identifier: `container_${new String(v4()).substring(0, 8)}`,
            name: "Container",
        })
        
        workspace.model
            .findContainerParent(containerIdentifier)
            .addContainer(container);
        workspace.views.components
            .find(x => x.identifier === containerIdentifier)
            ?.addContainer(container, position);
        
        // NOTE: in this context the container can only be added outside of container
        const node = getNodeFromElement({
            element: container,
            position,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [containerIdentifier, setNodes, workspace]);
    
    const addComponent = useCallback((position: Position, groupId?: Identifier) => {
        const component = new Component({
            identifier: `component_${new String(v4()).substring(0, 8)}`,
            name: "Component",
        })
        
        workspace.views.components
            .find(x => x.identifier === containerIdentifier)
            ?.addComponent(component, position);
        workspace.model
            .findContainer(containerIdentifier)
            .addComponent(component, groupId);
        
        // NOTE: in this context the component can only be added as a child of the container or a group
        const node = getNodeFromElement({
            element: component,
            position,
            parentId: groupId ?? containerIdentifier,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [containerIdentifier, workspace, setNodes]);
    
    const addGroup = useCallback((position: Position) => {
        const group = new Group({
            identifier: `group_${new String(v4()).substring(0, 8)}`,
            name: "Group",
        })
        
        workspace.views.components
            .find(x => x.identifier === containerIdentifier)
            ?.addGroup(group, position);
        workspace.model
            .findContainer(containerIdentifier)
            .addGroup(group);

        // NOTE: in this context the group can only be added as a child of the container
        const node = getNodeFromElement({
            element: group,
            position,
            size: {
                height: 300,
                width: 300,
            },
            parentId: containerIdentifier,
            styles: workspace.views.configuration.styles
        });
        setNodes(nodes => [...nodes, node]);

        return workspace;
    }, [containerIdentifier, workspace, setNodes]);
    
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
        workspace.views.components
            .filter(x => x.identifier === containerIdentifier)
            .forEach(x => x.setElementPosition(elementId, position));

        return workspace;
    }, [containerIdentifier, workspace]);

    return {
        addPerson,
        addSoftwareSystem,
        addContainer,
        addComponent,
        addGroup,
        addRelationship,
        setElementPosition
    }
}
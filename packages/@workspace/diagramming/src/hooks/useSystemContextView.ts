import { useReactFlow } from "@reactflow/core";
import {
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
        const softwareSystem = new SoftwareSystem({
            identifier: `softwareSystem_${new String(v4()).substring(0, 8)}`,
            name: "Software System",
        })
        
        workspace.views.systemContexts
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addSoftwareSystem(softwareSystem, position);
        workspace.model
            .addSoftwareSystem(softwareSystem, groupId);
        
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
        const person = new Person({
            identifier: `person_${new String(v4()).substring(0, 8)}`,
            name: "Person",
        })
        
        workspace.views.systemContexts
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addPerson(person, position);
        workspace.model.addPerson(person, groupId);

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
        const group = new Group({
            identifier: `group_${new String(v4()).substring(0, 8)}`,
            name: "Group",
        })
        
        workspace.views.systemContexts
            .find(x => x.identifier === systemSoftwareIdentifier)
            ?.addGroup(group, position);
        workspace.model.addGroup(group);

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
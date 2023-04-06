import {
    defaultElementStyle,
    defaultRelationshipStyle,
    Element,
    Relationship,
    DeploymentNode,
    aggrerateStyles,
    Workspace,
    findSoftwareSystem,
    findContainer,
    SystemContextView,
    ContainerView,
    ComponentView,
    DeploymentView,
    GenericView,
    Styles,
    Dimension
} from "@justmegaara/structurizr-dsl";
import { Node, Edge } from "@reactflow/core";
import { ElementNodeWrapperProps } from "../components/Nodes/ElementNode";
import { RelationshipEdgeWrapperProps } from "../components/Edges/RelationshipEdge";

export type ElementParams<TElement extends Element = any> = {
    element: TElement;
    parentId?: string;
    expanded?: boolean;
    size: Dimension;
    styles: Styles;
}

export const fromElement = (params: ElementParams): Node<ElementNodeWrapperProps> => {
    const { element, parentId, expanded, size, styles } = params;

    return {
        id: element.identifier,
        type: "element",
        data: {
            element: element,
            style: aggrerateStyles(
                defaultElementStyle,
                styles.element,
                [...element.tags].reverse()
            ),
            width: size.width,
            height: size.height,
            expanded: expanded,
        },
        position: { x: size.x, y: size.y },
        parentNode: parentId,
        extent: "parent",
        style: parentId ? undefined : { zIndex: -1 }
    }
}

export type RelationshipParams = {
    relationship: Relationship;
    styles: Styles;
}

export const fromRelationship = (params: RelationshipParams): Edge<RelationshipEdgeWrapperProps> => {
    const { relationship, styles } = params;

    return {
        id: `${relationship.sourceIdentifier}_${relationship.targetIdentifier}`,
        type: "relationship",
        label: relationship.description,
        data: {
            relationship: relationship,
            style: aggrerateStyles(
                defaultRelationshipStyle,
                styles.relationship,
                [...relationship.tags].reverse()
            ),
        },
        source: relationship.sourceIdentifier,
        target: relationship.targetIdentifier
    };
}

export const fromWorkspaceRelationships = (view: GenericView, workspace: Workspace) => {
    if (!view) {
        return [];
    }

    return workspace.model.relationships
        .filter(edge => view.layout[edge.sourceIdentifier] && view.layout[edge.targetIdentifier])
        .map(edge => fromRelationship({
            relationship: edge,
            styles: workspace.views.styles
        }));
}

export const fromSystemContextView = (view: SystemContextView, workspace: Workspace) => {
    const fromSystemContextScope = (view: SystemContextView, workspace: Workspace) => {
        const softwareSystem = findSoftwareSystem(workspace, view.softwareSystemIdentifier);
        
        return [
            fromElement({
                element: softwareSystem,
                size: view.layout[softwareSystem.identifier],
                styles: workspace.views.styles
            }),
            ...view.people.map(person => fromElement({
                element: person,
                size: view.layout[person.identifier],
                styles: workspace.views.styles
            })),
            ...view.softwareSystems.map(system => fromElement({
                element: system,
                size: view.layout[system.identifier],
                styles: workspace.views.styles
            })),
        ];
    };

    const isValid = workspace?.views?.systemContexts !== undefined;

    return {
        nodes: isValid ? fromSystemContextScope(view, workspace) : [],
        edges: isValid ? fromWorkspaceRelationships(view, workspace) : []
    }
}

export const fromContainerView = (view: ContainerView, workspace: Workspace) => {
    const fromContainerScope = (view: ContainerView, workspace: Workspace) => {
        const softwareSystem = findSoftwareSystem(workspace, view.softwareSystemIdentifier);
        
        if (!view) {
            const layout = {
                [softwareSystem.identifier]: { x: 0, y: 0, width: 500, height: 500 }
            }

            return [
                fromElement({
                    element: softwareSystem,
                    expanded: true,
                    size: layout[softwareSystem.identifier],
                    styles: workspace.views.styles
                }),
            ];
        }
        
        return [
            fromElement({
                element: softwareSystem,
                expanded: true,
                size: view.layout[softwareSystem.identifier],
                styles: workspace.views.styles
            }),
            ...view.people.map(person => fromElement({
                element: person,
                size: view.layout[person.identifier],
                styles: workspace.views.styles
            })),
            ...view.softwareSystems.map(system => fromElement({
                element: system,
                size: view.layout[system.identifier],
                styles: workspace.views.styles
            })),
            ...view.containers?.map(container => fromElement({
                element: container,
                parentId: softwareSystem.identifier,
                size: view.layout[container.identifier],
                styles: workspace.views.styles
            })) ?? [],
        ];
    }

    const isValid = workspace?.views?.containers !== undefined;

    return {
        nodes: isValid ? fromContainerScope(view, workspace) : [],
        edges: isValid ? fromWorkspaceRelationships(view, workspace) : []
    }
}

export const fromComponentView = (view: ComponentView, workspace: Workspace) => {
    const fromComponentScope = (view: ComponentView, workspace: Workspace) => {
        const container = findContainer(workspace, view.containerIdentifier);

        if (!view) {
            const layout = {
                [container.identifier]: { x: 0, y: 0, width: 500, height: 500 }
            }
            
            return [
                fromElement({
                    element: container,
                    expanded: true,
                    size: layout[container.identifier],
                    styles: workspace.views.styles
                }),
            ];
        }
        
        return [
            fromElement({
                element: container,
                expanded: true,
                size: view.layout[container.identifier],
                styles: workspace.views.styles
            }),
            ...view.people.map(node => fromElement({
                element: node, 
                size: view.layout[node.identifier],
                styles: workspace.views.styles
            })),
            ...view.softwareSystems.map(node => fromElement({
                element: node,
                size: view.layout[node.identifier],
                styles: workspace.views.styles
            })),
            ...view.containers.map(node => fromElement({
                element: node,
                size: view.layout[node.identifier],
                styles: workspace.views.styles
            })),
            ...view.components?.map(node => fromElement({
                element: node,
                parentId: container.identifier,
                size: view.layout[node.identifier],
                styles: workspace.views.styles
            })) ?? [],
        ];
    }
    
    const isValid = workspace?.views?.components !== undefined;
    
    return {
        nodes: isValid ? fromComponentScope(view, workspace) : [],
        edges: isValid ? fromWorkspaceRelationships(view, workspace) : []
    }
}

export const fromDeploymentView = (view: DeploymentView, workspace: Workspace) => {
    const fromDeploymentScope = (view: DeploymentView, workspace: Workspace) => {
        const flatMapDeploymentNode = (parentDeploymentNode: DeploymentNode, parentNode?: string) => {
            return [
                fromElement({
                        element: parentDeploymentNode,
                        parentId: parentNode,
                        size: view.layout[parentDeploymentNode.identifier],
                        styles: workspace.views.styles
                    },
                ),
                ...parentDeploymentNode.deploymentNodes?.flatMap(childDeploymentNode => flatMapDeploymentNode(
                    childDeploymentNode,
                    parentDeploymentNode.identifier
                )) ?? [],
                ...parentDeploymentNode.softwareSystemInstances?.flatMap(instance => fromElement({
                    element: {
                        ...findSoftwareSystem(workspace, instance.softwareSystemIdentifier),
                        identifier: instance.identifier
                    },
                    parentId: parentDeploymentNode.identifier,
                    size: view.layout[instance.identifier],
                    styles: workspace.views.styles
                })) ?? [],
                ...parentDeploymentNode.containerInstances?.flatMap(instance => fromElement({
                    element: {
                        ...findContainer(workspace, instance.containerIdentifier),
                        identifier: instance.identifier
                    },
                    parentId: parentDeploymentNode.identifier,
                    size: view.layout[instance.identifier],
                    styles: workspace.views.styles
                })) ?? [],
            ];
        }
        
        return view.deploymentNodes.flatMap(dn => flatMapDeploymentNode(dn));
    }

    const isValid = workspace?.views?.deployments !== undefined;

    return {
        nodes: isValid ? fromDeploymentScope(view, workspace) : [],
        edges: isValid ? fromWorkspaceRelationships(view, workspace) : []
    }
}
import {
    defaultElementStyle,
    defaultRelationshipStyle,
    Element,
    Layout,
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
    Styles
} from "@justmegaara/structurizr-dsl";
import { Node, Edge } from "@reactflow/core";
import { ElementNodeWrapperProps } from "../components/Nodes/ElementNode";
import { RelationshipEdgeWrapperProps } from "../components/Edges/RelationshipEdge";

type FromNodeParams = {
    node: Element;
    parentNode?: string;
    expanded?: boolean;
    layout?: Layout;
}

const fromNode = (
    params: FromNodeParams,
    styles: Styles,
): Node<ElementNodeWrapperProps> => {
    const { node, parentNode, expanded, layout } = params;
    return {
        id: node.identifier,
        type: "element",
        data: {
            element: node,
            style: aggrerateStyles(
                defaultElementStyle,
                styles.element,
                [...node.tags].reverse()
            ),
            width: layout[node.identifier].width,
            height: layout[node.identifier].height,
            expanded: expanded,
        },
        position: layout[node.identifier],
        parentNode: parentNode,
        extent: "parent",
        style: parentNode ? undefined : { zIndex: -1 }
    }
}

const fromEdge = (
    edge: Relationship,
    styles: Styles,
): Edge<RelationshipEdgeWrapperProps> => {
    return {
        id: `${edge.sourceIdentifier}_${edge.targetIdentifier}`,
        type: "relationship",
        label: edge.description,
        data: {
            relationship: edge,
            style: aggrerateStyles(
                defaultRelationshipStyle,
                styles.relationship,
                [...edge.tags].reverse()
            ),
        },
        source: edge.sourceIdentifier,
        target: edge.targetIdentifier
    };
}

const fromWorkspaceRelationships = (view: GenericView, workspace: Workspace) => {
    if (!view) {
        return [];
    }

    return workspace.model.relationships
        .filter(edge => view.layout[edge.sourceIdentifier] && view.layout[edge.targetIdentifier])
        .map(edge => fromEdge(edge, workspace.views.styles));
}

export const systemContextViewSelector = (view: SystemContextView, workspace: Workspace) => {
    const fromSystemContextViewElements = (view: SystemContextView, workspace: Workspace) => {
        const softwareSystem = findSoftwareSystem(workspace, view.softwareSystemIdentifier);
        
        return [
            fromNode({ node: softwareSystem, layout: view.layout }, workspace.views.styles),
            ...view.people.map(node => fromNode({ node, layout: view.layout }, workspace.views.styles)),
            ...view.softwareSystems.map(node => fromNode({ node, layout: view.layout }, workspace.views.styles))
        ];
    };

    const isValid = workspace?.views?.systemContexts !== undefined;

    return {
        nodes: isValid ? fromSystemContextViewElements(view, workspace) : [],
        edges: isValid ? fromWorkspaceRelationships(view, workspace) : []
    }
}

export const containerViewSelector = (view: ContainerView, workspace: Workspace) => {
    const fromContainerViewElements = (view: ContainerView, workspace: Workspace) => {
        const softwareSystem = findSoftwareSystem(workspace, view.softwareSystemIdentifier);
        
        if (!view) {
            const layout = {
                [softwareSystem.identifier]: { x: 0, y: 0, width: 500, height: 500 }
            }

            return [
                fromNode({ node: softwareSystem, expanded: true, layout }, workspace.views.styles),
            ];
        }
        
        return [
            fromNode({ node: softwareSystem, expanded: true, layout: view.layout }, workspace.views.styles),
            ...view.people.map(node => fromNode({ node, layout: view.layout }, workspace.views.styles)),
            ...view.softwareSystems.map(node => fromNode({ node, layout: view.layout }, workspace.views.styles)),
            ...view.containers?.map(node => fromNode({ node, parentNode: softwareSystem.identifier, layout: view.layout }, workspace.views.styles)) ?? [],
        ];
    }

    const isValid = workspace?.views?.containers !== undefined;

    return {
        nodes: isValid ? fromContainerViewElements(view, workspace) : [],
        edges: isValid ? fromWorkspaceRelationships(view, workspace) : []
    }
}

export const componentViewSelector = (view: ComponentView, workspace: Workspace) => {
    const fromComponentViewElements = (view: ComponentView, workspace: Workspace) => {
        const container = findContainer(workspace, view.containerIdentifier);

        if (!view) {
            const layout = {
                [container.identifier]: { x: 0, y: 0, width: 500, height: 500 }
            }
            
            return [
                fromNode({ node: container, expanded: true, layout }, workspace.views.styles),
            ];
        }
        
        return [
            fromNode({ node: container, expanded: true, layout: view.layout }, workspace.views.styles),
            ...view.people.map(node => fromNode({ node, layout: view.layout }, workspace.views.styles)),
            ...view.softwareSystems.map(node => fromNode({ node, layout: view.layout }, workspace.views.styles)),
            ...view.containers.map(node => fromNode({ node, layout: view.layout }, workspace.views.styles)),
            ...view.components?.map(node => fromNode({ node, parentNode: container.identifier, layout: view.layout }, workspace.views.styles)) ?? [],
        ];
    }
    
    const isValid = workspace?.views?.components !== undefined;
    
    return {
        nodes: isValid ? fromComponentViewElements(view, workspace) : [],
        edges: isValid ? fromWorkspaceRelationships(view, workspace) : []
    }
}

export const deploymentViewSelector = (view: DeploymentView, workspace: Workspace) => {
    const fromDeploymentViewElements = (view: DeploymentView, workspace: Workspace) => {
        const flatMapDeploymentNode = (parentDeploymentNode: DeploymentNode, parentNode?: string) => {
            return [
                fromNode({
                        node: parentDeploymentNode,
                        parentNode,
                        layout: view.layout
                    },
                    workspace.views.styles
                ),
                ...parentDeploymentNode.deploymentNodes
                    ?.flatMap(childDeploymentNode => flatMapDeploymentNode(
                        childDeploymentNode,
                        parentDeploymentNode.identifier
                    )) ?? [],
                ...parentDeploymentNode.softwareSystemInstances
                    ?.flatMap(instance => fromNode({
                            node: {
                                ...findSoftwareSystem(workspace, instance.softwareSystemIdentifier),
                                identifier: instance.identifier
                            },
                            parentNode: parentDeploymentNode.identifier,
                            layout: view.layout
                        },
                        workspace.views.styles
                    )) ?? [],
                ...parentDeploymentNode.containerInstances
                    ?.flatMap(instance => fromNode({
                            node: {
                                ...findContainer(workspace, instance.containerIdentifier),
                                identifier: instance.identifier
                            },
                            parentNode: parentDeploymentNode.identifier,
                            layout: view.layout
                        },
                        workspace.views.styles
                    )) ?? [],
            ];
        }
        
        return view.deploymentNodes.flatMap(dn => flatMapDeploymentNode(dn));
    }

    const isValid = workspace?.views?.deployments !== undefined;

    return {
        nodes: isValid ? fromDeploymentViewElements(view, workspace) : [],
        edges: isValid ? fromWorkspaceRelationships(view, workspace) : []
    }
}
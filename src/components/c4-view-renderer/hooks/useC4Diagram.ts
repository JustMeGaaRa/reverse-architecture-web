import {
    Node,
    Edge,
    FitViewOptions,
    ReactFlowJsonObject,
    useReactFlow
} from "@reactflow/core";
import { useCallback, useState } from "react";
import { ElementNodeWrapperProps } from "../components/Nodes/ElementNode";
import { RelationshipEdgeWrapperProps } from "../components/Edges/RelationshipEdge";
import {
    defaultElementStyle,
    defaultRelationshipStyle,
    Element,
    Layout,
    Relationship,
    DeploymentNode,
    Identifier,
    aggrerateStyles,
    Workspace,
    findSoftwareSystem,
    findContainer
} from "../../../dsl";

export const useC4Diagram = () => {
    const reactFlow = useReactFlow();
    // const c4Diagram = useC4BuilderStore();
    const [workspace, setWorkspace] = useState<Workspace>(null);

    type FromNodeParams = {
        node: Element;
        parentNode?: string;
        expanded?: boolean;
        layout?: Layout;
    }

    const fromNode = useCallback((params: FromNodeParams): Node<ElementNodeWrapperProps> => {
        const { node, parentNode, expanded, layout } = params;
        return {
            id: node.identifier,
            type: "element",
            data: {
                element: node,
                style: aggrerateStyles(
                    defaultElementStyle,
                    workspace.views.styles.element,
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
    }, [workspace]);
    
    const fromEdge = useCallback((
        edge: Relationship
    ): Edge<RelationshipEdgeWrapperProps> => {
        return {
            id: `${edge.sourceIdentifier}_${edge.targetIdentifier}`,
            type: "relationship",
            label: edge.description,
            data: {
                relationship: edge,
                style: aggrerateStyles(
                    defaultRelationshipStyle,
                    workspace.views.styles.relationship,
                    [...edge.tags].reverse()
                ),
            },
            source: edge.sourceIdentifier,
            target: edge.targetIdentifier
        };
    }, [workspace]);

    const relationshipExists = useCallback((
        sourceIdentifier: Identifier,
        targetIdentifier: Identifier
    ) => {
        return workspace?.model.relationships.some(x => 
            x.sourceIdentifier === sourceIdentifier && x.targetIdentifier === targetIdentifier
            || x.sourceIdentifier === targetIdentifier && x.targetIdentifier === sourceIdentifier
        )
    }, [workspace]);

    const getDiagramEdges = useCallback((workspace: Workspace) => {
        if (workspace === null) return Array.of<Edge<RelationshipEdgeWrapperProps>>();
    
        // TODO: filter edges only for nodes that will be rendered
        return workspace.model.relationships.map(edge => fromEdge(edge));
    }, [fromEdge]);

    const clearView = useCallback(() => {
        reactFlow.setNodes([]);
        reactFlow.setEdges([]);
    }, [reactFlow]);

    const renderSystemContextView = useCallback((softwareSystemIdentifier: Identifier) => {
        const getSystemContextViewNodes = (softwareSystemIdentifier: Identifier, workspace: Workspace) => {
            if (!workspace) return [];

            const softwareSystem = findSoftwareSystem(workspace, softwareSystemIdentifier);
            const layout = workspace?.views.systemContexts
                .find(view => view.softwareSystemIdentifier === softwareSystemIdentifier)?.layout;
            
            return [
                fromNode({ node: softwareSystem, layout }),
                ...workspace.model.people
                    .filter(x => relationshipExists(softwareSystem.identifier, x.identifier))
                    .map(node => fromNode({ node, layout })),
                ...workspace.model.softwareSystems
                    .filter(x => relationshipExists(softwareSystem.identifier, x.identifier))
                    .map(node => fromNode({ node, layout }))
            ];
        };

        reactFlow.setNodes(getSystemContextViewNodes(softwareSystemIdentifier, workspace));
        reactFlow.setEdges(getDiagramEdges(workspace));
    }, [reactFlow, workspace, fromNode, getDiagramEdges, relationshipExists]);

    const renderContainerView = useCallback((softwareSystemIdentifier: Identifier) => {
        const getContainerViewNodes = (softwareSystemIdentifier: Identifier, workspace: Workspace) => {
            if (!workspace) return [];
    
            const softwareSystem = findSoftwareSystem(workspace, softwareSystemIdentifier);
            const layout = workspace?.views.containers
                .find(view => view.softwareSystemIdentifier === softwareSystemIdentifier)?.layout;
    
            return [
                fromNode({ node: softwareSystem, expanded: true, layout }),
                ...softwareSystem?.containers
                    ?.map(node => fromNode({ node, parentNode: softwareSystem.identifier, layout })) ?? [],
                ...workspace.model.people
                    .filter(x => softwareSystem.containers.some(container => relationshipExists(container.identifier, x.identifier)))
                    .map(node => fromNode({ node, layout })),
                ...workspace.model.softwareSystems
                    .filter(x => softwareSystem.containers.some(container => relationshipExists(container.identifier, x.identifier)))
                    .filter(system => system.identifier !== softwareSystem?.identifier)
                    .map(node => fromNode({ node, layout })),
            ];
        }

        reactFlow.setNodes(getContainerViewNodes(softwareSystemIdentifier, workspace));
        reactFlow.setEdges(getDiagramEdges(workspace));
    }, [reactFlow, workspace, fromNode, getDiagramEdges, relationshipExists]);

    const renderComponentView = useCallback((containerIdentifier: Identifier) => {
        const getComponentViewNodes = (containerIdentifier: Identifier, workspace: Workspace) => {
            if (!workspace) return [];
            
            const container = findContainer(workspace, containerIdentifier);
            const layout = workspace?.views.components
                .find(view => view.containerIdentifier === containerIdentifier)?.layout;
    
            return [
                fromNode({ node: container, expanded: true, layout }),
                ...container?.components
                    ?.map(node => fromNode({ node, parentNode: container.identifier, layout })) ?? [],
                ...workspace.model.people
                    .filter(x => container.components.some(component => relationshipExists(component.identifier, x.identifier)))
                    .map(node => fromNode({ node, layout })),
                ...workspace.model.softwareSystems
                    .flatMap(system => system.containers)
                    .filter(x => container.components.some(component => relationshipExists(component.identifier, x.identifier)))
                    .map(node => fromNode({ node, layout })),
                ...workspace.model.softwareSystems
                    .filter(x => container.components.some(component => relationshipExists(component.identifier, x.identifier)))
                    .map(node => fromNode({ node, layout })),
            ];
        }

        reactFlow.setNodes(getComponentViewNodes(containerIdentifier, workspace));
        reactFlow.setEdges(getDiagramEdges(workspace));
    }, [reactFlow, workspace, fromNode, getDiagramEdges, relationshipExists]);

    const renderDeploymentView = useCallback((softwareSystemIdentifier: Identifier) => {
        const getDeploymentViewNodes = (softwareSystemIdentifier: Identifier, workspace: Workspace) => {
            if (!workspace) return [];
    
            const layout = workspace?.views.deployments
                .find(view => view.softwareSystemIdentifier === softwareSystemIdentifier)?.layout;
    
            const flatMapDeploymentNode = (parentDeploymentNode: DeploymentNode, parentNode?: string) => {
                // TODO: fix the issue with instances references only being displayed once
                return [
                    fromNode({ node: parentDeploymentNode, parentNode, layout }),
                    ...parentDeploymentNode.deploymentNodes
                        ?.flatMap(childDeploymentNode => flatMapDeploymentNode(
                            childDeploymentNode,
                            parentDeploymentNode.identifier
                        )) ?? [],
                    ...parentDeploymentNode.softwareSystemInstances
                        ?.flatMap(instance => fromNode({
                            node: findSoftwareSystem(workspace, instance.softwareSystemIdentifier),
                            parentNode: parentDeploymentNode.identifier,
                            layout
                        })) ?? [],
                    ...parentDeploymentNode.containerInstances
                        ?.flatMap(instance => fromNode({
                            node: findContainer(workspace, instance.containerIdentifier),
                            parentNode: parentDeploymentNode.identifier,
                            layout
                        })) ?? [],
                ];
            }

            // TODO: filter deployment nodes by softwareSystem identifier
            return workspace.model.deploymentEnvironments?.flatMap(deployment => 
                deployment.deploymentNodes.flatMap(dn => flatMapDeploymentNode(dn))
            ) ?? [];
        }

        reactFlow.setNodes(getDeploymentViewNodes(softwareSystemIdentifier, workspace));
        reactFlow.setEdges(getDiagramEdges(workspace));
    }, [reactFlow, workspace, fromNode, getDiagramEdges]);

    const fromObject = useCallback((
        flow: ReactFlowJsonObject,
        fitViewOptions?: FitViewOptions
    ) => {
        reactFlow.setNodes(flow.nodes || []);
        reactFlow.setEdges(flow.edges || []);
        reactFlow.fitView(fitViewOptions);
    }, [reactFlow]);

    return {
        // fromView,
        setWorkspace,
        renderSystemContextView,
        renderContainerView,
        renderComponentView,
        renderDeploymentView,
        fromObject,
        clearView
    };
}
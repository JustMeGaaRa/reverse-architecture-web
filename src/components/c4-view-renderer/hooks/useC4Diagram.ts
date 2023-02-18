import {
    Node,
    Edge,
    FitViewOptions,
    ReactFlowJsonObject,
    useReactFlow
} from "@reactflow/core";
import { useCallback } from "react";
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
    findContainer,
    useWorkspace,
    SystemContextView,
    ContainerView,
    ComponentView,
    DeploymentView
} from "../../../dsl";

export const useC4Diagram = () => {
    const reactFlow = useReactFlow();
    const {
        workspace,
        setName,
        systemContextView,
        containerView,
        componentView,
        deploymentView
    } = useWorkspace();

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

    const fromWorkspaceRelationships = useCallback((workspace: Workspace) => {
        // TODO: filter edges only for nodes that will be rendered
        return workspace.model.relationships.map(edge => fromEdge(edge));
    }, [fromEdge]);

    const clearView = useCallback(() => {
        reactFlow.setNodes([]);
        reactFlow.setEdges([]);
    }, [reactFlow]);

    const renderSystemContextView = useCallback((softwareSystemIdentifier: Identifier) => {
        const fromSystemContextView = (view: SystemContextView, workspace: Workspace) => {
            const softwareSystem = findSoftwareSystem(workspace, view.softwareSystemIdentifier);
            const layout = view.layout;
            
            return [
                fromNode({ node: softwareSystem, layout }),
                ...view.people.map(node => fromNode({ node, layout })),
                ...view.softwareSystems.map(node => fromNode({ node, layout }))
            ];
        };
        
        const view = systemContextView(softwareSystemIdentifier);
        setName(view.title);
        reactFlow.setNodes(fromSystemContextView(view, workspace));
        reactFlow.setEdges(fromWorkspaceRelationships(workspace));
    }, [reactFlow, workspace, systemContextView, setName, fromNode, fromWorkspaceRelationships]);

    const renderContainerView = useCallback((softwareSystemIdentifier: Identifier) => {
        const fromContainerView = (view: ContainerView, workspace: Workspace) => {
            const softwareSystem = findSoftwareSystem(workspace, view.softwareSystemIdentifier);
            const layout = view.layout;
    
            return [
                fromNode({ node: softwareSystem, expanded: true, layout }),
                ...view.people.map(node => fromNode({ node, layout })),
                ...view.softwareSystems.map(node => fromNode({ node, layout })),
                ...view.containers?.map(node => fromNode({ node, parentNode: softwareSystem.identifier, layout })) ?? [],
            ];
        }

        const view = containerView(softwareSystemIdentifier);
        setName(view.title);
        reactFlow.setNodes(fromContainerView(view, workspace));
        reactFlow.setEdges(fromWorkspaceRelationships(workspace));
    }, [reactFlow, workspace, containerView, setName, fromNode, fromWorkspaceRelationships]);

    const renderComponentView = useCallback((containerIdentifier: Identifier) => {
        const fromComponentView = (view: ComponentView, workspace: Workspace) => {
            const container = findContainer(workspace, view.containerIdentifier);
            const layout = view.layout;
    
            return [
                fromNode({ node: container, expanded: true, layout }),
                ...view.people.map(node => fromNode({ node, layout })),
                ...view.softwareSystems.map(node => fromNode({ node, layout })),
                ...view.containers.map(node => fromNode({ node, layout })),
                ...view.components?.map(node => fromNode({ node, parentNode: container.identifier, layout })) ?? [],
            ];
        }

        const view = componentView(containerIdentifier);
        setName(view.title);
        reactFlow.setNodes(fromComponentView(view, workspace));
        reactFlow.setEdges(fromWorkspaceRelationships(workspace));
    }, [reactFlow, workspace, componentView, setName, fromNode, fromWorkspaceRelationships]);

    const renderDeploymentView = useCallback((softwareSystemIdentifier: Identifier, environment: string) => {
        const fromDeploymentView = (view: DeploymentView, workspace: Workspace) => {
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
                
            const layout = view.layout;
            return view.deploymentNodes.flatMap(dn => flatMapDeploymentNode(dn));
        }

        const view = deploymentView({ identifier: softwareSystemIdentifier, environment });
        setName(view.title);
        reactFlow.setNodes(fromDeploymentView(view, workspace));
        reactFlow.setEdges(fromWorkspaceRelationships(workspace));
    }, [reactFlow, workspace, deploymentView, setName, fromNode, fromWorkspaceRelationships]);

    const fromObject = useCallback((
        flow: ReactFlowJsonObject,
        fitViewOptions?: FitViewOptions
    ) => {
        reactFlow.setNodes(flow.nodes || []);
        reactFlow.setEdges(flow.edges || []);
        reactFlow.fitView(fitViewOptions);
    }, [reactFlow]);

    return {
        renderSystemContextView,
        renderContainerView,
        renderComponentView,
        renderDeploymentView,
        fromObject,
        clearView
    };
}
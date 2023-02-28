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
    DeploymentView,
    GenericView
} from "../../../dsl";

export const useC4Diagram = () => {
    const reactFlow = useReactFlow();
    const store = useWorkspace();

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
                    store.workspace.views.styles.element,
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
    }, [store]);
    
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
                    store.workspace.views.styles.relationship,
                    [...edge.tags].reverse()
                ),
            },
            source: edge.sourceIdentifier,
            target: edge.targetIdentifier
        };
    }, [store]);

    const fromWorkspaceRelationships = useCallback((view: GenericView, workspace: Workspace) => {
        return workspace.model.relationships
            .filter(edge => view.layout[edge.sourceIdentifier] && view.layout[edge.targetIdentifier])
            .map(edge => fromEdge(edge));
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
        
        const view = store.workspace.views.systemContexts.find(x => x.softwareSystemIdentifier === softwareSystemIdentifier);
        store.setName(view.title);
        reactFlow.setNodes(fromSystemContextView(view, store.workspace));
        reactFlow.setEdges(fromWorkspaceRelationships(view, store.workspace));
    }, [reactFlow, store, fromNode, fromWorkspaceRelationships]);

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

        const view = store.workspace.views.containers.find(x => x.softwareSystemIdentifier === softwareSystemIdentifier);
        store.setName(view.title);
        reactFlow.setNodes(fromContainerView(view, store.workspace));
        reactFlow.setEdges(fromWorkspaceRelationships(view, store.workspace));
    }, [reactFlow, store, fromNode, fromWorkspaceRelationships]);

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

        const view = store.workspace.views.components.find(x => x.containerIdentifier === containerIdentifier);
        store.setName(view.title);
        reactFlow.setNodes(fromComponentView(view, store.workspace));
        reactFlow.setEdges(fromWorkspaceRelationships(view, store.workspace));
    }, [reactFlow, store, fromNode, fromWorkspaceRelationships]);

    const renderDeploymentView = useCallback((softwareSystemIdentifier: Identifier, environment: string) => {
        const fromDeploymentView = (view: DeploymentView, workspace: Workspace) => {
            const flatMapDeploymentNode = (parentDeploymentNode: DeploymentNode, parentNode?: string) => {
                return [
                    fromNode({ node: parentDeploymentNode, parentNode, layout }),
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
                            layout
                        })) ?? [],
                    ...parentDeploymentNode.containerInstances
                        ?.flatMap(instance => fromNode({
                            node: {
                                ...findContainer(workspace, instance.containerIdentifier),
                                identifier: instance.identifier
                            },
                            parentNode: parentDeploymentNode.identifier,
                            layout
                        })) ?? [],
                ];
            }
                
            const layout = view.layout;
            return view.deploymentNodes.flatMap(dn => flatMapDeploymentNode(dn));
        }

        const view = store.workspace.views.deployments.find(x => x.softwareSystemIdentifier === softwareSystemIdentifier);
        store.setName(view.title);
        reactFlow.setNodes(fromDeploymentView(view, store.workspace));
        reactFlow.setEdges(fromWorkspaceRelationships(view, store.workspace));
    }, [reactFlow, store, fromNode, fromWorkspaceRelationships]);

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
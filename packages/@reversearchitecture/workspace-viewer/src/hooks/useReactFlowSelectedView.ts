import {
    ComponentViewStrategy,
    ContainerViewStrategy,
    DeploymentViewStrategy,
    SystemContextViewStrategy,
    SystemLandscapeViewStrategy,
    ViewType,
    ISupportVisitor,
    ISupportPath,
    SystemLandscapePathProvider,
    SystemContextPathProvider,
    ContainerPathProvider,
    ComponentPathProvider,
    DeploymentPathProvider,
} from "@structurizr/dsl";
import { useEdgesState, useNodesState } from "@reactflow/core";
import { useEffect } from "react";
import { ReactFlowBuilder, ReactFlowVisitor } from "../types";
import { useWorkspaceStore } from "../hooks";

export const useReactFlowSelectedView = () => {
    const { workspace, selectedView, setViewPath } = useWorkspaceStore();
    const [ nodes, setNodes, onNodesChange ] = useNodesState([]);
    const [ edges, setEdges, onEdgesChange ] = useEdgesState([]);

    useEffect(() => {
        if (!workspace || !selectedView) return;

        const viewBuilders: Map<ViewType, ISupportVisitor> = new Map<ViewType, ISupportVisitor>([
            [ ViewType.SystemLandscape, new SystemLandscapeViewStrategy(workspace, selectedView) ],
            [ ViewType.SystemContext, new SystemContextViewStrategy(workspace, selectedView) ],
            [ ViewType.Container, new ContainerViewStrategy(workspace, selectedView) ],
            [ ViewType.Component, new ComponentViewStrategy(workspace, selectedView) ],
            [ ViewType.Deployment, new DeploymentViewStrategy(workspace, selectedView, selectedView["environment"])],
        ]);

        const builder = new ReactFlowBuilder();
        const visitor = new ReactFlowVisitor(workspace, selectedView, builder);
        const result = viewBuilders.get(selectedView.type)?.accept(visitor);
        const { nodes, edges } = builder.build();

        const pathBuilders: Map<ViewType, ISupportPath> = new Map<ViewType, ISupportPath>([
            [ ViewType.SystemLandscape, new SystemLandscapePathProvider() ],
            [ ViewType.SystemContext, new SystemContextPathProvider() ],
            [ ViewType.Container, new ContainerPathProvider() ],
            [ ViewType.Component, new ComponentPathProvider() ],
            [ ViewType.Deployment, new DeploymentPathProvider() ],
        ]);

        const path = pathBuilders.get(selectedView.type)?.getPath(workspace, selectedView) ?? [];

        setNodes(nodes);
        setEdges(edges);
        setViewPath({ path });
    }, [workspace, selectedView, setViewPath, setNodes, setEdges])

    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange
    }
}
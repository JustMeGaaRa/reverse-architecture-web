import {
    ComponentViewStrategy,
    ContainerViewStrategy,
    DeploymentViewStrategy,
    SystemContextViewStrategy,
    SystemLandscapeViewStrategy,
    IViewStrategy,
    ViewType,
} from "@structurizr/dsl";
import { useEdgesState, useNodesState } from "@reactflow/core";
import { useEffect } from "react";
import { ReactFlowJsonObjectBuilder } from "../services/ReactFlowJsonObjectBuilder";
import { ReactFlowVisitor } from "../services/ReactFlowVisitor";
import { useWorkspaceStore } from "../store/useWorkspaceStore";

export const useSelectedViewGraph = () => {
    const { workspace, selectedView, setViewPath } = useWorkspaceStore();
    const [ nodes, setNodes, onNodesChange ] = useNodesState([]);
    const [ edges, setEdges, onEdgesChange ] = useEdgesState([]);

    useEffect(() => {
        if (!workspace || !selectedView) return;

        const viewBuilders: Map<ViewType, IViewStrategy> = new Map<ViewType, IViewStrategy>([
            [ ViewType.SystemLandscape, new SystemLandscapeViewStrategy(workspace, selectedView) ],
            [ ViewType.SystemContext, new SystemContextViewStrategy(workspace, selectedView) ],
            [ ViewType.Container, new ContainerViewStrategy(workspace, selectedView) ],
            [ ViewType.Component, new ComponentViewStrategy(workspace, selectedView) ],
            [ ViewType.Deployment, new DeploymentViewStrategy(workspace, selectedView, selectedView["environment"])],
        ]);

        const builder = new ReactFlowJsonObjectBuilder();
        const visitor = new ReactFlowVisitor(workspace, selectedView, builder);
        const viewBuilder = viewBuilders.get(selectedView.type);
        viewBuilder.accept(visitor);
        const { nodes, edges } = builder.build();

        const pathBuilders: Map<ViewType, any> = new Map<ViewType, any>([
            [ ViewType.SystemLandscape, undefined ],
            [ ViewType.SystemContext, undefined ],
            [ ViewType.Container, undefined ],
            [ ViewType.Component, undefined ],
            [ ViewType.Deployment, undefined ],
        ]);

        const pathBuilder = viewBuilders.get(selectedView.type);
        const path = pathBuilder.getPath();

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
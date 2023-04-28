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
import { ReactFlowVisitor } from "../services/ReactFlowVisitor";
import { useWorkspaceStore } from "../store";

export const useSelectedViewGraph = () => {
    const { workspace, selectedView, setViewPath } = useWorkspaceStore();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        if (!workspace || !selectedView) return;
        
        const viewFunctions: Map<ViewType, IViewStrategy> = new Map<ViewType, IViewStrategy>([
            [ ViewType.SystemLandscape, new SystemLandscapeViewStrategy(workspace, selectedView) ],
            [ ViewType.SystemContext, new SystemContextViewStrategy(workspace, selectedView) ],
            [ ViewType.Container, new ContainerViewStrategy(workspace, selectedView) ],
            [ ViewType.Component, new ComponentViewStrategy(workspace, selectedView) ],
            [ ViewType.Deployment, new DeploymentViewStrategy(workspace, selectedView, selectedView["environment"])],
        ]);

        const visitor = new ReactFlowVisitor(workspace, selectedView);
        viewFunctions.get(selectedView.type).accept(visitor);
        const path = viewFunctions.get(selectedView.type).getPath();
        const { nodes, edges } = visitor.getGraph();

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
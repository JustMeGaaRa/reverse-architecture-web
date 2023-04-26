import {
    ComponentViewStrategy,
    ContainerViewStrategy,
    DeploymentViewStrategy,
    SystemContextViewStrategy,
    SystemLandscapeViewStrategy,
    IViewStrategy,
    ViewType
} from "@structurizr/dsl";
import { useEdgesState, useNodesState } from "@reactflow/core";
import { useEffect } from "react";
import { ReactFlowVisitor } from "../services/ReactFlowVisitor";
import { useWorkspaceStore } from "../store";

export const useSelectedView = () => {
    const { workspace, selectedView, setSelectedView, setViewPath } = useWorkspaceStore();
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

        // const selectedView = 
        //     workspace.views.systemContexts.find(x => x.type === currentView.type && x.identifier === currentView.identifier)
        //     ?? workspace.views.containers.find(x => x.type === currentView.type && x.identifier === currentView.identifier)
        //     ?? workspace.views.components.find(x => x.type === currentView.type && x.identifier === currentView.identifier)
        //     ?? currentView;

        // setSelectedView(selectedView);
        setNodes(nodes);
        setEdges(edges);
        setViewPath({ path });
    }, [workspace, selectedView, setSelectedView, setViewPath, setNodes, setEdges])

    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange
    }
}
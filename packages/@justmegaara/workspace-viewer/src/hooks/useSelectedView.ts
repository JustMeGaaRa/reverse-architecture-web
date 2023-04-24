import {
    ComponentViewBuilder,
    ContainerViewBuilder,
    DeploymentViewBuilder,
    IViewBuilder,
    SystemContextViewBuilder,
    SystemLandscapeViewBuilder,
    ViewType
} from "@justmegaara/structurizr-dsl";
import { useEffect, useState } from "react";
import { ReactFlowVisitor } from "../services/ReactFlowVisitor";
import { useWorkspaceStore } from "../store";

export const useSelectedView = () => {
    const { workspace, selectedView, setSelectedView, setViewPath } = useWorkspaceStore();
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        if (!workspace || !selectedView) return;
        
        const viewFunctions: Map<ViewType, IViewBuilder> = new Map<ViewType, IViewBuilder>([
            [ "System Landscape", new SystemLandscapeViewBuilder(workspace, selectedView)],
            [ "System Context", new SystemContextViewBuilder(workspace, selectedView) ],
            [ "Container", new ContainerViewBuilder(workspace, selectedView) ],
            [ "Component", new ComponentViewBuilder(workspace, selectedView) ],
            [ "Deployment", new DeploymentViewBuilder(workspace, selectedView, "REPLACE")],
        ]);

        const visitor = new ReactFlowVisitor(workspace, selectedView);
        const { viewPath } = viewFunctions.get(selectedView.type).build(visitor);
        const { nodes, edges } = visitor.getReactFlow();
        
        setNodes(nodes);
        setEdges(edges);
        setSelectedView(selectedView);
        setViewPath(viewPath);
    }, [workspace, selectedView, setSelectedView, setViewPath])

    return {
        nodes,
        edges
    }
}
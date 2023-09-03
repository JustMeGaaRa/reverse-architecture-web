import { useReactFlow } from "@reactflow/core";
import { ISupportVisitor } from "@structurizr/dsl";
import { useEffect } from "react";
import { getReactFlowObject } from "../utils";
import { useWorkspaceStore } from "./useWorkspaceStore";

export const useViewRenderingEffect = (strategy: ISupportVisitor) => {
    const { workspace, selectedView } = useWorkspaceStore();
    const { setNodes, setEdges } = useReactFlow();

    // NOTE: we need to re-render the view when the selected view changes ONLY
    useEffect(() => {
        const reactFlowObject = getReactFlowObject(
            strategy,
            workspace.model,
            workspace.views.configuration,
            selectedView
        );
        setNodes(reactFlowObject.nodes);
        setEdges(reactFlowObject.edges);
    }, [selectedView]);
}
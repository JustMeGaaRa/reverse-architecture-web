import { useReactFlow } from "@reactflow/core";
import { ISupportVisitor, Workspace } from "@structurizr/dsl";
import { useEffect } from "react";
import { useWorkspaceNavigation } from "../hooks";
import { getReactFlowAuto, getReactFlowObject, getViewDefinition } from "../utils";

export const useViewRenderingEffect = (workspace: Workspace, strategy: ISupportVisitor) => {
    const { currentView } = useWorkspaceNavigation();
    const { setNodes, setEdges } = useReactFlow();

    // NOTE: we need to re-render the view ONLY when the selected view changes
    useEffect(() => {
        const viewDefinition = getViewDefinition(workspace, currentView);
        const reactFlowObject = getReactFlowObject(
            strategy,
            workspace.model,
            workspace.views.configuration,
            viewDefinition
        );

        const shouldAutoLayout = currentView?.autoLayout || currentView?.elements?.length === 0;
        
        if (shouldAutoLayout) {
            getReactFlowAuto(reactFlowObject)
                .then(reactFlowAuto => {
                    setNodes(reactFlowAuto.nodes);
                    setEdges(reactFlowAuto.edges);
                });
        }
        else {
            setNodes(reactFlowObject.nodes);
            setEdges(reactFlowObject.edges);
        }
        
    }, [currentView]);
}
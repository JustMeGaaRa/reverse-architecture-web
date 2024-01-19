import { useReactFlow } from "@reactflow/core";
import { ISupportVisitor, IWorkspace } from "@structurizr/dsl";
import { useWorkspaceNavigation } from "@workspace/core";
import { useEffect } from "react";
import { getReactFlowAuto, getReactFlowObject } from "../utils";

export const useViewRenderingEffect = (workspace: IWorkspace, strategy: ISupportVisitor) => {
    const { currentView } = useWorkspaceNavigation();
    const { setNodes, setEdges } = useReactFlow();

    // NOTE: we need to re-render the view ONLY when the selected view changes
    useEffect(() => {
        const reactFlowObject = getReactFlowObject(
            strategy,
            workspace.model,
            workspace.views.configuration,
            currentView
        );

        const shouldAutoLayout =
            currentView?.autoLayout !== null
            && currentView?.autoLayout !== undefined;
        
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
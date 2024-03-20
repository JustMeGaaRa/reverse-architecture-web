import { useReactFlow } from "@reactflow/core";
import { IViewDefinition, IWorkspaceSnapshot } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { useEffect } from "react";
import { ElkjsAutoLayoutStrategy } from "../types";
import { getReactFlowObject } from "../utils";
import { useViewStrategy } from "./useViewStrategy";

export const useViewRenderingEffect = (currentView: IViewDefinition) => {
    const { workspace } = useWorkspace();
    const { strategy } = useViewStrategy();
    const { setNodes, setEdges } = useReactFlow();

    // NOTE: we need to re-render the view ONLY when the selected view changes
    useEffect(() => {
        const reactFlowObject = getReactFlowObject(strategy, workspace, currentView);
        const autoLayoutStrategy = new ElkjsAutoLayoutStrategy();
        
        if (!!currentView?.autoLayout) {
            autoLayoutStrategy.execute(reactFlowObject)
                .then(reactFlowAuto => {
                    setNodes(reactFlowAuto.nodes);
                    setEdges(reactFlowAuto.edges);
                });
        }
        else {
            setNodes(reactFlowObject.nodes);
            setEdges(reactFlowObject.edges);
        }
        
        return () => {
            setNodes([]);
            setEdges([]);
        }
    }, [setNodes, setEdges, workspace, currentView, strategy]);
}
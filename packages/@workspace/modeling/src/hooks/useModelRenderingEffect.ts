import { useReactFlow } from "@reactflow/core";
import { ISupportVisitor, IWorkspace } from "@structurizr/dsl";
import { useEffect } from "react";
import { getReactFlowAuto, getReactFlowObject } from "../utils";

export const useModelRenderingEffect = (workspace: IWorkspace, strategy: ISupportVisitor) => {
    const { setNodes, setEdges } = useReactFlow();
    
    // NOTE: we need to re-render the view ONLY when the model changes
    useEffect(() => {
        const reactFlowObject = getReactFlowObject(strategy, workspace);

        getReactFlowAuto(reactFlowObject)
            .then(reactFlowAuto => {
                setNodes(reactFlowAuto.nodes);
                setEdges(reactFlowAuto.edges);
            });
    }, [workspace.model]);
}
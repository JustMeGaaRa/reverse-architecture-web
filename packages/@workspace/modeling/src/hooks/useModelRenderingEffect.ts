import { useReactFlow } from "@reactflow/core";
import { ISupportVisitor, IWorkspaceSnapshot } from "@structurizr/dsl";
import { useEffect } from "react";
import { getReactFlowModelAuto, getReactFlowModelObject } from "../utils";

export const useModelRenderingEffect = (workspace: IWorkspaceSnapshot, strategy: ISupportVisitor) => {
    const { setNodes, setEdges } = useReactFlow();
    
    // NOTE: we need to re-render the view ONLY when the model changes
    useEffect(() => {
        const reactFlowObject = getReactFlowModelObject(strategy, workspace);

        getReactFlowModelAuto(reactFlowObject)
            .then(reactFlowAuto => {
                setNodes(reactFlowAuto.nodes);
                setEdges(reactFlowAuto.edges);
            });
    }, [setEdges, setNodes, strategy, workspace]);
}
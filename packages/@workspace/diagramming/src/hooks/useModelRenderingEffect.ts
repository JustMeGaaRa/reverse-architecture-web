import { useReactFlow } from "@reactflow/core";
import { useWorkspace } from "@structurizr/react";
import { useEffect } from "react";
import { CustomAutoLayoutStrategy } from "../types";
import { getReactFlowModelObject } from "../utils";
import { useViewStrategy } from "./useViewStrategy";

export const useModelRenderingEffect = () => {
    const { workspace } = useWorkspace();
    const { strategy } = useViewStrategy();
    const { setNodes, setEdges } = useReactFlow();
    
    // NOTE: we need to re-render the view ONLY when the model changes
    useEffect(() => {
        if (strategy) {
            const reactFlowObject = getReactFlowModelObject(strategy, workspace);
            const autoLayoutStrategy = new CustomAutoLayoutStrategy();

            autoLayoutStrategy.execute(reactFlowObject)
                .then(reactFlowAuto => {
                    setNodes(reactFlowAuto.nodes);
                    setEdges(reactFlowAuto.edges);
                });

            return () => {
                setNodes([]);
                setEdges([]);
            }
        }
    }, [setEdges, setNodes, workspace, strategy]);
}
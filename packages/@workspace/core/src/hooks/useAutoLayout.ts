import { useReactFlow } from "@reactflow/core";
import { ElkjsAutoLayoutStrategy } from "@structurizr/elk-layout";
import { useCallback } from "react";

export const useAutoLayout = () => {
    const { setNodes, setEdges, toObject } = useReactFlow();

    const autoLayout = useCallback(() => {
        const reactFlowObject = toObject();
        const autoLayoutStrategy = new ElkjsAutoLayoutStrategy();
        autoLayoutStrategy.execute(reactFlowObject)
            .then(reactFlowAuto => {
                setNodes(reactFlowAuto.nodes);
                setEdges(reactFlowAuto.edges);
            });
    }, [setEdges, setNodes, toObject]);

    return { autoLayout }
}
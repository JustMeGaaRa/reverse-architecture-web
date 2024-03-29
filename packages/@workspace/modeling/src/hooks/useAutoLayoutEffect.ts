import { useReactFlow } from "@reactflow/core";
import { useWorkspace } from "@workspace/core";
import { useEffect } from "react";
import { getReactFlowModelAuto } from "../utils";

export const useModelAutoLayoutEffect = () => {
    const { workspace } = useWorkspace();
    const { toObject, setNodes, setEdges } = useReactFlow();

    // NOTE: this effect will triggern whenever the selectedView changes
    useEffect(() => {
        const reactFlowObject = toObject();
        
        getReactFlowModelAuto(reactFlowObject)
            .then(reactFlowAuto => {
                setNodes(reactFlowAuto.nodes);
                setEdges(reactFlowAuto.edges);
            });
    }, [workspace?.model, setEdges, setNodes, toObject])
}
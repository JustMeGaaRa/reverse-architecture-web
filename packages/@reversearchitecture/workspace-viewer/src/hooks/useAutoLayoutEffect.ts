import { ReactFlowJsonObject, useReactFlow } from "@reactflow/core";
import { useEffect } from "react";
import { useWorkspaceStore } from "../hooks";
import { AutoLayout } from "../types";

export const useAutoLayoutEffect = () => {
    const { selectedView } = useWorkspaceStore();
    const { toObject, setNodes, setEdges } = useReactFlow();

    // NOTE: this effect will triggern whenever the selectedView changes
    useEffect(() => {
        const getReactFlowAuto = async (reactFlowObject: ReactFlowJsonObject) => {
            const autoLayout = new AutoLayout();
            const reactFlowAuto = await autoLayout.execute(reactFlowObject);
            return reactFlowAuto;
        }

        const shouldAutoLayout = selectedView.autoLayout || selectedView.elements.length === 0;
        
        if (shouldAutoLayout) {
            const reactFlowObject = toObject();
            
            getReactFlowAuto(reactFlowObject)
                .then(reactFlowAuto => {
                    setNodes(reactFlowAuto.nodes);
                    setEdges(reactFlowAuto.edges);
                });
        }
    }, [selectedView, setEdges, setNodes, toObject])
}
import { ReactFlowJsonObject, useReactFlow } from "@reactflow/core";
import { AutoLayout } from "@workspace/core";
import { useEffect } from "react";
import { useWorkspaceNavigation } from "./useWorkspaceNavigation";

export const useAutoLayoutEffect = () => {
    const { currentView } = useWorkspaceNavigation();
    const { toObject, setNodes, setEdges } = useReactFlow();

    // NOTE: this effect will triggern whenever the selectedView changes
    useEffect(() => {
        const getReactFlowAuto = async (reactFlowObject: ReactFlowJsonObject) => {
            const autoLayout = new AutoLayout();
            const reactFlowAuto = await autoLayout.execute(reactFlowObject);
            return reactFlowAuto;
        }

        const shouldAutoLayout = currentView?.autoLayout || currentView?.elements?.length === 0;
        
        if (shouldAutoLayout) {
            const reactFlowObject = toObject();
            
            getReactFlowAuto(reactFlowObject)
                .then(reactFlowAuto => {
                    setNodes(reactFlowAuto.nodes);
                    setEdges(reactFlowAuto.edges);
                });
        }
    }, [currentView, setEdges, setNodes, toObject])
}
import { ReactFlowState, useStore, useStoreApi } from "@reactflow/core";
import { useCallback, useState } from "react";

enum InteractionMode {
    Build = "build",
    Explore = "explore"
}

export const useInteractionMode = () => {
    const [mode, setMode] = useState(InteractionMode.Build);
    const { setState } = useStoreApi();
    
    const isInteractiveSelector = (flow: ReactFlowState) => {
        return flow.nodesDraggable
            && flow.nodesConnectable;
    };
    const isInteractive = useStore(isInteractiveSelector);

    const toggleMode = useCallback(() => {
        setState({
            nodesDraggable: !isInteractive,
            nodesConnectable: !isInteractive,
            // elementsSelectable: !isInteractive,
        });
        setMode(mode === InteractionMode.Build
            ? InteractionMode.Explore
            : InteractionMode.Build
        );
    }, [setState, mode, isInteractive]);

    return {
        mode,
        isPresentationMode: mode === InteractionMode.Explore,
        isBuilderMode: mode === InteractionMode.Build,
        toggleMode
    };
}
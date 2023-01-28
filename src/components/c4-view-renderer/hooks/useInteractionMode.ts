import { useCallback, useState } from "react";
import { ReactFlowState, useStore, useStoreApi } from "@reactflow/core";

enum InteractionMode {
    Build = "build",
    Explore = "explore"
}

const useInteractionMode = () => {
    const isInteractiveSelector = (flowState: ReactFlowState) => {
        return flowState.nodesDraggable
            && flowState.nodesConnectable
            && flowState.elementsSelectable;
    };

    const [mode, setMode] = useState(InteractionMode.Build);
    const { setState } = useStoreApi();
    const isInteractive = useStore(isInteractiveSelector);

    const toggleMode = useCallback(() => {
        setState({
            nodesDraggable: !isInteractive,
            nodesConnectable: !isInteractive,
            elementsSelectable: !isInteractive,
        });
        setMode(mode === InteractionMode.Build
            ? InteractionMode.Explore
            : InteractionMode.Build
        );
    }, [setState, mode, isInteractive]);

    return {
        mode,
        toggleMode
    };
}

export { useInteractionMode };
import { useReactFlow, useStore, getRectOfNodes } from "@reactflow/core";
import { useCallback } from "react";

export const useZoom = () => {
    const zoom = useStore((state) => (state.transform[2] * 100));
    const { getNodes, zoomTo, zoomIn, zoomOut, fitView, setCenter } = useReactFlow();

    const focusCenter = useCallback(() => {
        const rect = getRectOfNodes(getNodes());
        const x = rect.x + rect.width / 2;
        const y = rect.y + rect.height / 2;
        setCenter(x, y, { zoom: 1, duration: 500 });
    }, [getNodes, setCenter])

    return {
        zoom,
        zoomTo,
        zoomIn,
        zoomOut,
        fitView,
        focusCenter,
        setCenter
    }
}
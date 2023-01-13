import { useCallback } from "react";

export const useDragAndDrop = (
    mediaFormat: string,
    onDropHandler: (positon, data) => void
) => {
    const onDragStart = useCallback((event, data) => {
        event.dataTransfer.setData(mediaFormat, data);
        event.dataTransfer.effectAllowed = "move";
    }, [mediaFormat]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback((event) => {
        event.preventDefault();
        const position = { x: event.clientX, y: event.clientY };
        const data = event.dataTransfer.getData(mediaFormat);
        onDropHandler(position, data);
    }, [onDropHandler, mediaFormat]);
    
    return {
        onDragStart,
        onDragOver,
        onDrop
    }
}
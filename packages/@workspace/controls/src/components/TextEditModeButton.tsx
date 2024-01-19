import { IconButton } from "@chakra-ui/react";
import { Text } from "iconoir-react";
import { CursorPointer, DragHandGesture } from "iconoir-react";
import { FC, useCallback } from "react";
import { useDraggingMode, useSelectionMode, useTextEditMode } from "../hooks";

export const TextEditModeButton: FC = () => {
    const { isTextEditEnabled, enableTextEditMode } = useTextEditMode();

    const handleOnTextEditModeClick = useCallback(() => {
        enableTextEditMode();
    }, [enableTextEditMode]);

    return (
        <IconButton
            aria-label={"text edit mode"}
            aria-selected={isTextEditEnabled}
            icon={<Text />}
            title={"text edit mode"}
            onClick={handleOnTextEditModeClick}
        />
    )
}

export const SelectionModeButton: FC = () => {
    const { isSelectionModeEnabled, enableSelectionMode } = useSelectionMode();

    const handleOnSelectionModeClick = useCallback(() => {
        enableSelectionMode()
    }, [enableSelectionMode]);

    return (
        <IconButton
            aria-label={"selection mode"}
            aria-selected={isSelectionModeEnabled}
            icon={<CursorPointer />}
            title={"selection mode"}
            onClick={handleOnSelectionModeClick}
        />
    )
}

export const DraggingModeButton: FC = () => {
    const { isDraggingModeEnabled, enableDraggingMode } = useDraggingMode();
    
    const handleOnDraggingModeClick = useCallback(() => {
        enableDraggingMode();
    }, [enableDraggingMode]);

    return (
        <IconButton
            aria-label={"dragging mode"}
            aria-selected={isDraggingModeEnabled}
            icon={<DragHandGesture />}
            title={"dragging mode"}
            onClick={handleOnDraggingModeClick}
        />
    )
}
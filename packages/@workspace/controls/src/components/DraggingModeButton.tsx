import { IconButton } from "@chakra-ui/react";
import { DragHandGesture } from "iconoir-react";
import { FC } from "react";
import { useDraggingMode } from "../hooks";

export const DraggingModeButton: FC = () => {
    const { isDraggingEnabled, enableDraggingMode } = useDraggingMode();
    
    return (
        <IconButton
            aria-label={"dragging mode"}
            aria-selected={isDraggingEnabled}
            icon={<DragHandGesture />}
            title={"dragging mode"}
            onClick={() => enableDraggingMode()}
        />
    )
}
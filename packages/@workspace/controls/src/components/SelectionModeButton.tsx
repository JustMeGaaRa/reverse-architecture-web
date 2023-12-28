import { IconButton } from "@chakra-ui/react";
import { CursorPointer } from "iconoir-react";
import { FC } from "react";
import { useSelectionMode } from "../hooks";

export const SelectionModeButton: FC = () => {
    const { isSelectionEnabled, enableSelectionMode } = useSelectionMode();
    
    return (
        <IconButton
            aria-label={"selection mode"}
            aria-selected={isSelectionEnabled}
            icon={<CursorPointer />}
            title={"selection mode"}
            onClick={() => enableSelectionMode()}
        />
    )
}
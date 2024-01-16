import { Icon, IconButton } from "@chakra-ui/react";
import { useWorkspace } from "@workspace/core";
import { Undo } from "iconoir-react";
import { FC, useCallback } from "react";

export const ActionUndoButton: FC = () => {
    const { undoManager } = useWorkspace();

    const handleOnUndoClick = useCallback(() => {
        undoManager?.undo();
    }, [undoManager]);

    return (
        <IconButton
            aria-label={"undo last change"}
            isDisabled={!undoManager.canUndo()}
            icon={<Icon as={Undo} boxSize={6} />}
            title={"undo last change"}
            onClick={handleOnUndoClick}
        />
    )
}
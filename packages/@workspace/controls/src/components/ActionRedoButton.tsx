import { Icon, IconButton } from "@chakra-ui/react";
import { useWorkspace } from "@workspace/core";
import { Redo } from "iconoir-react";
import { FC, useCallback } from "react";

export const ActionRedoButton: FC = () => {
    const { undoManager } = useWorkspace();

    const handleOnRedoClick = useCallback(() => {
        undoManager?.redo();
    }, [undoManager]);

    return (
        <IconButton
            aria-label={"redo last change"}
            isDisabled={!undoManager.canRedo()}
            icon={<Icon as={Redo} boxSize={6} />}
            title={"redo last change"}
            onClick={handleOnRedoClick}
        />
    )
}
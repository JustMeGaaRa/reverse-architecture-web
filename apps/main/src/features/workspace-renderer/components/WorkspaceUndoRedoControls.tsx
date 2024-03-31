import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Toolbar, ToolbarSection } from "@restruct/ui";
import { PanelPosition, WorkspacePanel } from "@structurizr/react";
import { useYjsCollaborative } from "@yjs/react";
import { Redo, Undo } from "iconoir-react";
import { FC, useCallback } from "react";

export const WorkspaceUndoRedoControls: FC<{
    position?: PanelPosition;
    isVisible?: boolean;
}> = ({
    position,
    isVisible = true
}) => {
    const { undoManager } = useYjsCollaborative();

    const handleOnUndoClick = useCallback(() => undoManager.undo(), [undoManager]);
    const handleOnRedoClick = useCallback(() => undoManager.redo(), [undoManager]);

    return isVisible && (
        <WorkspacePanel position={position ?? "bottom-left"}>
            <Toolbar>
                <ToolbarSection>
                    <Tooltip label={"Undo"}>
                        <IconButton
                            aria-label={"undo last change"}
                            isDisabled={!undoManager?.canUndo()}
                            icon={<Icon as={Undo} boxSize={6} />}
                            title={"undo last change"}
                            onClick={handleOnUndoClick}
                        />
                    </Tooltip>
                </ToolbarSection>
                <ToolbarSection>
                    <Tooltip label={"Redo"}>
                        <IconButton
                            aria-label={"redo last change"}
                            isDisabled={!undoManager?.canRedo()}
                            icon={<Icon as={Redo} boxSize={6} />}
                            title={"redo last change"}
                            onClick={handleOnRedoClick}
                        />
                    </Tooltip>
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}
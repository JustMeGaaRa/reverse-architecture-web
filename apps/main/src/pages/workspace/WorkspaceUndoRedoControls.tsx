import { Icon, IconButton } from "@chakra-ui/react";
import { PanelPosition, Toolbar, ToolbarSection, WorkspacePanel, useWorkspace } from "workspace";
import { Redo, Undo } from "iconoir-react";
import { FC, useCallback } from "react";

export const WorkspaceUndoRedoControls: FC<{
    position?: PanelPosition;
    isVisible?: boolean;
}> = ({
    position,
    isVisible = true
}) => {
    const { undoManager } = useWorkspace();

    const handleOnUndoClick = useCallback(() => undoManager.undo(), [undoManager]);
    const handleOnRedoClick = useCallback(() => undoManager.redo(), [undoManager]);

    return isVisible && (
        <WorkspacePanel position={position ?? "bottom-left"}>
            <Toolbar>
                <ToolbarSection>
                    <IconButton
                        aria-label={"undo last change"}
                        isDisabled={!undoManager.canUndo()}
                        icon={<Icon as={Undo} boxSize={6} />}
                        title={"undo last change"}
                        onClick={handleOnUndoClick}
                    />
                </ToolbarSection>
                <ToolbarSection>
                    <IconButton
                        aria-label={"redo last change"}
                        isDisabled={!undoManager.canRedo()}
                        icon={<Icon as={Redo} boxSize={6} />}
                        title={"redo last change"}
                        onClick={handleOnRedoClick}
                    />
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}
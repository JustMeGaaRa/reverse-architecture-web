import { ActionRedoButton, ActionUndoButton } from "@workspace/controls";
import { PanelPosition, WorkspacePanel } from "@workspace/core";
import { Toolbar, ToolbarSection } from "@workspace/toolbar";
import { FC } from "react";

export const WorkspaceUndoRedoControls: FC<{
    position?: PanelPosition;
}> = ({
    position
}) => {
    return (
        <WorkspacePanel position={position ?? "bottom-left"}>
            <Toolbar>
                <ToolbarSection>
                    <ActionUndoButton />
                </ToolbarSection>
                <ToolbarSection>
                    <ActionRedoButton />
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}
import { IconButton } from "@chakra-ui/react";
import { PanelPosition, WorkspacePanel } from "@workspace/core";
import { Toolbar, ToolbarSection } from "@workspace/toolbar";
import { Redo, Undo } from "iconoir-react";
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
                    <IconButton
                        aria-label={"undo last change"}
                        icon={<Undo />}
                        title={"undo last change"}
                    />
                    <IconButton
                        aria-label={"redo last change"}
                        icon={<Redo />}
                        title={"redo last change"}
                    />
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}
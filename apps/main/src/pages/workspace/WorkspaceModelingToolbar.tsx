import {
    AssistantModeButton,
    CommentingModeButton,
    DraggingModeButton,
    SelectionModeButton,
    TextEditModeButton
} from "@workspace/controls";
import { PanelPosition, WorkspacePanel } from "@workspace/core";
import { PresentationModeButton } from "@workspace/live";
import { Toolbar, ToolbarSection } from "@workspace/toolbar";
import { FC } from "react";

export const WorkspaceModelingToolbar: FC<{
    position?: PanelPosition;
}> = ({
    position
}) => {
    return (
        <WorkspacePanel position={position ?? "bottom-center"}>
            <Toolbar>
                <ToolbarSection>
                    <SelectionModeButton />
                    <DraggingModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    <TextEditModeButton />
                    <CommentingModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    <PresentationModeButton />
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}
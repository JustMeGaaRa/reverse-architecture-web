import { AssistantModeButton, CommentingModeButton, DraggingModeButton, FollowPresenterModeButton, PresentationModeButton, SelectionModeButton, TextEditModeButton } from "@workspace/controls";
import { PanelPosition, WorkspacePanel } from "@workspace/core";
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
                    <FollowPresenterModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    <TextEditModeButton />
                    <CommentingModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    <AssistantModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    <PresentationModeButton />
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}
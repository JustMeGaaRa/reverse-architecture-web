import { FC } from "react";
import { CommentingModeButton, DraggingModeButton, PresentationModeButton, Toolbar, ToolbarSection, usePresentationMode, WorkspacePanel } from "workspace";

export const PresentationToolbar: FC<{
    isVisible?: boolean;
}> = ({
    isVisible = false
}) => {
    return isVisible && (
        <WorkspacePanel position={"bottom-center"}>
            <Toolbar>
                <ToolbarSection>
                    <DraggingModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    <CommentingModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    <PresentationModeButton />
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}
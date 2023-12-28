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
                    </ToolbarSection>
                </Toolbar>
        </WorkspacePanel>
    )
}
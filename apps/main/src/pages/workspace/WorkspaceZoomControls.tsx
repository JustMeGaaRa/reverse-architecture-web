import { PanelPosition, WorkspacePanel } from "@workspace/core";
import { Toolbar, ToolbarSection } from "@workspace/toolbar";
import { ZoomInButton, ZoomOptionsMenu, ZoomOutButton } from "@workspace/controls";
import { FC } from "react";

export const WorkspaceZoomControls: FC<{
    position?: PanelPosition;
}> = ({
    position
}) => {
    return (
        <WorkspacePanel position={position ?? "bottom-right"}>
            <Toolbar>
                <ToolbarSection>
                    <ZoomOutButton />
                    <ZoomOptionsMenu />
                    <ZoomInButton />
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}
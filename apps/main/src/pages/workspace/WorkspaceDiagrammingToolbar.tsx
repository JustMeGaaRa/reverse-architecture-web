import { Icon } from "@chakra-ui/react";
import {
    AssistantModeButton,
    CommentingModeButton,
    ConnectionModeButton,
    DraggingModeButton,
    ElementComponentModeButton,
    ElementContainerModeButton,
    ElementDeploymentNodeModeButton,
    ElementInfrastructureNodeModeButton,
    ElementPersonModeButton,
    ElementSoftwareSystemModeButton,
    SelectionModeButton,
    TextEditModeButton
} from "@workspace/controls";
import { PanelPosition, WorkspacePanel } from "@workspace/core";
import { PresentationModeButton } from "@workspace/live";
import {
    Toolbar,
    ToolbarSubmenuTrigger,
    ToolbarSection,
    ToolbarSubmenu,
    ToolbarSubmenuContent,
} from "@workspace/toolbar";
import { Component } from "iconoir-react";
import { FC } from "react";

export const WorkspaceDiagrammingToolbar: FC<{
    position?: PanelPosition;
    isVisible?: boolean;
}> = ({
    position,
    isVisible = true
}) => {
    return isVisible && (
        <WorkspacePanel position={position ?? "bottom-center"}>
            <Toolbar>
                <ToolbarSection>
                    <SelectionModeButton />
                    <DraggingModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    <ToolbarSubmenu>
                        <ToolbarSubmenuTrigger
                            aria-label={"shapes submenu"}
                            icon={<Icon as={Component} boxSize={6} />}
                        />
                        <ToolbarSubmenuContent>
                            <ToolbarSection>
                                <ElementPersonModeButton />
                                <ElementSoftwareSystemModeButton />
                                <ElementContainerModeButton />
                                <ElementComponentModeButton />
                                <ElementInfrastructureNodeModeButton />
                                <ElementDeploymentNodeModeButton />
                            </ToolbarSection>
                        </ToolbarSubmenuContent>
                    </ToolbarSubmenu>

                    <TextEditModeButton />
                    <ConnectionModeButton />
                    <CommentingModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    <PresentationModeButton />
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}
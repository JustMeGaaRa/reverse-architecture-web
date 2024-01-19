import { Icon, IconButton } from "@chakra-ui/react";
import { ViewType } from "structurizr";
import {
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
    TextEditModeButton,
    useDraggingMode
} from "@workspace/controls";
import {
    PanelPosition,
    Toolbar,
    ToolbarSubmenuTrigger,
    ToolbarSection,
    ToolbarSubmenu,
    ToolbarSubmenuContent,
    useSelectionMode,
    useWorkspaceNavigation,
    usePresentationMode,
    WorkspacePanel,
    useWorkspaceRoom,
} from "workspace";
import { Component, Play, Xmark } from "iconoir-react";
import { FC, useCallback } from "react";

export const WorkspaceActionsToolbar: FC<{
    position?: PanelPosition;
    isVisible?: boolean;
}> = ({
    position,
    isVisible = true
}) => {
    const { currentView } = useWorkspaceNavigation();
    const { currentUser } = useWorkspaceRoom();
    const { presentationEnabled, presenterInfo, startPresenting, stopPresenting } = usePresentationMode();
    const { enableSelectionMode } = useSelectionMode();
    const { enableDraggingMode } = useDraggingMode()

    const handleOnStartPresenting = useCallback(() => {
        startPresenting();
        enableDraggingMode()
    }, [enableDraggingMode, startPresenting]);

    const handleOnStopPresenting = useCallback(() => {
        stopPresenting();
        enableSelectionMode();
    }, [enableSelectionMode, stopPresenting]);

    return isVisible && (
        <WorkspacePanel position={position ?? "bottom-center"}>
            <Toolbar>
                <ToolbarSection>
                    {!presentationEnabled && (
                        <SelectionModeButton />
                    )}
                    <DraggingModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    {!presentationEnabled && currentView?.type !== ViewType.Model && (
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
                    )}

                    <TextEditModeButton />
                    {!presentationEnabled && currentView?.type !== ViewType.Model && (
                        <ConnectionModeButton />
                    )}
                    <CommentingModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    {presentationEnabled && currentUser.info?.username === presenterInfo?.username ? (
                        <IconButton
                            aria-label={"stop presenting"}
                            icon={<Xmark />}
                            title={"stop presenting"}
                            onClick={handleOnStopPresenting}
                        />
                    ) : (
                        <IconButton
                            aria-label={"start presenting"}
                            icon={<Play />}
                            title={"start presenting"}
                            onClick={handleOnStartPresenting}
                        />
                    )}
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}
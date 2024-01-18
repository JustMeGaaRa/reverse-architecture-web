import { Icon, IconButton } from "@chakra-ui/react";
import { ViewType } from "structurizr";
import {
    CommentingModeButton,
    ConnectionModeButton,
    ElementComponentModeButton,
    ElementContainerModeButton,
    ElementDeploymentNodeModeButton,
    ElementInfrastructureNodeModeButton,
    ElementPersonModeButton,
    ElementSoftwareSystemModeButton,
    TextEditModeButton
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
    useWorkspaceRoom
} from "workspace";
import { Component, CursorPointer, DragHandGesture, Play, Xmark } from "iconoir-react";
import { FC, useCallback } from "react";

export const SelectionModeButton: FC = () => {
    const { isSelectionEnabled, setSelectionMode } = useSelectionMode();

    const handleOnSelectionModeClick = useCallback(() => {
        setSelectionMode(state => !state);
    }, [setSelectionMode]);
    
    return (
        <IconButton
            aria-label={"selection mode"}
            aria-selected={isSelectionEnabled}
            icon={<CursorPointer />}
            title={"selection mode"}
            onClick={handleOnSelectionModeClick}
        />
    )
}

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
    const { isSelectionEnabled, setSelectionMode } = useSelectionMode();

    const isDiagrammingView = currentView?.type !== ViewType.Model && currentView?.type !== ViewType.SystemLandscape && currentView?.type !== ViewType.Deployment;
    const isModelingView = currentView?.type === ViewType.Model;
    const isDeploymentView = currentView?.type === ViewType.Deployment;

    const handleOnSelectionModeClick = useCallback(() => {
        setSelectionMode(true);
    }, [setSelectionMode]);

    const handleOnDraggingModeClick = useCallback(() => {
        setSelectionMode(false);
    }, [setSelectionMode]);

    const handleOnStartPresenting = useCallback(() => {
        startPresenting();
        setSelectionMode(false);
    }, [setSelectionMode, startPresenting]);

    const handleOnStopPresenting = useCallback(() => {
        stopPresenting();
        setSelectionMode(true);
    }, [setSelectionMode, stopPresenting]);

    return isVisible && (
        <WorkspacePanel position={position ?? "bottom-center"}>
            <Toolbar>
                <ToolbarSection>
                    {/* TODO: hide selection button in presentation mode */}
                    {!presentationEnabled && (
                        <IconButton
                            aria-label={"selection mode"}
                            aria-selected={isSelectionEnabled}
                            icon={<CursorPointer />}
                            title={"selection mode"}
                            onClick={handleOnSelectionModeClick}
                        />
                    )}
                    <IconButton
                        aria-label={"dragging mode"}
                        aria-selected={!isSelectionEnabled}
                        icon={<DragHandGesture />}
                        title={"dragging mode"}
                        onClick={handleOnDraggingModeClick}
                    />
                </ToolbarSection>

                <ToolbarSection>
                    {/* TODO: hide submenu button in presentation mode */}
                    {!presentationEnabled && !isModelingView && (
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
                    {/* TODO: hide connection button in modeling and presentation modes */}
                    {!presentationEnabled && !isModelingView && (
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
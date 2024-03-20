import { Icon, IconButton, Text } from "@chakra-ui/react";
import {
    Toolbar,
    ToolbarSection,
    ToolbarSubmenu,
    ToolbarSubmenuContent,
    ToolbarSubmenuTrigger
} from "@restruct/ui";
import { ElementType, ViewType } from "@structurizr/dsl";
import {
    PanelPosition,
    useWorkspaceNavigation,
    usePresentationMode,
    WorkspacePanel,
    useWorkspaceRoom,
    useSelectionMode,
    useDraggingMode,
    useTextEditMode,
    useWorkspaceToolbarStore,
    useCommentingMode,
    useAddingElementMode,
} from "@workspace/react";
import { ChatPlusIn, Component, CursorPointer, DragHandGesture, Keyframe, KeyframePlusIn, Keyframes, KeyframesCouple, Linear, MagicWand, Play, User, Xmark } from "iconoir-react";
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

export const TextEditModeButton: FC = () => {
    const { isTextEditEnabled, enableTextEditMode } = useTextEditMode();

    const handleOnTextEditModeClick = useCallback(() => {
        enableTextEditMode();
    }, [enableTextEditMode]);

    return (
        <IconButton
            aria-label={"text edit mode"}
            aria-selected={isTextEditEnabled}
            icon={<Text />}
            title={"text edit mode"}
            onClick={handleOnTextEditModeClick}
        />
    )
}

export const SelectionModeButton: FC = () => {
    const { isSelectionModeEnabled, enableSelectionMode } = useSelectionMode();

    const handleOnSelectionModeClick = useCallback(() => {
        enableSelectionMode()
    }, [enableSelectionMode]);

    return (
        <IconButton
            aria-label={"selection mode"}
            aria-selected={isSelectionModeEnabled}
            icon={<CursorPointer />}
            title={"selection mode"}
            onClick={handleOnSelectionModeClick}
        />
    )
}

export const DraggingModeButton: FC = () => {
    const { isDraggingModeEnabled, enableDraggingMode } = useDraggingMode();
    
    const handleOnDraggingModeClick = useCallback(() => {
        enableDraggingMode();
    }, [enableDraggingMode]);

    return (
        <IconButton
            aria-label={"dragging mode"}
            aria-selected={isDraggingModeEnabled}
            icon={<DragHandGesture />}
            title={"dragging mode"}
            onClick={handleOnDraggingModeClick}
        />
    )
}

export const AssistantModeButton: FC = () => {
    const { } = useWorkspaceToolbarStore();
    const { } = useCommentingMode();

    return (
        <IconButton
            aria-label={"assistant"}
            icon={<MagicWand />}
            title={"assistant"}
        />
    )
}

export const CommentingModeButton: FC = () => {
    const { isCommentingModeEnabled, enableCommentingMode } = useCommentingMode();

    return (
        <IconButton
            aria-label={"add comment"}
            aria-selected={isCommentingModeEnabled}
            icon={<ChatPlusIn />}
            title={"add comment"}
            onClick={() => enableCommentingMode()}
        />
    )
}

export const ConnectionModeButton: FC = () => {
    const { enabledTool, setEnabledTool } = useWorkspaceToolbarStore();

    const enableConnectionMode = useCallback(() => {
        setEnabledTool("connection");
    }, [setEnabledTool]);

    return (
        <IconButton
            aria-label={"connection mode"}
            aria-selected={enabledTool === "connection"}
            icon={<Linear />}
            title={"connection mode"}
            onClick={() => enableConnectionMode()}
        />
    )
}

export const ElementComponentModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowComponent,
        enableAddingElement
    } = useAddingElementMode();

    return allowComponent && (
        <IconButton
            aria-label={"component mode"}
            aria-selected={addingElementsEnabled && addingElementType === ElementType.Component}
            icon={<Keyframes />}
            title={"component mode"}
            onClick={() => enableAddingElement(ElementType.Component)}
        />
    )
}

export const ElementContainerModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowContainer,
        enableAddingElement
    } = useAddingElementMode();

    return allowContainer && (
        <IconButton
            aria-label={"container mode"}
            aria-selected={addingElementsEnabled && addingElementType === ElementType.Container}
            icon={<KeyframesCouple />}
            title={"container mode"}
            onClick={() => enableAddingElement(ElementType.Container)}
        />
    )
}

export const ElementDeploymentNodeModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowDeploymentNode,
        enableAddingElement
    } = useAddingElementMode();

    return allowDeploymentNode && (
        <></>
    )
}

export const ElementGroupModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowGroup,
        enableAddingElement
    } = useAddingElementMode();

    return allowGroup && (
        <IconButton
            aria-label={"group mode"}
            aria-selected={addingElementsEnabled && addingElementType === ElementType.Group}
            icon={<KeyframePlusIn />}
            title={"group mode"}
            onClick={() => enableAddingElement(ElementType.Group)}
        />
    )
}

export const ElementInfrastructureNodeModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowInfrastructureNode,
        enableAddingElement
    } = useAddingElementMode();

    return allowInfrastructureNode && (
        <></>
    )
}

export const ElementPersonModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowPerson,
        enableAddingElement
    } = useAddingElementMode();

    return allowPerson && (
        <IconButton
            aria-label={"person mode"}
            aria-selected={addingElementsEnabled && addingElementType === ElementType.Person}
            icon={<User />}
            title={"person mode"}
            onClick={() => enableAddingElement(ElementType.Person)}
        />
    )
}

export const ElementSoftwareSystemModeButton: FC = () => {
    const {
        addingElementsEnabled,
        addingElementType,
        allowSoftwareSystem,
        enableAddingElement
    } = useAddingElementMode();

    return allowSoftwareSystem && (
        <IconButton
            aria-label={"software system mode"}
            aria-selected={addingElementsEnabled && addingElementType === ElementType.SoftwareSystem}
            icon={<Keyframe />}
            title={"software system mode"}
            onClick={() => enableAddingElement(ElementType.SoftwareSystem)}
        />
    )
}
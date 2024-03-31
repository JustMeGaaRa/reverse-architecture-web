import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import {
    Toolbar,
    ToolbarSection,
    ToolbarSubmenu,
    ToolbarSubmenuContent,
    ToolbarSubmenuTrigger
} from "@restruct/ui";
import { ElementType, ViewType } from "@structurizr/dsl";
import { PanelPosition, WorkspacePanel } from "@structurizr/react";
import { usePresentationMode, useWorkspaceRoom } from "@workspace/live";
import {
    ChatPlusIn,
    Component,
    CursorPointer,
    DragHandGesture,
    Keyframe,
    KeyframePlusIn,
    Keyframes,
    KeyframesCouple,
    Linear,
    Play,
    User,
    Text,
    Xmark
} from "iconoir-react";
import { FC, useCallback } from "react";
import {
    useElementDropMode,
    useExploreMode,
    useElementSelectMode,
    useTextEditMode,
    useWorkspaceNavigation,
    useCommentingMode,
    useElementConnectMode
} from "../hooks";

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
    const { enableSelectMode: enableSelectionMode } = useElementSelectMode();
    const { enableExploreMode: enableDraggingMode } = useExploreMode()

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
                        <SelectModeButton />
                    )}
                    <ExploreModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    {!presentationEnabled && currentView?.type !== ViewType.Model && (
                        <ToolbarSubmenu>
                            <ToolbarSubmenuTrigger
                                aria-label={"element drop mode"}
                                title={"Element Drop Mode"}
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
                        <ConnectModeButton />
                    )}
                    <CommentingModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    {presentationEnabled && currentUser.info?.username === presenterInfo?.username ? (
                        <Tooltip label={"Stop Presenting"}>
                            <IconButton
                                aria-label={"stop presenting"}
                                icon={<Xmark />}
                                title={"stop presenting"}
                                onClick={handleOnStopPresenting}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip label={"Start Presenting"}>
                            <IconButton
                                aria-label={"start presenting"}
                                icon={<Play />}
                                title={"start presenting"}
                                onClick={handleOnStartPresenting}
                            />
                        </Tooltip>
                    )}
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}

export const SelectModeButton: FC = () => {
    const { isSelectMode, enableSelectMode } = useElementSelectMode();

    return (
        <Tooltip label={"Select"}>
            <IconButton
                aria-label={"selection mode"}
                aria-selected={isSelectMode}
                icon={<CursorPointer />}
                title={"selection mode"}
                onClick={() => enableSelectMode()}
            />
        </Tooltip>
    )
}

export const ExploreModeButton: FC = () => {
    const { isExploreMode, enableExploreMode } = useExploreMode();

    return (
        <Tooltip label={"Explore"}>
            <IconButton
                aria-label={"explore mode"}
                aria-selected={isExploreMode}
                icon={<DragHandGesture />}
                title={"explore mode"}
                onClick={() => enableExploreMode()}
            />
        </Tooltip>
    )
}

export const TextEditModeButton: FC = () => {
    const { isTextEditMode, enableTextEditMode } = useTextEditMode();

    return (
        <Tooltip label={"Edit text"}>
            <IconButton
                aria-label={"text edit mode"}
                aria-selected={isTextEditMode}
                icon={<Text />}
                title={"text edit mode"}
                onClick={() => enableTextEditMode()}
            />
        </Tooltip>
    )
}

export const ConnectModeButton: FC = () => {
    const { isConnectMode, enableConnectMode } = useElementConnectMode();

    return (
        <Tooltip label={"Connect"}>
            <IconButton
                aria-label={"connection mode"}
                aria-selected={isConnectMode}
                icon={<Linear />}
                title={"connection mode"}
                onClick={() => enableConnectMode()}
            />
        </Tooltip>
    )
}

export const CommentingModeButton: FC = () => {
    const { isCommentMode, enableCommentMode } = useCommentingMode();

    return (
        <Tooltip label={"Comment"}>
            <IconButton
                aria-label={"add comment"}
                aria-selected={isCommentMode}
                icon={<ChatPlusIn />}
                title={"add comment"}
                onClick={() => enableCommentMode()}
            />
        </Tooltip>
    )
}

export const ElementComponentModeButton: FC = () => {
    const {
        isElementDropMode,
        selectedElementType,
        allowComponent,
        enableElementDropMode
    } = useElementDropMode();

    return allowComponent && (
        <IconButton
            aria-label={"component mode"}
            aria-selected={isElementDropMode && selectedElementType === ElementType.Component}
            icon={<Keyframes />}
            title={"component mode"}
            onClick={() => enableElementDropMode(ElementType.Component)}
        />
    )
}

export const ElementContainerModeButton: FC = () => {
    const {
        isElementDropMode,
        selectedElementType,
        allowContainer,
        enableElementDropMode: enableAddingElement
    } = useElementDropMode();

    return allowContainer && (
        <IconButton
            aria-label={"container mode"}
            aria-selected={isElementDropMode && selectedElementType === ElementType.Container}
            icon={<KeyframesCouple />}
            title={"container mode"}
            onClick={() => enableAddingElement(ElementType.Container)}
        />
    )
}

export const ElementDeploymentNodeModeButton: FC = () => {
    const {
        isElementDropMode,
        selectedElementType,
        allowDeploymentNode,
        enableElementDropMode
    } = useElementDropMode();

    return allowDeploymentNode && (
        <></>
    )
}

export const ElementGroupModeButton: FC = () => {
    const {
        isElementDropMode,
        selectedElementType,
        allowGroup,
        enableElementDropMode
    } = useElementDropMode();

    return allowGroup && (
        <IconButton
            aria-label={"group mode"}
            aria-selected={isElementDropMode && selectedElementType === ElementType.Group}
            icon={<KeyframePlusIn />}
            title={"group mode"}
            onClick={() => enableElementDropMode(ElementType.Group)}
        />
    )
}

export const ElementInfrastructureNodeModeButton: FC = () => {
    const {
        isElementDropMode,
        selectedElementType,
        allowInfrastructureNode,
        enableElementDropMode
    } = useElementDropMode();

    return allowInfrastructureNode && (
        <></>
    )
}

export const ElementPersonModeButton: FC = () => {
    const {
        isElementDropMode,
        selectedElementType,
        allowPerson,
        enableElementDropMode
    } = useElementDropMode();

    const handleOnClick = useCallback(() => {
        enableElementDropMode(ElementType.Person);
    }, [enableElementDropMode]);

    return allowPerson && (
        <IconButton
            aria-label={"person mode"}
            aria-selected={isElementDropMode && selectedElementType === ElementType.Person}
            icon={<User />}
            title={"person mode"}
            onClick={handleOnClick}
        />
    )
}

export const ElementSoftwareSystemModeButton: FC = () => {
    const {
        isElementDropMode,
        selectedElementType,
        allowSoftwareSystem,
        enableElementDropMode
    } = useElementDropMode();

    return allowSoftwareSystem && (
        <IconButton
            aria-label={"software system mode"}
            aria-selected={isElementDropMode && selectedElementType === ElementType.SoftwareSystem}
            icon={<Keyframe />}
            title={"software system mode"}
            onClick={() => enableElementDropMode(ElementType.SoftwareSystem)}
        />
    )
}
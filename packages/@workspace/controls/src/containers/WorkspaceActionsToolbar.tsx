import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import {
    Toolbar,
    ToolbarSection,
    ToolbarSubmenu,
    ToolbarSubmenuContent,
    ToolbarSubmenuTrigger,
    useToolbar
} from "@restruct/ui";
import { ElementType, ViewType } from "@structurizr/dsl";
import { useAutoLayout, WorkspacePanel } from "@workspace/core";
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
    Xmark,
    LayoutLeft
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

export const WorkspaceActionsToolbar: FC<{ isVisible?: boolean; }> = ({ isVisible = true }) => {
    const { currentView } = useWorkspaceNavigation();
    const { presentationEnabled } = usePresentationMode();

    return isVisible && (
        <WorkspacePanel position={"bottom-center"}>
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
                                    <ElementGroupModeButton />
                                </ToolbarSection>
                            </ToolbarSubmenuContent>
                        </ToolbarSubmenu>
                    )}

                    <TextEditModeButton />
                    {!presentationEnabled && currentView?.type !== ViewType.Model && (
                        <>
                            <AutoLayoutButton />
                            <ConnectModeButton />
                        </>
                    )}
                    <CommentingModeButton />
                </ToolbarSection>

                <ToolbarSection>
                    <PresentationModeButton />
                </ToolbarSection>
            </Toolbar>
        </WorkspacePanel>
    )
}

export const PresentationModeButton: FC = () => {
    const { currentUser } = useWorkspaceRoom();
    const { setSelectedIndex } = useToolbar();
    const { presentationEnabled, presenterInfo, startPresenting, stopPresenting } = usePresentationMode();
    const { enableSelectMode } = useElementSelectMode();
    const { enableExploreMode } = useExploreMode();

    const handleOnStartPresenting = useCallback(() => {
        startPresenting();
        enableExploreMode()
    }, [enableExploreMode, startPresenting]);

    const handleOnStopPresenting = useCallback(() => {
        stopPresenting();
        enableSelectMode();
    }, [enableSelectMode, stopPresenting]);

    return presentationEnabled && currentUser.info?.username === presenterInfo?.username ? (
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
    )
}

export const AutoLayoutButton: FC = () => {
    const { autoLayout } = useAutoLayout();

    const handleOnAutoLayout = useCallback(() => {
        autoLayout();
    }, [autoLayout]);

    return (
        <Tooltip label={"Auto Layout"}>
            <IconButton
                aria-label={"auto layout"}
                icon={<Icon as={LayoutLeft} boxSize={6} />}
                title={"auto layout"}
                onClick={handleOnAutoLayout}
            />
        </Tooltip>
    )
}

export const SelectModeButton: FC = () => {
    const { setSelectedIndex } = useToolbar();
    const { isSelectMode, enableSelectMode } = useElementSelectMode();

    const handleOnEnableSelectMode = useCallback(() => {
        enableSelectMode();
        setSelectedIndex(null);
    }, [enableSelectMode, setSelectedIndex]);

    return (
        <Tooltip label={"Select"}>
            <IconButton
                aria-label={"selection mode"}
                aria-selected={isSelectMode}
                icon={<CursorPointer />}
                title={"selection mode"}
                onClick={handleOnEnableSelectMode}
            />
        </Tooltip>
    )
}

export const ExploreModeButton: FC = () => {
    const { setSelectedIndex } = useToolbar();
    const { isExploreMode, enableExploreMode } = useExploreMode();

    const handleOnEnableExploreMode = useCallback(() => {
        enableExploreMode();
        setSelectedIndex(null);
    }, [enableExploreMode, setSelectedIndex]);

    return (
        <Tooltip label={"Explore"}>
            <IconButton
                aria-label={"explore mode"}
                aria-selected={isExploreMode}
                icon={<DragHandGesture />}
                title={"explore mode"}
                onClick={handleOnEnableExploreMode}
            />
        </Tooltip>
    )
}

export const TextEditModeButton: FC = () => {
    const { setSelectedIndex } = useToolbar();
    const { isTextEditMode, enableTextEditMode } = useTextEditMode();

    const handleOnEnableTextEditMode = useCallback(() => {
        enableTextEditMode();
        setSelectedIndex(null);
    }, [enableTextEditMode, setSelectedIndex]);

    return (
        <Tooltip label={"Edit text"}>
            <IconButton
                aria-label={"text edit mode"}
                aria-selected={isTextEditMode}
                icon={<Text />}
                title={"text edit mode"}
                onClick={handleOnEnableTextEditMode}
            />
        </Tooltip>
    )
}

export const ConnectModeButton: FC = () => {
    const { setSelectedIndex } = useToolbar();
    const { isConnectMode, enableConnectMode } = useElementConnectMode();

    const handleOnEnableConnectMode = useCallback(() => {
        enableConnectMode();
        setSelectedIndex(null);
    }, [enableConnectMode, setSelectedIndex]);

    return (
        <Tooltip label={"Connect"}>
            <IconButton
                aria-label={"connection mode"}
                aria-selected={isConnectMode}
                icon={<Linear />}
                title={"connection mode"}
                onClick={handleOnEnableConnectMode}
            />
        </Tooltip>
    )
}

export const CommentingModeButton: FC = () => {
    const { setSelectedIndex } = useToolbar();
    const { isCommentMode, enableCommentMode } = useCommentingMode();

    const handleOnEnableCommentMode = useCallback(() => {
        enableCommentMode();
        setSelectedIndex(null);
    }, [enableCommentMode, setSelectedIndex]);

    return (
        <Tooltip label={"Comment"}>
            <IconButton
                aria-label={"add comment"}
                aria-selected={isCommentMode}
                icon={<ChatPlusIn />}
                title={"add comment"}
                onClick={handleOnEnableCommentMode}
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

    const handleOnEnableElementDropMode = useCallback(() => {
        enableElementDropMode(ElementType.Component);
    }, [enableElementDropMode]);

    return allowComponent && (
        <IconButton
            aria-label={"component mode"}
            aria-selected={isElementDropMode && selectedElementType === ElementType.Component}
            icon={<Keyframes />}
            title={"component mode"}
            onClick={handleOnEnableElementDropMode}
        />
    )
}

export const ElementContainerModeButton: FC = () => {
    const {
        isElementDropMode,
        selectedElementType,
        allowContainer,
        enableElementDropMode
    } = useElementDropMode();

    const handleOnEnableElementDropMode = useCallback(() => {
        enableElementDropMode(ElementType.Container);
    }, [enableElementDropMode]);

    return allowContainer && (
        <IconButton
            aria-label={"container mode"}
            aria-selected={isElementDropMode && selectedElementType === ElementType.Container}
            icon={<KeyframesCouple />}
            title={"container mode"}
            onClick={handleOnEnableElementDropMode}
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

    const handleOnEnableElementDropMode = useCallback(() => {
        enableElementDropMode(ElementType.Group);
    }, [enableElementDropMode]);

    return allowGroup && (
        <IconButton
            aria-label={"group mode"}
            aria-selected={isElementDropMode && selectedElementType === ElementType.Group}
            icon={<KeyframePlusIn />}
            title={"group mode"}
            onClick={handleOnEnableElementDropMode}
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

    const handleOnEnableElementDropMode = useCallback(() => {
        enableElementDropMode(ElementType.Person);
    }, [enableElementDropMode]);

    return allowPerson && (
        <IconButton
            aria-label={"person mode"}
            aria-selected={isElementDropMode && selectedElementType === ElementType.Person}
            icon={<User />}
            title={"person mode"}
            onClick={handleOnEnableElementDropMode}
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

    const handleOnEnableElementDropMode = useCallback(() => {
        enableElementDropMode(ElementType.SoftwareSystem);
    }, [enableElementDropMode]);

    return allowSoftwareSystem && (
        <IconButton
            aria-label={"software system mode"}
            aria-selected={isElementDropMode && selectedElementType === ElementType.SoftwareSystem}
            icon={<Keyframe />}
            title={"software system mode"}
            onClick={handleOnEnableElementDropMode}
        />
    )
}
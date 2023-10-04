import { Box, IconButton } from "@chakra-ui/react";
import { useOnSelectionChange, useReactFlow } from "@reactflow/core";
import { ElementType } from "@structurizr/dsl";
import {
    AddKeyframeAlt,
    BinMinus,
    Cancel,
    ChatAdd,
    CursorPointer,
    DragHandGesture,
    FrameAltEmpty,
    Keyframe,
    KeyframesCouple,
    Keyframes,
    LayoutRight,
    Play,
    Text,
    User,
} from "iconoir-react";
import { FC, useState } from "react";
import {
    ToolbarSection,
    Toolbar
} from "../components";
import {
    usePresentationMode,
    useSelectionMode,
    useDraggingMode,
    useTextEditMode,
    useAddingElementMode,
    useAutoLayoutMode,
    useWorkspaceToolbarStore,
    useCommentingMode
} from "../hooks";

export const WorkspaceToolbar: FC = () => {
    const {
        isAutoLayoutEnabled,
        isSelectionEnabled,
        isDraggingEnabled,
        isTextEditEnabled,
        isPresentationEnabled,
        isAddingElementEnabled,
        isCommentAddingEnabled,
        addingElementType,
    } = useWorkspaceToolbarStore();
    const { toggleAutoLayout } = useAutoLayoutMode();
    const { enableSelectionMode } = useSelectionMode();
    const { enableDraggingMode } = useDraggingMode();
    const { enableTextEditMode } = useTextEditMode();
    const { togglePresentationMode } = usePresentationMode();
    const { enableCommentingMode } = useCommentingMode();
    const {
        allowPerson,
        allowSoftwareSystem,
        allowContainer,
        allowComponent,
        allowGroup,
        allowDeploymentNode,
        enableAddingElement
    } = useAddingElementMode();

    const { project, deleteElements } = useReactFlow();
    const [ selection, setSelection ] = useState({ nodes: [], edges: [] });
    useOnSelectionChange({ onChange: (selection) => { setSelection(selection) }});

    return (
        <>
            {!isPresentationEnabled && (
                <Toolbar>
                    <ToolbarSection>
                        <IconButton
                            aria-label={"selection mode"}
                            isActive={isSelectionEnabled}
                            icon={<CursorPointer />}
                            title={"selection mode"}
                            onClick={() => enableSelectionMode()}
                        />
                        <IconButton
                            aria-label={"dragging mode"}
                            isActive={isDraggingEnabled}
                            icon={<DragHandGesture />}
                            title={"dragging mode"}
                            onClick={() => enableDraggingMode()}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        {allowPerson && (
                            <IconButton
                                aria-label={"person mode"}
                                icon={<User />}
                                isActive={isAddingElementEnabled && addingElementType === ElementType.Person}
                                title={"person mode"}
                                onClick={() => enableAddingElement(ElementType.Person)}
                            />
                        )}
                        {allowSoftwareSystem && (
                            <IconButton
                                aria-label={"software system mode"}
                                icon={<Keyframe />}
                                isActive={isAddingElementEnabled && addingElementType === ElementType.SoftwareSystem}
                                title={"software system mode"}
                                onClick={() => enableAddingElement(ElementType.SoftwareSystem)}
                            />
                        )}
                        {allowContainer && (
                            <IconButton
                                aria-label={"container mode"}
                                icon={<KeyframesCouple />}
                                isActive={isAddingElementEnabled && addingElementType === ElementType.Container}
                                title={"container mode"}
                                onClick={() => enableAddingElement(ElementType.Container)}
                            />
                        )}
                        {allowComponent && (
                            <IconButton
                                aria-label={"component moe"}
                                icon={<Keyframes />}
                                isActive={isAddingElementEnabled && addingElementType === ElementType.Component}
                                title={"component mode"}
                                onClick={() => enableAddingElement(ElementType.Component)}
                            />
                        )}
                        {allowGroup && (
                            <IconButton
                                aria-label={"group mode"}
                                icon={<AddKeyframeAlt />}
                                isActive={isAddingElementEnabled && addingElementType === ElementType.Group}
                                title={"group mode"}
                                onClick={() => enableAddingElement(ElementType.Group)}
                            />
                        )}
                        {/* TODO: add icon butons for deployment and infrastructure nodes */}
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"text edit mode"}
                            icon={<Text />}
                            isActive={isTextEditEnabled}
                            title={"text edit mode"}
                            onClick={() => enableTextEditMode()}
                        />
                        <IconButton
                            aria-label={"multiselect"}
                            icon={<FrameAltEmpty />}
                            isActive={false}
                            title={"multiselect"}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"add comment"}
                            icon={<ChatAdd />}
                            isActive={isCommentAddingEnabled}
                            title={"add comment"}
                            onClick={() => enableCommentingMode()}
                        />
                        <IconButton
                            aria-label={"enable auto layout"}
                            icon={<LayoutRight />}
                            isActive={isAutoLayoutEnabled}
                            title={"enable auto layout"}
                            onClick={() => toggleAutoLayout()}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"delete selected"}
                            icon={<BinMinus />}
                            isActive={(selection.nodes?.length > 0 || selection.edges?.length > 0)}
                            title={"delete selected"}
                            onClick={() => deleteElements(selection)}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"enable presentation mode"}
                            icon={<Play />}
                            title={"enable presentation mode"}
                            onClick={() => togglePresentationMode()}
                        />
                    </ToolbarSection>
                </Toolbar>
            )}

            {isPresentationEnabled && (
                <Toolbar>
                    <ToolbarSection>
                        <IconButton
                            aria-label={"follow presenter"}
                            icon={<CursorPointer />}
                            title={"follow presenter"}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"add comment"}
                            icon={<ChatAdd />}
                            title={"add comment"}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"exit presentation mode"}
                            icon={<Cancel />}
                            title={"exit presentation mode"}
                            onClick={() => togglePresentationMode()}
                        />
                    </ToolbarSection>
                </Toolbar>
            )}
        </>
    )
}
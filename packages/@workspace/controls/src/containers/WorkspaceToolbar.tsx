import { Icon, IconButton } from "@chakra-ui/react";
import { useOnSelectionChange, useReactFlow } from "@reactflow/core";
import { ElementType } from "@structurizr/dsl";
import {
    PanelPosition,
    useWorkspaceToolbarStore,
    WorkspacePanel
} from "@workspace/core";
import {
    Toolbar,
    ToolbarSubmenuTrigger,
    ToolbarSection,
    ToolbarSubmenu,
    ToolbarSubmenuContent,
} from "@workspace/toolbar";
import {
    BinMinusIn,
    ChatPlusIn,
    CursorPointer,
    DragHandGesture,
    FrameAltEmpty,
    Keyframe,
    KeyframePlusIn,
    KeyframesCouple,
    Keyframes,
    LayoutRight,
    Play,
    Square,
    Text,
    User,
    Xmark,
} from "iconoir-react";
import { FC, useState } from "react";
import {
    usePresentationMode,
    useSelectionMode,
    useDraggingMode,
    useTextEditMode,
    useAddingElementMode,
    useAutoLayoutMode,
    useCommentingMode
} from "../hooks";

export const WorkspaceToolbar: FC<{
    position?: PanelPosition;
}> = ({
    position
}) => {
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
        <WorkspacePanel position={position ?? "bottom-center"}>
            {!isPresentationEnabled && (
                <Toolbar>
                    <ToolbarSection>
                        <IconButton
                            aria-label={"selection mode"}
                            aria-selected={isSelectionEnabled}
                            icon={<CursorPointer />}
                            title={"selection mode"}
                            onClick={() => enableSelectionMode()}
                        />
                        <IconButton
                            aria-label={"dragging mode"}
                            aria-selected={isDraggingEnabled}
                            icon={<DragHandGesture />}
                            title={"dragging mode"}
                            onClick={() => enableDraggingMode()}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        <ToolbarSubmenu>
                            <ToolbarSubmenuTrigger
                                aria-label={"shapes submenu"}
                                icon={<Icon as={Square} boxSize={6} />}
                            />
                            <ToolbarSubmenuContent>
                                <ToolbarSection>
                                    {allowPerson && (
                                        <IconButton
                                            aria-label={"person mode"}
                                            icon={<User />}
                                            aria-selected={isAddingElementEnabled && addingElementType === ElementType.Person}
                                            title={"person mode"}
                                            onClick={() => enableAddingElement(ElementType.Person)}
                                        />
                                    )}
                                    {allowSoftwareSystem && (
                                        <IconButton
                                            aria-label={"software system mode"}
                                            icon={<Keyframe />}
                                            aria-selected={isAddingElementEnabled && addingElementType === ElementType.SoftwareSystem}
                                            title={"software system mode"}
                                            onClick={() => enableAddingElement(ElementType.SoftwareSystem)}
                                        />
                                    )}
                                    {allowContainer && (
                                        <IconButton
                                            aria-label={"container mode"}
                                            icon={<KeyframesCouple />}
                                            aria-selected={isAddingElementEnabled && addingElementType === ElementType.Container}
                                            title={"container mode"}
                                            onClick={() => enableAddingElement(ElementType.Container)}
                                        />
                                    )}
                                    {allowComponent && (
                                        <IconButton
                                            aria-label={"component moe"}
                                            icon={<Keyframes />}
                                            aria-selected={isAddingElementEnabled && addingElementType === ElementType.Component}
                                            title={"component mode"}
                                            onClick={() => enableAddingElement(ElementType.Component)}
                                        />
                                    )}
                                    {allowGroup && (
                                        <IconButton
                                            aria-label={"group mode"}
                                            icon={<KeyframePlusIn />}
                                            aria-selected={isAddingElementEnabled && addingElementType === ElementType.Group}
                                            title={"group mode"}
                                            onClick={() => enableAddingElement(ElementType.Group)}
                                        />
                                    )}
                                </ToolbarSection>
                            </ToolbarSubmenuContent>
                        </ToolbarSubmenu>
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"text edit mode"}
                            icon={<Text />}
                            aria-selected={isTextEditEnabled}
                            title={"text edit mode"}
                            onClick={() => enableTextEditMode()}
                        />
                        <IconButton
                            aria-label={"multiselect"}
                            icon={<FrameAltEmpty />}
                            aria-selected={false}
                            title={"multiselect"}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"add comment"}
                            icon={<ChatPlusIn />}
                            aria-selected={isCommentAddingEnabled}
                            title={"add comment"}
                            onClick={() => enableCommentingMode()}
                        />
                        <IconButton
                            aria-label={"enable auto layout"}
                            icon={<LayoutRight />}
                            aria-selected={isAutoLayoutEnabled}
                            title={"enable auto layout"}
                            onClick={() => toggleAutoLayout()}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"delete selected"}
                            icon={<BinMinusIn />}
                            aria-selected={(selection.nodes?.length > 0 || selection.edges?.length > 0)}
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
                            icon={<ChatPlusIn />}
                            title={"add comment"}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"exit presentation mode"}
                            icon={<Xmark />}
                            title={"exit presentation mode"}
                            onClick={() => togglePresentationMode()}
                        />
                    </ToolbarSection>
                </Toolbar>
            )}
        </WorkspacePanel>
    )
}
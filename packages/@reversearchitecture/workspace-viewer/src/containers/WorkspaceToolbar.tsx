import { Box, IconButton } from "@chakra-ui/react";
import { useOnSelectionChange, useReactFlow } from "@reactflow/core";
import { ElementType } from "@structurizr/dsl";
import {
    AddKeyframeAlt,
    BinMinus,
    Cancel,
    ChatAdd,
    Component,
    Circle,
    CursorPointer,
    DragHandGesture,
    FrameAltEmpty,
    Keyframe,
    KeyframesCouple,
    Keyframes,
    LayoutRight,
    Play,
    Redo,
    Rhombus,
    Server,
    Square,
    Text,
    User,
    Undo
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
    useAutoLayoutMode
} from "../hooks";
import { useWorkspaceToolbarStore } from "../hooks/useWorkspaceToolbarStore";



export const WorkspaceToolbar: FC = () => {
    const {
        isAutoLayoutEnabled,
        isSelectionEnabled,
        isDraggingEnabled,
        isTextEditEnabled,
        isPresentationEnabled,
        isAddingElementEnabled,
        addingElementType,
    } = useWorkspaceToolbarStore();
    const { toggleAutoLayout } = useAutoLayoutMode();
    const { enableSelectionMode } = useSelectionMode();
    const { enableDraggingMode } = useDraggingMode();
    const { enableTextEditMode } = useTextEditMode();
    const { togglePresentationMode } = usePresentationMode();
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
        <Box position={"absolute"} bottom={4} left={"50%"} transform={"translateX(-50%)"}>
            {!isPresentationEnabled && (
                <Toolbar>
                    <ToolbarSection>
                        <IconButton
                            aria-label={"selection mode"}
                            isActive={isSelectionEnabled}
                            icon={<CursorPointer />}
                            title={"selection mode"}
                            _active={{
                                backgroundColor: "yellow.100",
                                color: "yellow.900"
                            }}
                            onClick={() => enableSelectionMode()}
                        />
                        <IconButton
                            aria-label={"dragging mode"}
                            isActive={isDraggingEnabled}
                            icon={<DragHandGesture />}
                            title={"dragging mode"}
                            _active={{
                                backgroundColor: "yellow.100",
                                color: "yellow.900"
                            }}
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
                                _active={{
                                    backgroundColor: "yellow.100",
                                    color: "yellow.900"
                                }}
                                onClick={() => enableAddingElement(ElementType.Person)}
                            />
                        )}
                        {allowSoftwareSystem && (
                            <IconButton
                                aria-label={"software system mode"}
                                icon={<Keyframe />}
                                isActive={isAddingElementEnabled && addingElementType === ElementType.SoftwareSystem}
                                title={"software system mode"}
                                _active={{
                                    backgroundColor: "yellow.100",
                                    color: "yellow.900"
                                }}
                                onClick={() => enableAddingElement(ElementType.SoftwareSystem)}
                            />
                        )}
                        {allowContainer && (
                            <IconButton
                                aria-label={"container mode"}
                                icon={<KeyframesCouple />}
                                isActive={isAddingElementEnabled && addingElementType === ElementType.Container}
                                title={"container mode"}
                                _active={{
                                    backgroundColor: "yellow.100",
                                    color: "yellow.900"
                                }}
                                onClick={() => enableAddingElement(ElementType.Container)}
                            />
                        )}
                        {allowComponent && (
                            <IconButton
                                aria-label={"component moe"}
                                icon={<Keyframes />}
                                isActive={isAddingElementEnabled && addingElementType === ElementType.Component}
                                title={"component mode"}
                                _active={{
                                    backgroundColor: "yellow.100",
                                    color: "yellow.900"
                                }}
                                onClick={() => enableAddingElement(ElementType.Component)}
                            />
                        )}
                        {allowGroup && (
                            <IconButton
                                aria-label={"group mode"}
                                icon={<AddKeyframeAlt />}
                                isActive={isAddingElementEnabled && addingElementType === ElementType.Group}
                                title={"group mode"}
                                _active={{
                                    backgroundColor: "yellow.100",
                                    color: "yellow.900"
                                }}
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
                            _active={{
                                backgroundColor: "yellow.100",
                                color: "yellow.900"
                            }}
                            onClick={() => enableTextEditMode()}
                        />
                        <IconButton
                            aria-label={"multiselect"}
                            icon={<FrameAltEmpty />}
                            isActive={false}
                            title={"multiselect"}
                            _active={{
                                backgroundColor: "yellow.100",
                                color: "yellow.900"
                            }}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"add comment"}
                            icon={<ChatAdd />}
                            title={"add comment"}
                            _active={{
                                backgroundColor: "yellow.100",
                                color: "yellow.900"
                            }}
                        />
                        <IconButton
                            aria-label={"enable auto layout"}
                            icon={<LayoutRight />}
                            isActive={isAutoLayoutEnabled}
                            title={"enable auto layout"}
                            _active={{
                                backgroundColor: "yellow.100",
                                color: "yellow.900"
                            }}
                            onClick={() => toggleAutoLayout()}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"delete selected"}
                            icon={<BinMinus />}
                            isActive={(selection.nodes?.length > 0 || selection.edges?.length > 0)}
                            title={"delete selected"}
                            _active={{
                                backgroundColor: "yellow.100",
                                color: "yellow.900"
                            }}
                            onClick={() => deleteElements(selection)}
                        />
                        <IconButton
                            aria-label={"undo last change"}
                            icon={<Undo />}
                            title={"undo last change"}
                        />
                        <IconButton
                            aria-label={"redo last change"}
                            icon={<Redo />}
                            title={"redo last change"}
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
                            _active={{
                                backgroundColor: "yellow.100",
                                color: "yellow.900"
                            }}
                        />
                    </ToolbarSection>

                    <ToolbarSection>
                        <IconButton
                            aria-label={"add comment"}
                            icon={<ChatAdd />}
                            title={"add comment"}
                            _active={{
                                backgroundColor: "yellow.100",
                                color: "yellow.900"
                            }}
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
        </Box>
    )
}
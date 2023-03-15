import {
    ButtonGroup,
    HStack,
    StackDivider
} from "@chakra-ui/react";
import { Panel, ReactFlowState, useReactFlow, useStore } from "@reactflow/core";
import {
    Cancel,
    CursorPointer,
    DragHandGesture,
    MessageText,
    Square,
    Circle,
    Triangle,
    BinMinus,
    Undo,
    Redo,
    Play
} from "iconoir-react";
import { FC, PropsWithChildren, useCallback } from "react";
import { useInteractionMode } from "./hooks";
import { ControlPanel, ToolbarIconButton } from "../../components";

const selectedNodeSelector = (state: ReactFlowState) => Array.from(state.nodeInternals.values()).find(node => node.selected);
const selectedEdgeSelector = (state: ReactFlowState) => Array.from(state.edges).find(edge => edge.selected);

type ToolbarPanelProps = {
    showDelete?: boolean;
    showUndoRedo?: boolean;
};

export const ToolbarPanel: FC<PropsWithChildren<ToolbarPanelProps>> = ({
    showDelete = true,
    showUndoRedo = true
}) => {
    const { deleteElements } = useReactFlow();
    const selectedNode = useStore(selectedNodeSelector);
    const selectedEdge = useStore(selectedEdgeSelector);

    const { isPresentationMode, isBuilderMode, toggleMode } = useInteractionMode();

    const onSelectedDelete = useCallback(() => {
        const nodes = selectedNode ? Array.of(selectedNode) : [];
        const edges = selectedEdge ? Array.of(selectedEdge) : [];
        deleteElements({ nodes, edges })
    }, [deleteElements, selectedNode, selectedEdge]);

    return (
        <Panel position={"bottom-center"}>
            <ControlPanel>
                <HStack
                    divider={<StackDivider />}
                >

                    <ButtonGroup
                        gap={0}
                        spacing={0}
                        px={2}
                        orientation={"horizontal"}
                        size={"md"}
                    >
                        <ToolbarIconButton
                            aria-label={"cursor"}
                            title={"cursor"}
                            icon={<CursorPointer />}
                            />
                        <ToolbarIconButton
                            aria-label={"drag"}
                            title={"drag"}
                            icon={<DragHandGesture />}
                            isActive={true}
                        />
                    </ButtonGroup>                

                    {isBuilderMode && (
                        <ButtonGroup
                            gap={0}
                            spacing={0}
                            px={2}
                            orientation={"horizontal"}
                            size={"md"}
                        >
                            <ToolbarIconButton
                                aria-label={"square"}
                                title={"square"}
                                icon={<Square />}
                            />
                            <ToolbarIconButton
                                aria-label={"circle"}
                                title={"circle"}
                                icon={<Circle />}
                            />
                            <ToolbarIconButton
                                aria-label={"shapes"}
                                title={"shapes"}
                                icon={<Triangle />}
                            />
                        </ButtonGroup>
                    )}

                    <ButtonGroup
                        gap={0}
                        spacing={0}
                        px={2}
                        orientation={"horizontal"}
                        size={"md"}
                    >
                        <ToolbarIconButton
                            aria-label={"comment"}
                            title={"comment"}
                            icon={<MessageText />}
                        />
                    </ButtonGroup>

                    {isBuilderMode && (
                        <ButtonGroup
                            gap={0}
                            spacing={0}
                            px={2}
                            orientation={"horizontal"}
                            size={"md"}
                        >
                            {showDelete && (
                                <ToolbarIconButton
                                    aria-label={"delete selected element"}
                                    icon={<BinMinus />}
                                    title={"delete selected"}
                                    isActive={(selectedNode || selectedEdge) ? true : false}
                                    onClick={() => onSelectedDelete() }
                                />
                            )}
                            {showUndoRedo && (
                                <ToolbarIconButton
                                    aria-label={"undo last change"}
                                    icon={<Undo />}
                                    title={"undo last change"}
                                />
                            )}
                            {showUndoRedo && (
                                <ToolbarIconButton
                                    aria-label={"redo last change"}
                                    icon={<Redo />}
                                    title={"redo last change"}
                                />
                            )}
                        </ButtonGroup>
                    )}

                    <ButtonGroup
                        gap={0}
                        spacing={0}
                        px={2}
                        orientation={"horizontal"}
                        size={"md"}
                    >
                        {isPresentationMode && (
                            <ToolbarIconButton
                                aria-label={"exit mode"}
                                title={"exit mode"}
                                icon={<Cancel />}
                                onClick={toggleMode}
                            />
                        )}
                        {isBuilderMode && (
                            <ToolbarIconButton
                                aria-label={"presentation"}
                                title={"presentation"}
                                icon={<Play />}
                                onClick={toggleMode}
                            />
                        )}
                    </ButtonGroup>

                </HStack>
            </ControlPanel>
        </Panel>
    );
}
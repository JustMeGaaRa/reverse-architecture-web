import {
    ButtonGroup,
    HStack,
    StackDivider
} from "@chakra-ui/react";
import * as DSL from "@justmegaara/structurizr-dsl";
import {
    Panel,
    ReactFlowState,
    useReactFlow,
    useStore
} from "@reactflow/core";
import { useInteractionMode } from "@reversearchitecture/hooks";
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
    Play,
    Rhombus
} from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    MouseEvent,
    useCallback
} from "react";
import { v4 } from "uuid";
import { ControlPanel } from "../../components";
import { useWorkspaceRenderer } from "..";
import { RaIconButton } from "@reversearchitecture/ui";

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
    const { project } = useReactFlow();
    const store = useWorkspaceRenderer();

    const { isPresentationMode, isBuilderMode, toggleMode } = useInteractionMode();

    const onDeleteSelected = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        const nodes = selectedNode ? Array.of(selectedNode) : [];
        const edges = selectedEdge ? Array.of(selectedEdge) : [];
        deleteElements({ nodes, edges })
    }, [deleteElements, selectedNode, selectedEdge]);

    const onAddPerson = (event: MouseEvent<HTMLButtonElement>) => {
        const element = DSL.person(v4(), "Person", "A person");
        const position = project({ x: 0, y: 0 });
        store.addPerson(element, position);
    }

    const onAddSoftwareSystem = (event: MouseEvent<HTMLButtonElement>) => {
        const element = DSL.softwareSystem(v4(), "Software System", "A software system");
        const position = project({ x: 0, y: 0 });
        store.addSoftwareSystem(element, position);
    }

    const onAddContainer = (event: MouseEvent<HTMLButtonElement>) => {
        const element = DSL.container(v4(), "Container", "A container");
        const position = project({ x: 0, y: 0 });
        store.addContainer(element, position);
    }

    const onAddComponent = (event: MouseEvent<HTMLButtonElement>) => {
        const element = DSL.component(v4(), "Component", "A component");
        const position = project({ x: 0, y: 0 });
        store.addComponent(element, position);
    }

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
                        <RaIconButton
                            aria-label={"cursor"}
                            title={"cursor"}
                            icon={<CursorPointer />}
                            />
                        <RaIconButton
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
                            <RaIconButton
                                aria-label={"person"}
                                title={"person"}
                                icon={<Square />}
                                onClick={onAddPerson}
                            />
                            <RaIconButton
                                aria-label={"software system"}
                                title={"software system"}
                                icon={<Circle />}
                                onClick={onAddSoftwareSystem}
                            />
                            <RaIconButton
                                aria-label={"container"}
                                title={"container"}
                                icon={<Triangle />}
                                onClick={onAddContainer}
                            />
                            <RaIconButton
                                aria-label={"component"}
                                title={"component"}
                                icon={<Rhombus />}
                                onClick={onAddComponent}
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
                        <RaIconButton
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
                                <RaIconButton
                                    aria-label={"delete selected element"}
                                    icon={<BinMinus />}
                                    title={"delete selected"}
                                    isActive={(selectedNode || selectedEdge) ? true : false}
                                    onClick={onDeleteSelected}
                                />
                            )}
                            {showUndoRedo && (
                                <RaIconButton
                                    aria-label={"undo last change"}
                                    icon={<Undo />}
                                    title={"undo last change"}
                                />
                            )}
                            {showUndoRedo && (
                                <RaIconButton
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
                            <RaIconButton
                                aria-label={"exit mode"}
                                title={"exit mode"}
                                icon={<Cancel />}
                                onClick={toggleMode}
                            />
                        )}
                        {isBuilderMode && (
                            <RaIconButton
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
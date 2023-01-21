import { FC, PropsWithChildren, useCallback } from "react";
import {
    FaTrash,
    FaRedoAlt,
    FaUndoAlt,
    FaAngleDoubleRight
} from "react-icons/fa";
import { useReactFlow, useStore } from "reactflow";
import {
    ButtonGroup,
    IconButton,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import { C4RectangleDraggable } from "../c4-diagram/components/NodeTypes";
import { Panel, PanelProps } from "../../components/panels";
import { selectedNodeSelector, selectedEdgeSelector } from "../c4-diagram/store";
import { useDragAndDrop } from "../c4-diagram/hooks";

export type ControlsPanelProps = Partial<Pick<PanelProps, "dock">>;

export const ControlsPanel: FC<PropsWithChildren<ControlsPanelProps>> = ({
    children,
    dock
}) => {
    const { isOpen, onToggle } = useDisclosure();
    const { deleteElements } = useReactFlow();
    const selectedNode = useStore(selectedNodeSelector);
    const selectedEdge = useStore(selectedEdgeSelector);
    const anySelected = selectedNode !== undefined || selectedEdge !== undefined;

    const { onDragStart } = useDragAndDrop("application/reactflow");
    
    // TODO: move these codes outside from components
    const elementTypes = [
        "Person",
        "Software System",
        "Container",
        "Component"
    ];

    const onSelectedDelete = useCallback(() => {
        const nodes = selectedNode ? Array.of(selectedNode) : [];
        const edges = selectedEdge ? Array.of(selectedEdge) : [];
        deleteElements({ nodes, edges })
    }, [deleteElements, selectedNode, selectedEdge]);

    return (
        <Panel dock={dock ?? "left-center"}>
            <ButtonGroup
                isAttached
                orientation={"vertical"}
                size={"md"}
                variant={"ghost"}
            >
                <Popover
                    isOpen={isOpen}
                    closeOnBlur
                    closeOnEsc
                    placement={"right-start"}
                >
                    <PopoverTrigger>
                        <IconButton
                            aria-label={"show shapes"}
                            icon={<FaAngleDoubleRight />}
                            title={"show shapes"}
                            onClick={onToggle}
                        />
                    </PopoverTrigger>
                    <PopoverContent
                        background={useColorModeValue("whiteAlpha.900", "gray.900")}
                        width={"36"}
                    >
                        <PopoverBody display={"flex"} flexDirection={"column"} gap={2}>
                            {elementTypes.map(type => (
                                <C4RectangleDraggable
                                    key={type}
                                    type={type}
                                    name={type}
                                    onDragStart={(event) => onDragStart(event, type)}
                                />
                            ))}
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                
                <IconButton
                    aria-label={"delete selected element"}
                    icon={<FaTrash />}
                    title={"delete selected"}
                    isDisabled={!anySelected}
                    onClick={() => onSelectedDelete() }
                />
                <IconButton
                    aria-label={"undo last change"}
                    icon={<FaUndoAlt />}
                    title={"undo last change"}
                    isDisabled={true}
                />
                <IconButton
                    aria-label={"redo last change"}
                    icon={<FaRedoAlt />}
                    title={"redo last change"}
                    isDisabled={true}
                />
                {children}
            </ButtonGroup>
        </Panel>
    );
}
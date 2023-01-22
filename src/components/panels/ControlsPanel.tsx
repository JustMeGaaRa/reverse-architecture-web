import { FC, PropsWithChildren, useCallback } from "react";
import { useReactFlow, useStore } from "@reactflow/core";
import {
    FaTrash,
    FaRedoAlt,
    FaUndoAlt,
} from "react-icons/fa";
import {
    ButtonGroup,
    IconButton,
} from "@chakra-ui/react";
import { Panel, PanelProps } from "../../components/panels";
import { selectedNodeSelector, selectedEdgeSelector } from "../c4-diagram/store";

type ControlsPanelProps = Partial<Pick<PanelProps, "dock">> & {
    showDelete?: boolean;
    showUndoRedo?: boolean;
};

const ControlsPanel: FC<PropsWithChildren<ControlsPanelProps>> = ({
    children,
    dock = "left-center",
    showDelete = true,
    showUndoRedo = true
}) => {
    const { deleteElements } = useReactFlow();
    const selectedNode = useStore(selectedNodeSelector);
    const selectedEdge = useStore(selectedEdgeSelector);
    const noneSelected = selectedNode === undefined && selectedEdge === undefined;

    const onSelectedDelete = useCallback(() => {
        const nodes = selectedNode ? Array.of(selectedNode) : [];
        const edges = selectedEdge ? Array.of(selectedEdge) : [];
        deleteElements({ nodes, edges })
    }, [deleteElements, selectedNode, selectedEdge]);

    return (
        <Panel dock={dock}>
            <ButtonGroup
                isAttached
                orientation={"vertical"}
                size={"md"}
                variant={"ghost"}
            >
                {showDelete && (
                    <IconButton
                        aria-label={"delete selected element"}
                        icon={<FaTrash />}
                        title={"delete selected"}
                        isDisabled={noneSelected}
                        onClick={() => onSelectedDelete() }
                    />
                )}
                {showUndoRedo && (
                    <IconButton
                        aria-label={"undo last change"}
                        icon={<FaUndoAlt />}
                        title={"undo last change"}
                        isDisabled={true}
                    />
                )}
                {showUndoRedo && (
                    <IconButton
                        aria-label={"redo last change"}
                        icon={<FaRedoAlt />}
                        title={"redo last change"}
                        isDisabled={true}
                    />
                )}                
                {children}
            </ButtonGroup>
        </Panel>
    );
}

export { ControlsPanel };
import { FC } from "react";
import { FaExpand, FaLock, FaLockOpen, FaMinus, FaPlus } from "react-icons/fa";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { Panel, PanelProps } from "./Panel";
import { ReactFlowState, useReactFlow, useStore, useStoreApi } from "reactflow";

export type InteractivityPanelProps = Partial<Pick<PanelProps, "dock">>;

export const InteractivityPanel: FC<InteractivityPanelProps> = ({
    dock
}) => {
    const isInteractiveSelector = (flowState: ReactFlowState) => {
        return flowState.nodesDraggable
            && flowState.nodesConnectable
            && flowState.elementsSelectable;
    };
    const store = useStoreApi();
    const isInteractive = useStore(isInteractiveSelector);
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    const toggleInteractivity = () => {
        store.setState({
            nodesDraggable: !isInteractive,
            nodesConnectable: !isInteractive,
            elementsSelectable: !isInteractive,
        });
    };

    return (
        <Panel dock={dock ?? "bottom-right"}>
            <ButtonGroup
                isAttached
                orientation={"vertical"}
                size={"md"}
                variant={"ghost"}
            >
                <IconButton
                    aria-label={"zoom in"}
                    icon={<FaPlus />}
                    title={"zoom in"}
                    onClick={() => zoomIn()}
                />
                <IconButton
                    aria-label={"zoom out"}
                    icon={<FaMinus />}
                    title={"zoom out"}
                    onClick={() => zoomOut()}
                />
                <IconButton
                    aria-label={"fit view"}
                    icon={<FaExpand />}
                    title={"fit view"}
                    onClick={() => fitView()}
                />
                <IconButton
                    aria-label={"toggle interactivity"}
                    icon={isInteractive ? <FaLockOpen /> : <FaLock />}
                    title={"toggle interacivity"}
                    onClick={() => toggleInteractivity()}
                />
            </ButtonGroup>
        </Panel>
    );
}
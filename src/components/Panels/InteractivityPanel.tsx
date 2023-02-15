import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { useReactFlow } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import {
    FaExpand,
    FaMinus,
    FaPlus
} from "react-icons/fa";
import { Panel, PanelProps } from "./Panel";

type InteractivityPanelProps = Partial<Pick<PanelProps, "dock">> & {
    showZoom?: boolean;
    showFitView?: boolean;
};

const InteractivityPanel: FC<PropsWithChildren<InteractivityPanelProps>> = ({
    children,
    dock = "bottom-left",
    showZoom = true,
    showFitView = true
}) => {
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    return (
        <Panel dock={dock}>
            <ButtonGroup
                isAttached
                orientation={"vertical"}
                size={"md"}
                variant={"ghost"}
            >
                {showZoom && (
                    <IconButton
                        aria-label={"zoom in"}
                        icon={<FaPlus />}
                        title={"zoom in"}
                        onClick={() => zoomIn()}
                    />
                )}
                {showZoom && (
                    <IconButton
                        aria-label={"zoom out"}
                        icon={<FaMinus />}
                        title={"zoom out"}
                        onClick={() => zoomOut()}
                    />
                )}
                {showFitView && (
                    <IconButton
                        aria-label={"fit view"}
                        icon={<FaExpand />}
                        title={"fit view"}
                        onClick={() => fitView({ padding: 0.2, duration: 500 })}
                    />
                )}
                {children}
            </ButtonGroup>
        </Panel>
    );
}

export { InteractivityPanel };
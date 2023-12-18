import { Box } from "@chakra-ui/react";
import { Position, useStore } from "@reactflow/core";
import { Tag } from "@structurizr/dsl";
import {
    viewportSelector,
    WorkspaceElementPortal,
    WorkspaceViewportRelativerWrapper
} from "@workspace/core";
import { FC, useCallback } from "react";
import { useViewNavigation } from "../../hooks";
import { BoundingBox } from "../../types";
import { nodeSelector } from "../../utils";
import { ElementFlowHandle } from "./ElementHandle";
import { ElementZoomControl } from "./ElementZoomControl";

export const ElementFlowControls: FC = () => {
    const { selectedNodes, selectionBounds } = useStore(nodeSelector);
    const { viewport } = useStore(viewportSelector);
    const { zoomIntoElement, zoomOutOfElement } = useViewNavigation();

    const showZoomPanel = selectedNodes.length === 1;
    const showZoomIn = showZoomPanel
        && selectedNodes[0]?.type === "element"
        && selectedNodes[0]?.data.element.tags.some(tag => tag.name === Tag.SoftwareSystem.name || tag.name === Tag.Container.name);
    const showZoomOut = showZoomPanel
        && selectedNodes[0]?.type === "boundary"
        && selectedNodes[0]?.data.element.tags.some(tag => tag.name === Tag.SoftwareSystem.name || tag.name === Tag.Container.name);
    const borderRadius = selectedNodes.every(node => node?.type === "boundary" || node?.type === "elementGroup")
        ? 33 * viewport.zoom
        : selectedNodes.every(node => node?.type !== "boundary" && node?.type !== "elementGroup")
            ? 17 * viewport.zoom
            : 0;
    const boundingBox = new BoundingBox(selectionBounds)
        .multiply(viewport.zoom)
        .shift(-1)
        .extend(2);

    const handleOnZoomInClick = useCallback(() => {
        zoomIntoElement(selectedNodes[0].data.element);
    }, [selectedNodes, zoomIntoElement]);

    const handleOnZoomOutClick = useCallback(() => {
        zoomOutOfElement(selectedNodes[0].data.element);
    }, [selectedNodes, zoomOutOfElement]);

    return (
        <WorkspaceElementPortal>
            <WorkspaceViewportRelativerWrapper position={boundingBox} zIndex={1}>
                {selectedNodes.length > 0 && (
                    <Box
                        className={"workspace__element-selected"}
                        borderColor={"lime.600"}
                        borderRadius={borderRadius}
                        borderWidth={1}
                        pointerEvents={"none"}
                        position={"relative"}
                        height={boundingBox.height}
                        width={boundingBox.width}
                    />
                )}
                <ElementZoomControl
                    isPanelVisible={showZoomPanel}
                    isZoomInVisible={showZoomIn}
                    isZoomOutVisible={showZoomOut}
                    onZoomInClick={handleOnZoomInClick}
                    onZoomOutClick={handleOnZoomOutClick}
                />
                <ElementFlowHandle
                    position={Position.Left}
                    referenceBox={boundingBox}
                    area={50 * viewport.zoom}
                    isVisible={showZoomPanel}
                />
                <ElementFlowHandle
                    position={Position.Right}
                    referenceBox={boundingBox}
                    area={50 * viewport.zoom}
                    isVisible={showZoomPanel}
                />
                <ElementFlowHandle
                    position={Position.Top}
                    referenceBox={boundingBox}
                    area={50 * viewport.zoom}
                    isVisible={showZoomPanel}
                />
                <ElementFlowHandle
                    position={Position.Bottom}
                    referenceBox={boundingBox}
                    area={50 * viewport.zoom}
                    isVisible={showZoomPanel}
                />
            </WorkspaceViewportRelativerWrapper>
        </WorkspaceElementPortal>
    )
}
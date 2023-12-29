import { Box } from "@chakra-ui/react";
import { Position, useStore } from "@reactflow/core";
import { Tag, Workspace } from "@structurizr/dsl";
import {
    useWorkspace,
    viewportSelector,
    WorkspaceElementPortal,
    ViewportStaticElement
} from "@workspace/core";
import { FC, useCallback } from "react";
import { useWorkspaceNavigation } from "../../hooks";
import { BoundingBox } from "../../types";
import { nodeSelector } from "../../utils";
import { ElementFlowHandle } from "./ElementFlowHandle";
import { ElementZoomControl } from "./ElementZoomControl";

export const ElementFlowControls: FC<{
    workspace: Workspace;
}> = ({
    workspace
}) => {
    const { selectedNodes, selectionBounds } = useStore(nodeSelector);
    const { viewport } = useStore(viewportSelector);
    const state = useWorkspace();
    const { zoomIntoElement, zoomOutOfElement } = useWorkspaceNavigation();

    const showEditableControls = state.workspace !== null && state.workspace !== undefined && selectedNodes.length === 1;
    const showSelectionBorder = selectedNodes.length > 0;
    const showZoomPanel = selectedNodes.length === 1
        && selectedNodes[0]?.data.element.tags.some(tag => tag.name === Tag.SoftwareSystem.name || tag.name === Tag.Container.name);
    const showZoomIn = showZoomPanel && selectedNodes[0]?.type === "element";
    const showZoomOut = showZoomPanel && selectedNodes[0]?.type === "boundary";
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
        zoomIntoElement(workspace, selectedNodes[0].data.element);
    }, [workspace, selectedNodes, zoomIntoElement]);

    const handleOnZoomOutClick = useCallback(() => {
        zoomOutOfElement(workspace, selectedNodes[0].data.element);
    }, [workspace, selectedNodes, zoomOutOfElement]);

    return (
        <WorkspaceElementPortal>
            <ViewportStaticElement position={boundingBox} zIndex={1}>
                {showSelectionBorder && (
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
                    isVisible={showEditableControls}
                />
                <ElementFlowHandle
                    position={Position.Right}
                    referenceBox={boundingBox}
                    area={50 * viewport.zoom}
                    isVisible={showEditableControls}
                />
                <ElementFlowHandle
                    position={Position.Top}
                    referenceBox={boundingBox}
                    area={50 * viewport.zoom}
                    isVisible={showEditableControls}
                />
                <ElementFlowHandle
                    position={Position.Bottom}
                    referenceBox={boundingBox}
                    area={50 * viewport.zoom}
                    isVisible={showEditableControls}
                />
            </ViewportStaticElement>
        </WorkspaceElementPortal>
    )
}
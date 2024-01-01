import { Position, useStore } from "@reactflow/core";
import { Tag, Workspace } from "@structurizr/dsl";
import {
    ElementFlowHandle,
    ElementSelectionBorder,
    useWorkspace,
    viewportSelector,
    WorkspaceElementPortal,
    ViewportStaticElement,
    BoundingBox,
} from "@workspace/core";
import { FC, useCallback } from "react";
import { useWorkspaceNavigation } from "../../hooks";
import { nodeSelector } from "../../utils";
import { ElementZoomControl } from "./ElementZoomControl";

export const ElementFlowControls: FC<{
    workspace: Workspace;
}> = ({
    workspace
}) => {
    const { selectedNodes, selectionBounds } = useStore(nodeSelector);
    const { viewport } = useStore(viewportSelector);
    const { zoomIntoElement, zoomOutOfElement } = useWorkspaceNavigation();
    const state = useWorkspace();

    const isWorkspaceEditable = state.workspace !== null && state.workspace !== undefined;
    const canSelectedNodeHaveChildren = selectedNodes.length === 1
        && selectedNodes[0].data.element.tags.some(x => x.name === Tag.SoftwareSystem.name)
        && selectedNodes[0].data.element.tags.some(x => x.name === Tag.Container.name);
    const areAnyNodesSelected = selectedNodes.length > 0;
    
    const showEditableControls = isWorkspaceEditable && canSelectedNodeHaveChildren;
    const showSelectionBorder = areAnyNodesSelected;
    const showZoomPanel = canSelectedNodeHaveChildren;
    const showZoomIn = showZoomPanel && selectedNodes[0]?.type === "element";
    const showZoomOut = showZoomPanel && selectedNodes[0]?.type === "boundary";
    const elementSelectionBorderRadius = selectedNodes.every(node => node?.type === "boundary" || node?.type === "elementGroup")
        ? 33 * viewport.zoom
        : selectedNodes.every(node => node?.type !== "boundary" && node?.type !== "elementGroup")
            ? 17 * viewport.zoom
            : 0;
    const elementSelectionBorderBox = new BoundingBox(selectionBounds)
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
            <ViewportStaticElement position={elementSelectionBorderBox} zIndex={1}>
                <ElementSelectionBorder
                    borderRadius={elementSelectionBorderRadius}
                    colorScheme={"lime"}
                    height={elementSelectionBorderBox.height}
                    width={elementSelectionBorderBox.width}
                    isVisible={showSelectionBorder}
                />
                <ElementZoomControl
                    isPanelVisible={showZoomPanel}
                    isZoomInVisible={showZoomIn}
                    isZoomOutVisible={showZoomOut}
                    onZoomInClick={handleOnZoomInClick}
                    onZoomOutClick={handleOnZoomOutClick}
                />
                <ElementFlowHandle
                    position={Position.Left}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isVisible={showEditableControls}
                />
                <ElementFlowHandle
                    position={Position.Right}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isVisible={showEditableControls}
                />
                <ElementFlowHandle
                    position={Position.Top}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isVisible={showEditableControls}
                />
                <ElementFlowHandle
                    position={Position.Bottom}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isVisible={showEditableControls}
                />
            </ViewportStaticElement>
        </WorkspaceElementPortal>
    )
}
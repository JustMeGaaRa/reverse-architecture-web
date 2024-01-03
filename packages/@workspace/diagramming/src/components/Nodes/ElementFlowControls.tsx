import { Node, Position as PositionSide, useStore } from "@reactflow/core";
import { ElementType, getDefaultElement, IElement, Position, Tag, Workspace } from "@structurizr/dsl";
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
import { useViewFlowBuilder, useWorkspaceNavigation } from "../../hooks";
import { nodeSelector } from "../../utils";
import { ElementZoomControl } from "./ElementZoomControl";

const getOffset = (position: PositionSide) => {
    switch (position) {
        case PositionSide.Left:
            return { x: -400, y: 0 };
        case PositionSide.Right:
            return { x: 400, y: 0 };
        case PositionSide.Top:
            return { x: 0, y: -400 };
        case PositionSide.Bottom:
            return { x: 0, y: 400 };
    }
}

export const ElementFlowControls: FC<{
    workspace: Workspace;
    onHandleClick?: (sourceNode: Node, position: Position) => void;
}> = ({
    workspace,
    onHandleClick
}) => {
    const { selectedNodes, selectionBounds } = useStore(nodeSelector);
    const { viewport } = useStore(viewportSelector);
    const { zoomIntoElement, zoomOutOfElement } = useWorkspaceNavigation();
    const { addElementPreview, clearElementPreview } = useViewFlowBuilder();
    const state = useWorkspace();

    const isWorkspaceEditable = state.workspace !== null && state.workspace !== undefined;
    const isSelectedNodeEditable = selectedNodes.length === 1
        && selectedNodes[0].data.element.tags.every(x => x.name !== Tag.Person.name)
        && selectedNodes[0].data.element.tags.every(x => x.name !== Tag.Group.name)
        && selectedNodes[0].type !== "elementGroup"
        && selectedNodes[0].type !== "boundary";
    const isSelectedNodeNavigatable = selectedNodes.length === 1
        && selectedNodes[0].data.element.tags.every(x => x.name !== Tag.Person.name)
        && selectedNodes[0].data.element.tags.every(x => x.name !== Tag.Component.name);
    const areAnyNodesSelected = selectedNodes.length > 0;
    
    const showEditableControls = isWorkspaceEditable && isSelectedNodeEditable;
    const showSelectionBorder = areAnyNodesSelected;
    const showZoomPanel = isSelectedNodeNavigatable;
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

    const onElementPreview = useCallback((position: PositionSide) => {
        if (isSelectedNodeEditable) {
            const offset = getOffset(position);
            const targetPosition = {
                x: selectedNodes[0].position.x + offset.x,
                y: selectedNodes[0].position.y + offset.y
            };
            const parentId = selectedNodes[0].parentNode;
            addElementPreview(selectedNodes[0].data.element, targetPosition, parentId);
        }
    }, [isSelectedNodeEditable, selectedNodes, addElementPreview]);

    const onElementAdd = useCallback((position: PositionSide) => {
        const offset = getOffset(position);
        const targetPosition = {
            x: selectedNodes[0].position.x + offset.x,
            y: selectedNodes[0].position.y + offset.y
        };
        onHandleClick?.(selectedNodes[0], targetPosition);
    }, [onHandleClick, selectedNodes]);

    const handleOnMouseLeave = useCallback(() => {
        clearElementPreview();
    }, [clearElementPreview]);

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
                    position={PositionSide.Left}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isVisible={showEditableControls}
                    onMouseEnter={() => onElementPreview(PositionSide.Left)}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={() => onElementAdd(PositionSide.Left)}
                />
                <ElementFlowHandle
                    position={PositionSide.Right}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isVisible={showEditableControls}
                    onMouseEnter={() => onElementPreview(PositionSide.Right)}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={() =>onElementAdd(PositionSide.Right)}
                />
                <ElementFlowHandle
                    position={PositionSide.Top}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isVisible={showEditableControls}
                    onMouseEnter={() => onElementPreview(PositionSide.Top)}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={() => onElementAdd(PositionSide.Top)}
                />
                <ElementFlowHandle
                    position={PositionSide.Bottom}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isVisible={showEditableControls}
                    onMouseEnter={() => onElementPreview(PositionSide.Bottom)}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={() => onElementAdd(PositionSide.Bottom)}
                />
            </ViewportStaticElement>
        </WorkspaceElementPortal>
    )
}
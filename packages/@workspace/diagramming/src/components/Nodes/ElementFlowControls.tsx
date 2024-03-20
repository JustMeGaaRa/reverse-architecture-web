import { Node, Position as PositionSide, useStore } from "@reactflow/core";
import { IWorkspaceSnapshot, Position, Tag, Workspace } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, useCallback } from "react";
import { useViewFlowBuilder, useWorkspaceNavigation } from "../../hooks";
import { BoundingBox } from "../../types";
import { diagramNodeSelector, viewportSelector } from "../../utils";
import { ElementFlowHandle } from "../ElementFlowHandle";
import { ElementSelectionBorder } from "../ElementSelectionBorder";
import { ViewportStaticElement } from "../ViewportStaticElement";
import { WorkspaceElementPortal } from "../WorkspaceElementPortal";
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

export const ElementDiagramFlowControls: FC<{
    workspace: IWorkspaceSnapshot;
    onHandleClick?: (sourceNode: Node, position: Position) => void;
}> = ({
    workspace,
    onHandleClick
}) => {
    const { selectedNodes, selectionBounds } = useStore(diagramNodeSelector);
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
    const showZoomPanel = isSelectedNodeNavigatable && viewport.zoom >= 0.5;
    const showZoomIn = showZoomPanel && selectedNodes[0]?.type === "element";
    const showZoomOut = showZoomPanel && selectedNodes[0]?.type === "boundary";
    const elementSelectionBorderRadius = selectedNodes.every(node => node?.type === "boundary" || node?.type === "elementGroup")
        ? 33 * viewport.zoom
        : selectedNodes.every(node => node?.type !== "boundary" && node?.type !== "elementGroup")
            ? 17 * viewport.zoom
            : 0;
    const elementSelectionBorderBox = BoundingBox.fromRect(selectionBounds).scale(viewport.zoom);

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
            <ViewportStaticElement
                position={elementSelectionBorderBox.position}
                zIndex={1}
            >
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
                    isExpanded={showSelectionBorder}
                    isVisible={showEditableControls}
                    onMouseEnter={() => onElementPreview(PositionSide.Left)}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={() => onElementAdd(PositionSide.Left)}
                />
                <ElementFlowHandle
                    position={PositionSide.Right}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isExpanded={showSelectionBorder}
                    isVisible={showEditableControls}
                    onMouseEnter={() => onElementPreview(PositionSide.Right)}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={() =>onElementAdd(PositionSide.Right)}
                />
                <ElementFlowHandle
                    position={PositionSide.Top}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isExpanded={showSelectionBorder}
                    isVisible={showEditableControls}
                    onMouseEnter={() => onElementPreview(PositionSide.Top)}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={() => onElementAdd(PositionSide.Top)}
                />
                <ElementFlowHandle
                    position={PositionSide.Bottom}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isExpanded={showSelectionBorder}
                    isVisible={showEditableControls}
                    onMouseEnter={() => onElementPreview(PositionSide.Bottom)}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={() => onElementAdd(PositionSide.Bottom)}
                />
            </ViewportStaticElement>
        </WorkspaceElementPortal>
    )
}
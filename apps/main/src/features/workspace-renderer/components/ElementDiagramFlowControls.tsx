import { Box } from "@chakra-ui/react";
import { Node, Position as PositionSide, useViewport } from "@reactflow/core";
import { Position } from "@structurizr/dsl";
import {
    BoundingBox,
    ReactFlowNodeTypeNames,
    useWorkspace,
    ViewportStaticElement,
    WorkspaceElementPortal,
    useCollapsable,
    useSelectedNodes
} from "@structurizr/react";
import { FC, useCallback } from "react";
import { useViewFlowBuilder, useWorkspaceNavigation } from "../hooks";
import {
    canElementHaveChildren,
    canZoomIntoElement,
    doesElementHaveChildren,
    getSelectedNodesBorderRadius,
    getViewElementHandleOffset,
    isViewportZoomVisible
} from "../utils";
import { ElementCollapseControl } from "./ElementCollapseControl";
import { ElementFlowHandle } from "./ElementFlowHandle";
import { ElementSelectionBorder } from "./ElementSelectionBorder";
import { ElementZoomControl } from "./ElementZoomControl";

export const ElementDiagramFlowControls: FC<{
    onHandleClick?: (sourceNode: Node, position: Position) => void;
}> = ({
    onHandleClick
}) => {
    const viewport = useViewport();
    const { workspace } = useWorkspace();
    const { selectedNodes, selectionBounds } = useSelectedNodes();
    const { addSiblingPreview, addChildPreview, clearElementPreview } = useViewFlowBuilder();

    const isWorkspaceEditable = workspace !== null && workspace !== undefined;
    const isSelectedNodeFlowInteractive = selectedNodes.length === 1
        && selectedNodes[0].type !== ReactFlowNodeTypeNames.ViewElementGroup
        && selectedNodes[0].type !== ReactFlowNodeTypeNames.ViewElementBoundary;
    const isSelectedNodeCollapsed = selectedNodes[0]?.data.isCollapsed ?? false;
        
    const doesSelectedNodeHaveChildren = selectedNodes.length === 1 && doesElementHaveChildren(selectedNodes[0].data.element);
    
    const showEditableControls = isWorkspaceEditable && isSelectedNodeFlowInteractive;
    const areAnyNodesSelected = selectedNodes.length > 0;
    const showSelectionBorder = areAnyNodesSelected;
    const elementSelectionBorderRadius = getSelectedNodesBorderRadius(selectedNodes, viewport);
    const elementSelectionBorderBox = BoundingBox.fromRect(selectionBounds).scale(viewport.zoom);

    const onElementPreview = useCallback((position: PositionSide) => {
        if (isSelectedNodeFlowInteractive) {
            const offset = getViewElementHandleOffset(position);
            const targetPosition = {
                x: selectedNodes[0].position.x + offset.x,
                y: selectedNodes[0].position.y + offset.y
            };
            const parentId = selectedNodes[0].parentNode;
            addSiblingPreview(selectedNodes[0].data.element, targetPosition, parentId);
        }
    }, [isSelectedNodeFlowInteractive, selectedNodes, addSiblingPreview]);

    const onElementAdd = useCallback((position: PositionSide) => {
        const offset = getViewElementHandleOffset(position);
        const targetPosition = {
            x: selectedNodes[0].position.x + selectedNodes[0].width / 2 + offset.x,
            y: selectedNodes[0].position.y + selectedNodes[0].height + offset.y
        };
        onHandleClick?.(selectedNodes[0], targetPosition);
    }, [onHandleClick, selectedNodes]);

    const handleOnMouseLeave = useCallback(() => {
        clearElementPreview();
    }, [clearElementPreview]);

    return (
        <WorkspaceElementPortal>
            <ViewportStaticElement
                position={elementSelectionBorderBox.position}
                zIndex={1}
            >
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
                    onClick={() => onElementAdd(PositionSide.Right)}
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

export const ElementViewNavigationControls: FC = () => {
    const viewport = useViewport();
    const { workspace } = useWorkspace();
    const { zoomIntoElement, zoomOutOfElement } = useWorkspaceNavigation();
    const { selectedNodes, selectionBounds } = useSelectedNodes();

    const canZoomIntoSelectedNode = selectedNodes.length === 1 && canZoomIntoElement(selectedNodes[0].data.element);
    const showZoomPanel = canZoomIntoSelectedNode && isViewportZoomVisible(viewport);
    const showZoomIn = showZoomPanel && selectedNodes[0]?.type === ReactFlowNodeTypeNames.ViewElement;
    const showZoomOut = showZoomPanel && selectedNodes[0]?.type === ReactFlowNodeTypeNames.ViewElementBoundary;

    const areAnyNodesSelected = selectedNodes.length > 0;
    const showSelectionBorder = areAnyNodesSelected;
    const elementSelectionBorderRadius = getSelectedNodesBorderRadius(selectedNodes, viewport);
    const elementSelectionBorderBox = BoundingBox.fromRect(selectionBounds).scale(viewport.zoom);

    const handleOnZoomInClick = useCallback(() => {
        zoomIntoElement(workspace, selectedNodes[0].data.element);
    }, [zoomIntoElement, workspace, selectedNodes]);

    const handleOnZoomOutClick = useCallback(() => {
        zoomOutOfElement(workspace, selectedNodes[0].data.element);
    }, [zoomOutOfElement, workspace, selectedNodes]);

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
            </ViewportStaticElement>
            <ViewportStaticElement
                position={elementSelectionBorderBox.position}
                pointerEvents={"none"}
            >
                {showZoomPanel && (
                    <Box
                        className={"workspace__element-controls-background"}
                        backgroundColor={"gray.900"}
                        borderRadius={8}
                        pointerEvents={"none"}
                        position={"absolute"}
                        left={-6}
                        top={showZoomIn ? 2 : 6}
                        height={"24px"}
                        width={"48px"}
                    />
                )}
            </ViewportStaticElement>
        </WorkspaceElementPortal>
    )
}
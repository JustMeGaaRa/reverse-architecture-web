import { Box } from "@chakra-ui/react";
import { Node, Position as PositionSide, useViewport } from "@reactflow/core";
import { Position, Tag } from "@structurizr/dsl";
import {
    BoundingBox,
    useCollapsable,
    useSelectedNodes,
    useWorkspace,
    ViewportStaticElement,
    WorkspaceElementPortal
} from "@structurizr/react";
import { FC, useCallback } from "react";
import { useViewFlowBuilder } from "../hooks";
import {
    canElementHaveChildren,
    doesElementHaveChildren,
    getModelElementHandleOffset,
    getSelectedNodesBorderRadius,
    isViewportZoomVisible
} from "../utils";
import { ElementCollapseControl } from "./ElementCollapseControl";
import { ElementFlowHandle } from "./ElementFlowHandle";
import { ElementSelectionBorder } from "./ElementSelectionBorder";

export const ElementModelFlowControls: FC<{
    onHandleClick?: (sourceNode: Node, position: Position) => void;
}> = ({
    onHandleClick
}) => {
    const viewport = useViewport();
    const { workspace } = useWorkspace();
    const { selectedNodes, selectionBounds } = useSelectedNodes();
    const { addChildPreview, clearElementPreview } = useViewFlowBuilder();

    const isWorkspaceEditable = workspace !== null && workspace !== undefined;
    const canSelectedNodeHaveChildren = selectedNodes.length === 1 && canElementHaveChildren(selectedNodes[0].data.element);
    const areAnyNodesSelected = selectedNodes.length > 0;
    const showEditableControls = isWorkspaceEditable && canSelectedNodeHaveChildren;
    const showSelectionBorder = areAnyNodesSelected;
    const elementSelectionBorderBox = BoundingBox.fromRect(selectionBounds).scale(viewport.zoom);

    const handleOnMouseEnter = useCallback(() => {
        if (canSelectedNodeHaveChildren) {
            const offset = getModelElementHandleOffset(PositionSide.Bottom);
            const targetPosition = {
                x: selectedNodes[0].position.x + selectedNodes[0].width / 2 + offset.x,
                y: selectedNodes[0].position.y + selectedNodes[0].height + offset.y
            };
            addChildPreview(selectedNodes[0].data.element, targetPosition);
        }
    }, [addChildPreview, canSelectedNodeHaveChildren, selectedNodes]);

    const handleOnMouseLeave = useCallback(() => {
        clearElementPreview();
    }, [clearElementPreview]);

    const onElementAdd = useCallback((position: PositionSide) => {
        const offset = getModelElementHandleOffset(position);
        const targetPosition = {
            x: selectedNodes[0].position.x + selectedNodes[0].width / 2 + offset.x,
            y: selectedNodes[0].position.y + selectedNodes[0].height + offset.y
        };
        onHandleClick?.(selectedNodes[0], targetPosition);
    }, [onHandleClick, selectedNodes]);

    return (
        <WorkspaceElementPortal>
            <ViewportStaticElement
                position={elementSelectionBorderBox.position}
                zIndex={1}
            >
                <ElementFlowHandle
                    position={PositionSide.Bottom}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isExpanded={showSelectionBorder}
                    isVisible={showEditableControls}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={() => onElementAdd(PositionSide.Bottom)}
                />
            </ViewportStaticElement>
        </WorkspaceElementPortal>
    )
}

export const ElementModelCollapseControls: FC = () => {
    const viewport = useViewport();
    const { selectedNodes, selectionBounds } = useSelectedNodes();
    const { onCollapseNode, onExpandNode } = useCollapsable();

    const isSelectedNodeCollapsed = selectedNodes[0]?.data.isCollapsed ?? false;
    const doesSelectedNodeHaveChildren = selectedNodes.length === 1 && doesElementHaveChildren(selectedNodes[0].data.element);
    const areAnyNodesSelected = selectedNodes.length > 0;
    const showSelectionBorder = areAnyNodesSelected;
    const showCollapsePanel = doesSelectedNodeHaveChildren && isViewportZoomVisible(viewport);
    const elementSelectionBorderRadius = getSelectedNodesBorderRadius(selectedNodes, viewport);
    const elementSelectionBorderBox = BoundingBox.fromRect(selectionBounds).scale(viewport.zoom);
    
    const handleOnCollapseClick = useCallback(() => {
        onCollapseNode(selectedNodes[0]?.id);
    }, [onCollapseNode, selectedNodes]);

    const handleOnExpandClick = useCallback(() => {
        onExpandNode(selectedNodes[0]?.id);
    }, [onExpandNode, selectedNodes]);

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
                <ElementCollapseControl
                    isPanelVisible={showCollapsePanel}
                    isCollapsed={isSelectedNodeCollapsed}
                    onCollapseClick={handleOnCollapseClick}
                    onExpandClick={handleOnExpandClick}
                />
            </ViewportStaticElement>
            <ViewportStaticElement
                position={elementSelectionBorderBox.position}
                pointerEvents={"none"}
            >
                {showCollapsePanel && (
                    <Box
                        className={"workspace__element-controls-background"}
                        backgroundColor={"gray.900"}
                        borderRadius={8}
                        pointerEvents={"none"}
                        position={"absolute"}
                        left={-6}
                        top={2}
                        height={"24px"}
                        width={"48px"}
                    />
                )}
            </ViewportStaticElement>
        </WorkspaceElementPortal>
    )
}
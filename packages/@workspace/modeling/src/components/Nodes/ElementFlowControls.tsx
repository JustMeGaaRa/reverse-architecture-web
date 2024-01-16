import { Node, Position as PositionSide, useStore } from "@reactflow/core";
import { IWorkspace, Position, Tag, Workspace } from "@structurizr/dsl";
import {
    ElementSelectionBorder,
    useWorkspace,
    viewportSelector,
    WorkspaceElementPortal,
    ViewportStaticElement,
    BoundingBox,
    ElementFlowHandle,
} from "@workspace/core";
import { FC, useCallback } from "react";
import { useCollapsable, useModelFlowBuilder } from "../../hooks";
import { modelNodeSelector } from "../../utils";
import { ElementCollapseControl } from "./ElementCollapseControl";

const getOffset = (position: PositionSide) => {
    switch (position) {
        case PositionSide.Bottom:
            return { x: - 150, y: 64 };
        default:
            return { x: 0, y: 0 };
    }
}

export const ElementModelFlowControls: FC<{
    workspace: IWorkspace;
    onHandleClick?: (sourceNode: Node, position: Position) => void;
}> = ({
    workspace,
    onHandleClick
}) => {
    const { selectedNodes, selectionBounds } = useStore(modelNodeSelector);
    const { viewport } = useStore(viewportSelector);
    const { addElementPreview, clearElementPreview } = useModelFlowBuilder();
    const { onCollapseNode, onExpandNode } = useCollapsable();
    const state = useWorkspace();

    const isWorkspaceEditable = state.workspace !== null && state.workspace !== undefined;
    const canSelectedNodeHaveChildren = selectedNodes.length === 1
        && selectedNodes[0].data.element.tags.every(x => x.name !== Tag.Person.name)
        && selectedNodes[0].data.element.tags.every(x => x.name !== Tag.Component.name);
    const doesSelectedNodeHaveChildren = selectedNodes.length === 1
        && selectedNodes[0].data.elementChildrenCount > 0;
    const areAnyNodesSelected = selectedNodes.length > 0;
    const isSelectedNodeCollapsed = selectedNodes[0]?.data.isCollapsed ?? false;

    const showEditableControls = isWorkspaceEditable && canSelectedNodeHaveChildren;
    const showSelectionBorder = areAnyNodesSelected;
    const showCollapsePanel = doesSelectedNodeHaveChildren && viewport.zoom > 0.5;
    const elementSelectionBorderRadius = 17 * viewport.zoom;
    const elementSelectionBorderBox = BoundingBox.fromRect(selectionBounds).scale(viewport.zoom);
    
    const handleOnCollapseClick = useCallback(() => {
        onCollapseNode(selectedNodes[0]?.id);
    }, [onCollapseNode, selectedNodes]);

    const handleOnExpandClick = useCallback(() => {
        onExpandNode(selectedNodes[0]?.id);
    }, [onExpandNode, selectedNodes]);

    const handleOnMouseEnter = useCallback(() => {
        if (canSelectedNodeHaveChildren) {
            const offset = getOffset(PositionSide.Bottom);
            const targetPosition = {
                x: selectedNodes[0].position.x + selectedNodes[0].width / 2 + offset.x,
                y: selectedNodes[0].position.y + selectedNodes[0].height + offset.y
            };
            addElementPreview(selectedNodes[0].data.element, targetPosition);
        }
    }, [addElementPreview, canSelectedNodeHaveChildren, selectedNodes]);

    const handleOnMouseLeave = useCallback(() => {
        clearElementPreview();
    }, [clearElementPreview]);

    const onElementAdd = useCallback(() => {
        const offset = getOffset(PositionSide.Bottom);
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
                <ElementFlowHandle
                    position={PositionSide.Bottom}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isVisible={showEditableControls}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={onElementAdd}
                />
            </ViewportStaticElement>
        </WorkspaceElementPortal>
    )
}
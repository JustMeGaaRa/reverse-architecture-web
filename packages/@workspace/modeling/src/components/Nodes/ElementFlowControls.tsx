import { useDisclosure } from "@chakra-ui/react";
import { Position, useStore } from "@reactflow/core";
import { getDefaultChildForElement, Tag, Workspace } from "@structurizr/dsl";
import {
    ElementSelectionBorder,
    useWorkspace,
    viewportSelector,
    WorkspaceElementPortal,
    ViewportStaticElement,
    BoundingBox,
    ElementFlowHandle,
} from "@workspace/core";
import { FC, useCallback, useMemo } from "react";
import { useCollapsable, useModelFlowBuilder } from "../../hooks";
import { nodeSelector } from "../../utils";
import { ElementCollapseControl } from "./ElementCollapseControl";

export const ElementFlowControls: FC<{
    workspace: Workspace;
}> = ({
    workspace
}) => {
    const { selectedNodes, selectionBounds } = useStore(nodeSelector);
    const { viewport } = useStore(viewportSelector);
    const { addDefaultElement, addElementPreview, clearElementPreview } = useModelFlowBuilder();
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
    const showCollapsePanel = doesSelectedNodeHaveChildren;
    const elementSelectionBorderRadius = 17 * viewport.zoom;
    const elementSelectionBorderBox = new BoundingBox(selectionBounds).multiply(viewport.zoom);

    const handleOnCollapseClick = useCallback(() => {
        onCollapseNode(selectedNodes[0]?.id);
    }, [onCollapseNode, selectedNodes]);

    const handleOnExpandClick = useCallback(() => {
        onExpandNode(selectedNodes[0]?.id);
    }, [onExpandNode, selectedNodes]);

    const handleOnMouseEnter = useCallback(() => {
        if (canSelectedNodeHaveChildren) {
            const position = {
                x: selectedNodes[0].position.x + selectedNodes[0].width / 2 - 150,
                y: selectedNodes[0].position.y + selectedNodes[0].height + 64
            };
            addElementPreview(selectedNodes[0].data.element, position);
        }
    }, [addElementPreview, canSelectedNodeHaveChildren, selectedNodes]);

    const handleOnMouseLeave = useCallback(() => {
        clearElementPreview();
    }, [clearElementPreview]);

    const handleOnClick = useCallback(() => {
        addDefaultElement(selectedNodes[0].data.element.type, selectedNodes[0].data.element.identifier);
    }, [addDefaultElement, selectedNodes]);

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
                <ElementCollapseControl
                    isPanelVisible={showCollapsePanel}
                    isCollapsed={isSelectedNodeCollapsed}
                    onCollapseClick={handleOnCollapseClick}
                    onExpandClick={handleOnExpandClick}
                />
                <ElementFlowHandle
                    position={Position.Bottom}
                    referenceBox={elementSelectionBorderBox}
                    interactiveArea={50 * viewport.zoom}
                    isVisible={showEditableControls}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    onClick={handleOnClick}
                />
            </ViewportStaticElement>
        </WorkspaceElementPortal>
    )
}
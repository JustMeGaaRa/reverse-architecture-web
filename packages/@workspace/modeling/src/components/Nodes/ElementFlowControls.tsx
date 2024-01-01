import { Position, useReactFlow, useStore } from "@reactflow/core";
import { Tag, Workspace } from "@structurizr/dsl";
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
import { nodeSelector } from "../../utils";
import { ElementCollapseControl } from "./ElementCollapseControl";

export const ElementFlowControls: FC<{
    workspace: Workspace;
}> = ({
    workspace
}) => {
    const { selectedNodes, selectionBounds } = useStore(nodeSelector);
    const { viewport } = useStore(viewportSelector);
    const { setNodes, setEdges } = useReactFlow();
    const state = useWorkspace();

    const isWorkspaceEditable = state.workspace !== null && state.workspace !== undefined;
    const canSelectedNodeHaveChildren = selectedNodes.length === 1
        && selectedNodes[0].data.element.tags.every(x => x.name !== Tag.Person.name)
        && selectedNodes[0].data.element.tags.every(x => x.name !== Tag.Component.name);
    const doesSelectedNodeHaveChildren = selectedNodes.length === 1
        && selectedNodes[0].data.elementChildrenCount > 0;
    const areAnyNodesSelected = selectedNodes.length > 0;
    const isSelectedNodeCollapsed = false;
    
    const showEditableControls = isWorkspaceEditable && canSelectedNodeHaveChildren;
    const showSelectionBorder = areAnyNodesSelected;
    const showCollapsePanel = doesSelectedNodeHaveChildren;
    const elementSelectionBorderRadius = 17 * viewport.zoom;
    const elementSelectionBorderBox = new BoundingBox(selectionBounds)
        .multiply(viewport.zoom)
        .shift(-1)
        .extend(2);

    const handleOnCollapseClick = useCallback(() => {
        // TODO: collapse element
        // zoomIntoElement(workspace, selectedNodes[0].data.element);
    }, []);

    const handleOnExpandClick = useCallback(() => {
        // TODO: expand element
        // zoomOutOfElement(workspace, selectedNodes[0].data.element);
    }, []);

    const handleOnMouseEnter = useCallback(() => {
        if (canSelectedNodeHaveChildren) {
            const placeholderNode = {
                id: "placeholder-node",
                type: "placeholder",
                data: {
                    element: selectedNodes[0].data.element
                },
                position: {
                    x: selectedNodes[0].position.x,
                    y: selectedNodes[0].position.y + selectedNodes[0].height + 64
                },
            }

            const placeholderEdge = {
                id: "placeholder-edge",
                type: "smoothstep",
                source: selectedNodes[0].id,
                target: placeholderNode.id,
                style: {
                    stroke: "#535354",
                    strokeWidth: 2
                }
            }

            setNodes(nodes => [...nodes, placeholderNode]);
            setEdges(edges => [...edges, placeholderEdge]);
        }
    }, [canSelectedNodeHaveChildren, selectedNodes, setEdges, setNodes]);

    const handleOnMouseLeave = useCallback(() => {
        setNodes(nodes => nodes.filter(node => node.id !== "placeholder-node"));
        setEdges(edges => edges.filter(edge => edge.id !== "placeholder-edge"));
    }, [setEdges, setNodes]);

    const handleOnClick = useCallback(() => {

    }, []);

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
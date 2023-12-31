import { Box } from "@chakra-ui/react";
import { useStore } from "@reactflow/core";
import { Workspace } from "@structurizr/dsl";
import {
    useWorkspace,
    viewportSelector,
    WorkspaceElementPortal,
    ViewportStaticElement,
    BoundingBox
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
    const state = useWorkspace();

    const showEditableControls = state.workspace !== null && state.workspace !== undefined && selectedNodes.length === 1;
    const showSelectionBorder = selectedNodes.length > 0;
    const showPanel = selectedNodes.length === 1
        && selectedNodes[0]?.type !== "starting"
        && selectedNodes[0]?.data.elementChildrenCount > 0;
    const showCollapsed = showPanel && selectedNodes[0]?.type === "element";
    const boundingBox = new BoundingBox(selectionBounds)
        .multiply(viewport.zoom)
        .shift(-1)
        .extend(2);

    const handleOnCollapseClick = useCallback(() => {
        // zoomIntoElement(workspace, selectedNodes[0].data.element);
    }, []);

    const handleOnExpandClick = useCallback(() => {
        // zoomOutOfElement(workspace, selectedNodes[0].data.element);
    }, []);

    return (
        <WorkspaceElementPortal>
            <ViewportStaticElement position={boundingBox} zIndex={1}>
                {showSelectionBorder && (
                    <Box
                        className={"workspace__element-selected"}
                        borderColor={"lime.600"}
                        borderRadius={17 * viewport.zoom}
                        borderWidth={1}
                        pointerEvents={"none"}
                        position={"relative"}
                        height={boundingBox.height}
                        width={boundingBox.width}
                    />
                )}
                <ElementCollapseControl
                    isPanelVisible={showPanel}
                    isCollapsed={showCollapsed}
                    onCollapseClick={handleOnCollapseClick}
                    onExpandClick={handleOnExpandClick}
                />
                {/* <ElementFlowHandle
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
                /> */}
            </ViewportStaticElement>
        </WorkspaceElementPortal>
    )
}
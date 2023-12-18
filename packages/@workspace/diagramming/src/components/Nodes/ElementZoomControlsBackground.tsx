import { Box } from "@chakra-ui/react";
import { useStore } from "@reactflow/core";
import { Tag } from "@structurizr/dsl";
import {
    viewportSelector,
    WorkspaceElementPortal,
    WorkspaceViewportRelativerWrapper
} from "@workspace/core";
import { FC } from "react";
import { BoundingBox } from "../../types";
import { nodeSelector } from "../../utils";

export const ElementZoomControlsBackground: FC = () => {
    // NOTE: this is a workaround to show background underneath the zoom controls
    const { selectedNodes, selectionBounds } = useStore(nodeSelector);
    const { viewport } = useStore(viewportSelector);
    
    const showZoomPanel = selectedNodes.length === 1;
    const showZoomIn = showZoomPanel
        && selectedNodes[0]?.type === "element"
        && selectedNodes[0]?.data.element.tags.some(tag => tag.name === Tag.SoftwareSystem.name || tag.name === Tag.Container.name);
    const boundingBox = new BoundingBox(selectionBounds)
        .multiply(viewport.zoom)
        .shift(-1)
        .extend(2);

    return (
        <WorkspaceElementPortal>
            <WorkspaceViewportRelativerWrapper position={boundingBox} pointerEvents={"none"}>
                {selectedNodes.length === 1 && (
                    <Box
                        className={"workspace__element-zoom-background"}
                        aria-selected={selectedNodes.length === 1}
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
            </WorkspaceViewportRelativerWrapper>
        </WorkspaceElementPortal>
    )
}
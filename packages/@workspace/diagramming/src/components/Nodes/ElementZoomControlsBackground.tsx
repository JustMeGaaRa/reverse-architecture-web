import { Box } from "@chakra-ui/react";
import { useStore } from "@reactflow/core";
import { Tag } from "@structurizr/dsl";
import {
    viewportSelector,
    WorkspaceElementPortal,
    ViewportStaticElement,
    BoundingBox
} from "@workspace/core";
import { FC } from "react";
import { diagramNodeSelector } from "../../utils";

export const ElementZoomControlsBackground: FC = () => {
    // NOTE: this is a workaround to show background underneath the zoom controls
    const { selectedNodes, selectionBounds } = useStore(diagramNodeSelector);
    const { viewport } = useStore(viewportSelector);
    
    const isSelectedNodeNavigatable = selectedNodes.length === 1
        && selectedNodes[0].data.element.tags.every(x => x.name !== Tag.Person.name)
        && selectedNodes[0].data.element.tags.every(x => x.name !== Tag.Component.name)
        && selectedNodes[0].type !== "elementGroup";
    
    const showZoomPanel = isSelectedNodeNavigatable;
    const showZoomIn = showZoomPanel
        && selectedNodes[0]?.type === "element";
    const elementSelectionBorderRadius = new BoundingBox(selectionBounds).multiply(viewport.zoom);

    return (
        <WorkspaceElementPortal>
            <ViewportStaticElement position={elementSelectionBorderRadius} pointerEvents={"none"}>
                {showZoomPanel && (
                    <Box
                        className={"workspace__element-zoom-background"}
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
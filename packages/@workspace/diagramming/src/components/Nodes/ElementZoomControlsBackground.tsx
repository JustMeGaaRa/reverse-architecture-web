import { Box } from "@chakra-ui/react";
import { useStore } from "@reactflow/core";
import { Tag } from "@structurizr/dsl";
import { FC } from "react";
import { BoundingBox } from "../../types";
import { diagramNodeSelector, viewportSelector } from "../../utils";
import { ViewportStaticElement } from "../ViewportStaticElement";
import { WorkspaceElementPortal } from "../WorkspaceElementPortal";

export const ElementZoomControlsBackground: FC = () => {
    // NOTE: this is a workaround to show background underneath the zoom controls
    const { selectedNodes, selectionBounds } = useStore(diagramNodeSelector);
    const { viewport } = useStore(viewportSelector);
    
    const isSelectedNodeNavigatable = selectedNodes.length === 1
        && selectedNodes[0].data.element.tags.every(x => x.name !== Tag.Person.name)
        && selectedNodes[0].data.element.tags.every(x => x.name !== Tag.Component.name)
        && selectedNodes[0].type !== "elementGroup";
    
    const showZoomPanel = isSelectedNodeNavigatable && viewport.zoom >= 0.5;
    const showZoomIn = showZoomPanel
        && selectedNodes[0]?.type === "element";
    const elementSelectionBorderRadius = BoundingBox.fromRect(selectionBounds).scale(viewport.zoom);

    return (
        <WorkspaceElementPortal>
            <ViewportStaticElement
                position={elementSelectionBorderRadius.position}
                pointerEvents={"none"}
            >
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
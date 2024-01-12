import { Box } from "@chakra-ui/react";
import { useStore } from "@reactflow/core";
import {
    viewportSelector,
    WorkspaceElementPortal,
    ViewportStaticElement,
    BoundingBox
} from "@workspace/core";
import { FC } from "react";
import { modelNodeSelector } from "../../utils";

export const ElementCollapseControlsBackground: FC = () => {
    // NOTE: this is a workaround to show background underneath the zoom controls
    const { selectedNodes, selectionBounds } = useStore(modelNodeSelector);
    const { viewport } = useStore(viewportSelector);
    
    const doesSelectedNodeHaveChildren = selectedNodes.length === 1
        && selectedNodes[0].data.elementChildrenCount > 0;
    
    const showCollapsePanel = doesSelectedNodeHaveChildren && viewport.zoom > 0.5;
    const elementSelectionBorderBox = BoundingBox.fromRect(selectionBounds).scale(viewport.zoom);

    return (
        <WorkspaceElementPortal>
            <ViewportStaticElement
                position={elementSelectionBorderBox.position}
                pointerEvents={"none"}
            >
                {showCollapsePanel && (
                    <Box
                        className={"workspace__element-collapse-background"}
                        backgroundColor={"gray.900"}
                        borderRadius={8}
                        pointerEvents={"none"}
                        position={"absolute"}
                        left={-6}
                        top={3}
                        height={"24px"}
                        width={"48px"}
                    />
                )}
            </ViewportStaticElement>
        </WorkspaceElementPortal>
    )
}
import { Box } from "@chakra-ui/react";
import { useStore } from "@reactflow/core";
import {
    viewportSelector,
    WorkspaceElementPortal,
    WorkspaceViewportRelativerWrapper
} from "@workspace/core";
import { FC } from "react";
import { nodeSelector } from "../../utils";

export const ElementSelectionBorder: FC = () => {
    const { selectedNodeIds, selectionBounds } = useStore(nodeSelector);
    const { viewport } = useStore(viewportSelector);

    return (
        <WorkspaceElementPortal>
            <WorkspaceViewportRelativerWrapper position={{ x: selectionBounds.x - 1, y: selectionBounds.y - 1}}>
                {selectedNodeIds.length > 0 && (
                    <Box
                        aria-label={"rounded box outline"}
                        borderColor={"lime.600"}
                        borderRadius={17 * viewport.zoom}
                        borderWidth={1}
                        pointerEvents={"none"}
                        position={"relative"}
                        height={(selectionBounds.height + 2) * viewport.zoom}
                        width={(selectionBounds.width + 2) * viewport.zoom}
                    >
                        
                    </Box>
                )}
            </WorkspaceViewportRelativerWrapper>
        </WorkspaceElementPortal>
    )
}
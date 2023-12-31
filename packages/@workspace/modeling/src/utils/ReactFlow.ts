import { getNodesBounds, ReactFlowState } from "@reactflow/core";

export const nodeSelector = (state: ReactFlowState) => {
    const selectedNodes = Array.from(state.nodeInternals.values()).filter(node => node.selected);

    return ({
        selectionBounds: getNodesBounds(selectedNodes, state.nodeOrigin),
        selectedNodes: selectedNodes,
        selectedNodeIds: selectedNodes.map(node => node.id),
        canLock: selectedNodes.some(node => node.draggable),
    })
}
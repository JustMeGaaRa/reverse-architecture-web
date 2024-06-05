import { getNodesBounds, ReactFlowState, useStore } from "@reactflow/core";

export const useSelectedNodes = () => {
    return useStore((state: ReactFlowState) => {
        const selectedNodes = Array.from(state.nodeInternals.values()).filter(node => node.selected);
    
        return ({
            selectionBounds: getNodesBounds(selectedNodes, state.nodeOrigin),
            selectedNodes: selectedNodes,
        })
    });
}

const isNodeLocked = (state: ReactFlowState, nodeId: string) => {
    const node = state.nodeInternals.get(nodeId);
    return !(node?.draggable === true || node?.draggable === undefined);
}

const isNodeTarget = (state: ReactFlowState, nodeId: string) => {
    return state.connectionNodeId && state.connectionNodeId !== nodeId;
}

export const useNode = (nodeId: string) => {
    return useStore((state: ReactFlowState) => ({
        node: state.nodeInternals.get(nodeId),
        isLocked: isNodeLocked(state, nodeId),
        isTarget: isNodeTarget(state, nodeId)
    }));
}

export const useEdge = (edgeId: string) => {
    return useStore((state: ReactFlowState) => ({
        edge: state.edges.find(edge => edge.id === edgeId)
    }));
}
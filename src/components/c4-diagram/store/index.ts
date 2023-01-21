import { ReactFlowState } from "reactflow";

const selectedNodeSelector = (state: ReactFlowState) => Array.from(state.nodeInternals.values()).find(node => node.selected);
const selectedEdgeSelector = (state: ReactFlowState) => Array.from(state.edges).find(edge => edge.selected);

export { selectedNodeSelector, selectedEdgeSelector };
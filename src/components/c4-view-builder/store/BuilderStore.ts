import { ReactFlowState } from "@reactflow/core";

type C4ElementChanges = 
    "change position"
    | "change size"
    | "change data";

type C4RelatonshipChanges =
    "change source"
    | "change data";

type C4BuilderState = unknown;

type C4BuilderActions = {
    addElements: () => void;
    addRelationships: () => void;
    applyElementChanges: (changes: C4ElementChanges[]) => void;
    applyRelationshipChanges: (changes: C4RelatonshipChanges[]) => void;
    deleteElements: () => void;
    deleteRelationships: () => void;
    undo: () => void;
    redo: () => void;
    shareLink: () => void;
    autoLayout: () => void;
}

type C4BuilderStore = C4BuilderState & C4BuilderActions;

const selectedNodeSelector = (state: ReactFlowState) => Array.from(state.nodeInternals.values()).find(node => node.selected);
const selectedEdgeSelector = (state: ReactFlowState) => Array.from(state.edges).find(edge => edge.selected);

export {
    selectedNodeSelector,
    selectedEdgeSelector
};
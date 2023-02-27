import { ReactFlowState } from "@reactflow/core";
import { create } from "zustand";

type C4BuilderActions = {
    undo: () => void;
    redo: () => void;
    shareLink: () => void;
    autoLayout: () => void;
}

type C4BuilderStore = C4BuilderActions;

const useC4BuilderStore = create<C4BuilderStore>((set, get) => ({
    elements: [],
    relationships: [],
    undo: () => {
        console.log("undo changes")
    },
    redo: () => {
        console.log("redo changes")
    },
    shareLink: () => {
        console.log("add elements")
    },
    autoLayout: () => {
        console.log("add elements")
    },
}));


const selectedNodeSelector = (state: ReactFlowState) => Array.from(state.nodeInternals.values()).find(node => node.selected);
const selectedEdgeSelector = (state: ReactFlowState) => Array.from(state.edges).find(edge => edge.selected);


export {
    selectedNodeSelector,
    selectedEdgeSelector,
    useC4BuilderStore
};
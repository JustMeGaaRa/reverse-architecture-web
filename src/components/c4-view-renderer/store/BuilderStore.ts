import { ReactFlowState } from "@reactflow/core";
import { create } from "zustand";

type C4ElementChanges = 
    "change position"
    | "change size"
    | "change data";

type C4RelatonshipChanges =
    "change source"
    | "change data";

type C4BuilderState = {
    // elements: C4.Element[];
    // relationships: C4.Relationship[];
}

type C4BuilderActions = {
    // setElements: (elements: C4.Element[]) => void;
    // setRelationships: (relationships: Relationship[]) => void;
    // addElement: (type: string) => C4.Element;
    // addRelationship: (source: string, target: string) => C4.Relationship;
    // applyElementChanges: (changes: C4ElementChanges[]) => void;
    // applyRelationshipChanges: (changes: C4RelatonshipChanges[]) => void;
    // deleteElements: (elements: C4.Element[]) => void;
    // deleteRelationships: (relationships: C4.Relationship[]) => void;
    undo: () => void;
    redo: () => void;
    shareLink: () => void;
    autoLayout: () => void;
}

type C4BuilderStore = C4BuilderState & C4BuilderActions;

// const createElement = (type): C4.Element => {
//     return {
//         identifier: v4(),
//         name: "Element",
//         tags: [
//             { name: "Element" },
//             { name: type }
//         ]
//     };
// };

// const createRelationship = (source, target): C4.Relationship => {
//     return {
//         sourceIdentifier: source,
//         targetIdentifier: target,
//         tags: [
//             { name: "Relationship" }
//         ]
//     };
// };

const useC4BuilderStore = create<C4BuilderStore>((set, get) => ({
    elements: [],
    relationships: [],

    // setElements: (elements) => {
    //     set({ elements });
    // },
    // setRelationships: (relationships) => {
    //     set({ relationships });
    // },
    // addElement: (type) => {
    //     const element = createElement(type);
    //     set({ elements: [...get().elements, element] });
    //     return element;
    // },
    // addRelationship: (source, target) => {
    //     const relationship = createRelationship(source, target);
    //     set({ relationships: [...get().relationships, relationship] });
    //     return relationship;
    // },
    // applyElementChanges: (changes) => {
    //     console.log(changes)
    // },
    // applyRelationshipChanges: (changes) => {
    //     console.log(changes)
    // },
    // deleteElements: (elements) => {
    //     const filtered = get().elements.filter(x => 
    //         elements.some(y => y.identifier === x.identifier));
    //     set({ elements: [...filtered] });
    // },
    // deleteRelationships: (relationships) => {
    //     const filtered = get().relationships.filter(x => 
    //         relationships.some(y => 
    //             y.sourceIdentifier === x.sourceIdentifier
    //             && y.targetIdentifier === x.targetIdentifier));
    //     set({ relationships: [...filtered] });
    // },
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
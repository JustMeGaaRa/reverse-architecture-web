import { ReactFlowState } from "@reactflow/core";
import { v4 } from "uuid";
import { create } from "zustand";
import * as C4 from "./Diagram";

type C4ElementChanges = 
    "change position"
    | "change size"
    | "change data";

type C4RelatonshipChanges =
    "change source"
    | "change data";

type C4BuilderState = {
    title: string;
    elements: C4.Element[];
    relationships: C4.Relationship[];
}

type C4BuilderActions = {
    setTitle: (title: string) => void;
    setElements: (elements: C4.Element[]) => void;
    setRelationships: (relationships: C4.Relationship[]) => void;
    addElement: (type: string) => C4.Element;
    addRelationship: (type: string) => C4.Relationship;
    applyElementChanges: (changes: C4ElementChanges[]) => void;
    applyRelationshipChanges: (changes: C4RelatonshipChanges[]) => void;
    deleteElements: (elements: C4.Element[]) => void;
    deleteRelationships: (relationships: C4.Relationship[]) => void;
    undo: () => void;
    redo: () => void;
    shareLink: () => void;
    autoLayout: () => void;
}

type C4BuilderStore = C4BuilderState & C4BuilderActions;

const createElement = (type: string): C4.Element => {
    return {
        elementId: v4(),
        name: type,
        type: type
    };
};

const createRelationship = (): C4.Relationship => {
    return {
        relationshipId: v4()
    };
};

const useC4BuilderStore = create<C4BuilderStore>((set, get) => ({
    title: "Diagram",
    elements: [],
    relationships: [],

    setTitle: (title) => {
        set({ title });
    },
    setElements: (elements) => {
        set({ elements });
    },
    setRelationships: (relationships) => {
        set({ relationships });
    },
    addElement: (type) => {
        const element = createElement(type);
        set({ elements: [...get().elements, element] });
        return element;
    },
    addRelationship: (type) => {
        const relationship = createRelationship();
        set({ relationships: [...get().relationships, relationship] });
        return relationship;
    },
    applyElementChanges: (changes) => {
        console.log("add elements")
    },
    applyRelationshipChanges: (changes) => {
        console.log("add elements")
    },
    deleteElements: (elements) => {
        const filtered = get().elements.filter(x => elements.some(y => y.elementId === x.elementId));
        set({ elements: [...filtered] });
    },
    deleteRelationships: (relationships) => {
        const filtered = get().relationships.filter(x => relationships.some(y => y.relationshipId === x.relationshipId));
        set({ relationships: [...filtered] });
    },
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
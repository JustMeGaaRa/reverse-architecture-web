import { create } from "zustand";

enum InteractionMode {
    Build = "build",
    Explore = "explore"
}

type C4ViewState = {
    elements: any[];
    relationships: any[];
    mode: InteractionMode;
}

type C4ViewActions = {
    setMode: (mode: InteractionMode) => void;
    setElements: (elements: any[]) => void;
    setRelationships: (relationships: any[]) => void;
}

type C4ViewStore = C4ViewState & C4ViewActions;

const useC4DiagramStore = create<C4ViewStore>((set) => ({
    elements: [],
    relationships: [],
    mode: InteractionMode.Build,
    setElements: (elements: any[]) => {
        set({ elements });
    },
    setRelationships: (relationships: any[]) => {
        set({ relationships });
    },
    setMode: (mode) => {
        set({ mode });
    },
}));

export { useC4DiagramStore };
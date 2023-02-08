import { create } from "zustand";

enum InteractionMode {
    Build = "build",
    Explore = "explore"
}

type C4ViewState = {
    mode: InteractionMode;
}

type C4ViewActions = {
    setMode: (mode: InteractionMode) => void;
}

type C4ViewStore = C4ViewState & C4ViewActions;

const useC4ViewerStore = create<C4ViewStore>((set) => ({
    mode: InteractionMode.Build,
    
    setMode: (mode) => {
        set({ mode });
    },
}));

export { useC4ViewerStore };
import { create } from "zustand";

export type StructurizrStore = {
    text: string;

    setText: (text: string) => void;
}

export const useStructurizrStore = create<StructurizrStore>((set) => ({
    text: "",

    setText: (text: string) => {
        set({ text });
    }
}));
import { IWorkspaceMetadata } from "@structurizr/dsl";
import { create } from "zustand";

export const useMetadataStore = create<{
    metadata: IWorkspaceMetadata;
    setMetadata: (metadata: IWorkspaceMetadata) => void;
}>((set) => ({
    metadata: {
        name: "",
        lastModifiedDate: new Date(),
        views: {
            systemLandscape: undefined,
            systemContexts: [],
            containers: [],
            components: [],
            deployments: []
        }
    },
    setMetadata: (metadata: IWorkspaceMetadata) => {
        set({ metadata });
    }
}));
import { ViewDefinition } from "@structurizr/dsl";
import { Viewport } from "@workspace/core";
import { createContext, Dispatch, SetStateAction } from "react";

export type WorkspaceNavigationStore = {
    currentView?: ViewDefinition;
    viewport?: Viewport;
    setCurrentView?: Dispatch<SetStateAction<ViewDefinition>>;
    setViewport?: Dispatch<SetStateAction<Viewport>>;
}

export const WorkspaceNavigationContext = createContext<WorkspaceNavigationStore>({
    currentView: null,
    viewport: null,
    setCurrentView: () => { console.debug("WorkspaceNavigationContext: setCurrentView not implemented") },
    setViewport: () => { console.debug("WorkspaceNavigationContext: setViewport not implemented") },
});
import { IViewDefinition } from "@structurizr/dsl";
import { createContext, Dispatch, SetStateAction } from "react";
import { Viewport } from "../types";

export type WorkspaceNavigationStore = {
    currentView?: IViewDefinition;
    viewport?: Viewport;
    setCurrentView?: Dispatch<SetStateAction<IViewDefinition>>;
    setViewport?: Dispatch<SetStateAction<Viewport>>;
}

export const WorkspaceNavigationContext = createContext<WorkspaceNavigationStore>({
    currentView: null,
    viewport: null,
    setCurrentView: () => { console.debug("WorkspaceNavigationContext: setCurrentView not implemented") },
    setViewport: () => { console.debug("WorkspaceNavigationContext: setViewport not implemented") },
});
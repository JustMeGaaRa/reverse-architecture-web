import { IViewDefinition } from "@structurizr/dsl";
import { createContext, Dispatch, SetStateAction } from "react";
import { Viewport } from "../types";

export type WorkspaceNavigationStore = {
    currentView?: IViewDefinition;
    viewport?: Viewport;
    setCurrentView?: Dispatch<SetStateAction<IViewDefinition>>;
    setViewport?: Dispatch<SetStateAction<Viewport>>;
}

export const WorkspaceNavigationContext = createContext<WorkspaceNavigationStore>(null);
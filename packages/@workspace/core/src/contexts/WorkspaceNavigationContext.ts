import { IViewDefinition, ViewKeys, ViewType } from "@structurizr/dsl";
import { createContext, Dispatch, SetStateAction } from "react";
import { Viewport } from "../types";

export type WorkspaceNavigationStore = {
    currentView?: IViewDefinition;
    currentViewPath: ViewKeys[];
    viewport?: Viewport;
    setCurrentView?: Dispatch<SetStateAction<IViewDefinition>>;
    setCurrentViewPath?: Dispatch<SetStateAction<ViewKeys[]>>;
    setViewport?: Dispatch<SetStateAction<Viewport>>;
}

export const WorkspaceNavigationContext = createContext<WorkspaceNavigationStore>(null);
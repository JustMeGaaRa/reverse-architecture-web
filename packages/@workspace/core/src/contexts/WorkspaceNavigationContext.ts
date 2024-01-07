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

export const WorkspaceNavigationContext = createContext<WorkspaceNavigationStore>({
    currentView: {
        type: ViewType.SystemLandscape,
        identifier: "",
    },
    currentViewPath: [],
    viewport: { x: 0, y: 0, zoom: 1 },
    setCurrentView: () => {},
    setCurrentViewPath: () => {},
    setViewport: () => {},
})
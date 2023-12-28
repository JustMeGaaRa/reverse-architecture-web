import { IViewDefinition, ViewKeys, ViewType } from "@structurizr/dsl";
import { createContext, Dispatch, SetStateAction } from "react";

export type WorkspaceNavigationStore = {
    currentView?: IViewDefinition;
    currentViewPath: ViewKeys[];
    setCurrentView?: Dispatch<SetStateAction<IViewDefinition>>;
    setCurrentViewPath?: Dispatch<SetStateAction<ViewKeys[]>>;
}

export const WorkspaceNavigationContext = createContext<WorkspaceNavigationStore>({
    currentView: {
        type: ViewType.SystemLandscape,
        identifier: "",
    },
    currentViewPath: [],
    setCurrentView: () => {},
    setCurrentViewPath: () => {},
})
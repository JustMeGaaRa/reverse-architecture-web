import { ViewDefinition } from "@structurizr/dsl";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react";

export type WorkspaceNavigationStore = {
    currentView?: ViewDefinition;
    setCurrentView?: Dispatch<SetStateAction<ViewDefinition>>;
}

export const WorkspaceNavigationContext = createContext<WorkspaceNavigationStore>({
    currentView: null,
    setCurrentView: () => { console.debug("WorkspaceNavigationContext: setCurrentView not implemented") },
});

export const WorkspaceNavigationProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ currentView, setCurrentView ] = useState<ViewDefinition>();

    return (
        <WorkspaceNavigationContext.Provider value={{ currentView, setCurrentView }}>
            {children}
        </WorkspaceNavigationContext.Provider>
    )
};

export const useWorkspaceNavigation = () => {
    const { currentView, setCurrentView } = useContext(WorkspaceNavigationContext);

    return {
        currentView,
        setCurrentView,
    }
}
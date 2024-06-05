import { ViewDefinition } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { WorkspaceNavigationContext } from "../contexts";

export const WorkspaceNavigationProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ currentView, setCurrentView ] = useState<ViewDefinition>();

    return (
        <WorkspaceNavigationContext.Provider value={{ currentView, setCurrentView }}>
            {children}
        </WorkspaceNavigationContext.Provider>
    )
};
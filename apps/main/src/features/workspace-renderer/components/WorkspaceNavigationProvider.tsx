import { IViewDefinition } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { WorkspaceNavigationContext } from "../contexts";

export const WorkspaceNavigationProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ currentView, setCurrentView ] = useState<IViewDefinition>();

    return (
        <WorkspaceNavigationContext.Provider value={{ currentView, setCurrentView }}>
            {children}
        </WorkspaceNavigationContext.Provider>
    )
};
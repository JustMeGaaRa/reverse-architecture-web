import { IViewDefinition } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { WorkspaceNavigationContext } from "../contexts";

export const WorkspaceNavigationProvider: FC<PropsWithChildren<{
    initialView?: IViewDefinition;
}>> = ({
    children,
    initialView
}) => {
    const [ currentView, setCurrentView ] = useState<IViewDefinition>();

    useEffect(() => setCurrentView(initialView), [initialView]);

    return (
        <WorkspaceNavigationContext.Provider
            value={{
                currentView,
                setCurrentView,
            }}
        >
            {children}
        </WorkspaceNavigationContext.Provider>
    )
};
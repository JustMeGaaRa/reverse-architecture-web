import { ReactFlowProvider } from "@reactflow/core";
import { IViewDefinition, ViewKeys } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { WorkspaceNavigationContext } from "../contexts";

export const WorkspaceNavigationProvider: FC<PropsWithChildren<{
    initialView?: IViewDefinition;
}>> = ({
    children,
    initialView
}) => {
    const [ currentView, setCurrentView ] = useState<IViewDefinition>();
    const [ currentViewPath, setCurrentViewPath ] = useState<ViewKeys[]>([]);

    useEffect(() => setCurrentView(initialView), [initialView]);

    return (
        <ReactFlowProvider>
            <WorkspaceNavigationContext.Provider
                value={{
                    currentView,
                    currentViewPath,
                    setCurrentView,
                    setCurrentViewPath
                }}
            >
                {children}
            </WorkspaceNavigationContext.Provider>
        </ReactFlowProvider>
    )
};
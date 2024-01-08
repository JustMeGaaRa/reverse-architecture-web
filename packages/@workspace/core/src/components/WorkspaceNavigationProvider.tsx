import { ReactFlowProvider } from "@reactflow/core";
import { IViewDefinition, ViewKeys } from "@structurizr/dsl";
import { FC, PropsWithChildren, useCallback, useState } from "react";
import { WorkspaceNavigationContext } from "../contexts";

export const WorkspaceNavigationProvider: FC<PropsWithChildren<{
    onViewChange?: (view: IViewDefinition) => void;
}>> = ({
    children,
    onViewChange
}) => {
    const [ currentView, setCurrentView ] = useState<IViewDefinition>();
    const [ currentViewPath, setCurrentViewPath ] = useState<ViewKeys[]>([]);

    // NOTE: a wrapper function as performance optimization instead of a useEffect on currentView change
    const setCurrentViewWithCallback = useCallback((view: IViewDefinition) => {
        setCurrentView(view);
        onViewChange?.(view);
    }, [onViewChange]);

    return (
        <ReactFlowProvider>
            <WorkspaceNavigationContext.Provider
                value={{
                    currentView,
                    currentViewPath,
                    setCurrentView: setCurrentViewWithCallback,
                    setCurrentViewPath
                }}
            >
                {children}
            </WorkspaceNavigationContext.Provider>
        </ReactFlowProvider>
    )
};
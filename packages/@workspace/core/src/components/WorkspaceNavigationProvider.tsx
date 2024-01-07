import { ReactFlowProvider, useOnViewportChange, useReactFlow } from "@reactflow/core";
import { IViewDefinition, ViewKeys } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { WorkspaceNavigationContext } from "../contexts";
import { Viewport } from "../types";

const ViewportUpdater: FC<PropsWithChildren<{
    viewport: Viewport,
    onViewportChange?: (viewport: Viewport) => void;
}>> = ({
    children,
    viewport,
    onViewportChange
}) => {

    const { setViewport } = useReactFlow();
    
    useEffect(() => viewport && setViewport(viewport), [setViewport, viewport]);
    useOnViewportChange({ onEnd: onViewportChange });

    return (
        <>
            {children}
        </>
    )
}

export const WorkspaceNavigationProvider: FC<PropsWithChildren<{
    initialView?: IViewDefinition;
    viewport?: Viewport;
    onViewChange?: (view: IViewDefinition) => void;
    onViewportChange?: (viewport: Viewport) => void;
}>> = ({
    children,
    initialView,
    viewport,
    onViewChange,
    onViewportChange
}) => {
    const [ currentView, setCurrentView ] = useState<IViewDefinition>();
    const [ currentViewPath, setCurrentViewPath ] = useState<ViewKeys[]>([]);

    // TODO: consider using a wrapper function for setCurrentView instead as performance optimization
    useEffect(() => setCurrentView(initialView), [initialView]);
    useEffect(() => onViewChange?.(currentView), [currentView, onViewChange]);

    return (
        <ReactFlowProvider>
            <ViewportUpdater viewport={viewport} onViewportChange={onViewportChange}>
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
            </ViewportUpdater>
        </ReactFlowProvider>
    )
};
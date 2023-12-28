import { IViewDefinition, ViewKeys } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { WorkspaceNavigationContext } from "../contexts";

export const WorkspaceNavigationProvider: FC<PropsWithChildren<{
    initialView?: IViewDefinition;
}>> = (props) => {
    const [ currentView, setCurrentView ] = useState<IViewDefinition>();
    const [ currentViewPath, setCurrentViewPath ] = useState<ViewKeys[]>([]);

    useEffect(() => setCurrentView(props.initialView), [props.initialView]);

    return (
        <WorkspaceNavigationContext.Provider
            value={{
                currentView,
                currentViewPath,
                setCurrentView,
                setCurrentViewPath
            }}
        >
            {props.children}
        </WorkspaceNavigationContext.Provider>
    )
};
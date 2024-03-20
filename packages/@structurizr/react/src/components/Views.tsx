import { IViews } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ViewsContext } from "../contexts";
import { useWorkspace } from "../hooks";

export const Views: FC<PropsWithChildren> = ({ children }) => {
    const [ views, setViews ] = useState<IViews>();
    const { workspace } = useWorkspace();

    useEffect(() => {
        if (workspace) {
            // const updateFlow = () => {
            //     const workspaceSnapshot = workspace.toSnapshot();
            //     console.log("views updated", workspaceSnapshot);
            // }
    
            // workspace.views.subscribe(updateFlow);
            // updateFlow();
    
            // return () => {
            //     workspace.views.unsubscribe(updateFlow);
            // }
        }
    }, [workspace]);

    return (
        <ViewsContext.Provider value={{ views, setViews }}>
            {children}
        </ViewsContext.Provider>
    )
}
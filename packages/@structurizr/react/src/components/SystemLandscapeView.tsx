import { ISystemLandscapeView, SystemLandscapeViewStrategy } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect } from "react";
import { SystemLandscapeViewContext } from "../contexts";
import { useViewRenderer, useWorkspace } from "../hooks";
import { ViewMetadataProvider } from "./ViewMetadataProvider";

export const SystemLandscapeView: FC<PropsWithChildren<{ view: ISystemLandscapeView }>> = ({ children, view }) => {
    const { workspace } = useWorkspace();
    const { renderView } = useViewRenderer();
    
    useEffect(() => {
        const strategy = new SystemLandscapeViewStrategy(workspace.model, view);
        return renderView(workspace, view, strategy);
    }, [workspace, view, renderView]);

    return (
        <SystemLandscapeViewContext.Provider value={{ systemLandscapeView: view }}>
            {/* <ViewMetadataProvider metadata={view}> */}
                {children}
            {/* </ViewMetadataProvider> */}
        </SystemLandscapeViewContext.Provider>
    )
}
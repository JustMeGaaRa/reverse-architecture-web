import { ISystemContextView, SystemContextViewStrategy } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect } from "react";
import { useViewRenderer, useWorkspace } from "../hooks";
import { ViewMetadataProvider } from "./ViewMetadataProvider";

export const SystemContextView: FC<PropsWithChildren<{ view: ISystemContextView }>> = ({ children, view }) => {
    // const [ systemContextView, setSystemContextView ] = useState<ISystemContextView>();
    const { workspace } = useWorkspace();
    const { renderView } = useViewRenderer();

    // NOTE: we need to re-render the view ONLY when the selected view changes
    useEffect(() => {
        const strategy = new SystemContextViewStrategy(workspace.model, view);
        return renderView(workspace, view, strategy);
    }, [workspace, view, renderView]);

    return (
        // <SystemContextViewContext.Provider value={{ view }}>
            <ViewMetadataProvider metadata={view}>
                {children}
            </ViewMetadataProvider>
        // </SystemContextViewContext.Provider>
    )
}
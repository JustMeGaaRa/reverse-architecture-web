import { ComponentViewStrategy, IComponentView } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect } from "react";
import { useViewRenderer, useWorkspace } from "../hooks";
import { ViewMetadataProvider } from "./ViewMetadataProvider";

export const ComponentView: FC<PropsWithChildren<{ view: IComponentView }>> = ({ children, view }) => {
    // const [ componentView, setComponentView ] = useState<IComponentView>();
    const { workspace } = useWorkspace();
    const { renderView } = useViewRenderer();

    // NOTE: we need to re-render the view ONLY when the selected view changes
    useEffect(() => {
        const strategy = new ComponentViewStrategy(workspace.model, view);
        return renderView(workspace, view, strategy);
    }, [workspace, view, renderView]);

    return (
        // <ComponentViewContext.Provider value={{ componentView, setComponentView }}>
            <ViewMetadataProvider metadata={view}>
                {children}
            </ViewMetadataProvider>
        // </ComponentViewContext.Provider>
    )
}
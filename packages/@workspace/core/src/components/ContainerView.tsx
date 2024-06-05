import { ContainerViewStrategy, IContainerView } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect } from "react";
import { useViewRenderer, useWorkspace } from "../hooks";
import { ViewMetadataProvider } from "./ViewMetadataProvider";

export const ContainerView: FC<PropsWithChildren<{ view: IContainerView }>> = ({ children, view }) => {
    // const [ containerView, setContainerView ] = useState<IContainerView>();
    const { workspace } = useWorkspace();
    const { renderView } = useViewRenderer();

    // NOTE: we need to re-render the view ONLY when the selected view changes
    useEffect(() => {
        const strategy = new ContainerViewStrategy(workspace.model, view);
        return renderView(workspace, view, strategy);
    }, [workspace, view, renderView]);

    return (
        // <ContainerViewContext.Provider value={{ containerView, setContainerView }}>
            <ViewMetadataProvider metadata={view}>
                {children}
            </ViewMetadataProvider>
        // </ContainerViewContext.Provider>
    )
}
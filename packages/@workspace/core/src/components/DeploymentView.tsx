import { DeploymentViewStrategy, IDeploymentView } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect } from "react";
import { useViewRenderer, useWorkspace } from "../hooks";
import { ViewMetadataProvider } from "./ViewMetadataProvider";

export const DeploymentView: FC<PropsWithChildren<{ view: IDeploymentView }>> = ({ children, view }) => {
    // const [ deploymentView, setDeploymentView ] = useState<IDeploymentView>();
    const { workspace } = useWorkspace();
    const { renderView } = useViewRenderer();

    // NOTE: we need to re-render the view ONLY when the selected view changes
    useEffect(() => {
        const strategy = new DeploymentViewStrategy(workspace.model, view);
        return renderView(workspace, view, strategy);
    }, [workspace, view, renderView]);

    return (
        // <DeploymentViewContext.Provider value={{ deploymentView, setDeploymentView }}>
            <ViewMetadataProvider metadata={view}>
                {children}
            </ViewMetadataProvider>
        // </DeploymentViewContext.Provider>
    )
}
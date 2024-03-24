import { DeploymentViewStrategy, IDeploymentView } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, PropsWithChildren, useEffect } from "react";
import { useDeploymentView, useViewRenderer } from "../hooks";
import { ViewMetadataProvider } from "./Views";

export const DeploymentView: FC<PropsWithChildren<{ view: IDeploymentView }>> = ({ children, view }) => {
    const { workspace } = useWorkspace();
    const { } = useDeploymentView(view.identifier, view["environment"]);
    const { renderView } = useViewRenderer();

    // NOTE: we need to re-render the view ONLY when the selected view changes
    useEffect(() => {
        const strategy = new DeploymentViewStrategy(workspace.model, view, view["environment"]);
        return renderView(workspace, view, strategy);
    }, [workspace, view, renderView]);

    return (
        <ViewMetadataProvider metadata={view}>
            {children}
        </ViewMetadataProvider>
    )
}
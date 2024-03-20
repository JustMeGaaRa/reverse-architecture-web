import { DeploymentViewStrategy, IDeploymentView } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, PropsWithChildren, useEffect } from "react";
import { useViewRenderingEffect, useDeploymentView, useViewStrategy } from "../hooks";

export const DeploymentView: FC<PropsWithChildren<{ view: IDeploymentView }>> = ({ children, view }) => {
    const { workspace } = useWorkspace();
    const { setStrategy } = useViewStrategy();
    const { } = useDeploymentView(view.identifier, view["environment"]);
    
    useEffect(() => setStrategy(new DeploymentViewStrategy(workspace.model, view, view["environment"])), [setStrategy, view, workspace.model]);
    useViewRenderingEffect(view);

    return (
        <>
            {children}
        </>
    )
}
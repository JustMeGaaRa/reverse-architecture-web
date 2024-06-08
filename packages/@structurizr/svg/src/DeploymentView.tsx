import { createDefaultDeploymentView, DeploymentViewStrategy } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ViewElementJsxVisitor } from "./types";
import { IViewMetadata, ViewMetadataProvider } from "./ViewMetadataProvider";
import { useWorkspace } from "./Workspace";

export const DeploymentView: FC<PropsWithChildren<{
    value: { key?: string; softwareSystemIdentifier: string; environment: string };
    metadata?: IViewMetadata;
}>> = ({
    children,
    value,
    metadata
}) => {
    const { workspace } = useWorkspace();
    const [ elements, setElements ] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (workspace) {
            const visitor = new ViewElementJsxVisitor();
            const deploymentView = workspace.views.deployments.find(x => x.key === value.key)
                ?? createDefaultDeploymentView();
            const strategy = new DeploymentViewStrategy(workspace.model, deploymentView);
            const elements = strategy.accept(visitor);
            setElements(elements);
        }
    }, [workspace, value.key, value.softwareSystemIdentifier, value.environment]);
    
    return (
        <ViewMetadataProvider metadata={metadata}>
            {elements}
            {children}
        </ViewMetadataProvider>
    );
};

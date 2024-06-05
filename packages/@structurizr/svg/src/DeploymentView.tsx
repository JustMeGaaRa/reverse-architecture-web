import { DeploymentViewStrategy } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { JsxElementVisitor } from "./types";
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
            const visitor = new JsxElementVisitor();
            const deploymentView = workspace.views.deployments.find(x => x.key === value.key);
            const strategy = new DeploymentViewStrategy(workspace.model, deploymentView);
            const elements = strategy.accept(visitor);
            setElements(elements);
        }
    }, [workspace, value.key]);
    
    return (
        <ViewMetadataProvider metadata={metadata}>
            {elements}
            {children}
        </ViewMetadataProvider>
    );
};

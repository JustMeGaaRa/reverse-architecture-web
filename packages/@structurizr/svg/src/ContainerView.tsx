import { ContainerViewStrategy } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { JsxElementVisitor } from "./types";
import { IViewMetadata, ViewMetadataProvider } from "./ViewMetadataProvider";
import { useWorkspace } from "./Workspace";

export const ContainerView: FC<PropsWithChildren<{
    value?: { key?: string; softwareSystemIdentifier: string; };
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
            const containerView = workspace.views.containers.find(x => x.key === value.key);
            const strategy = new ContainerViewStrategy(workspace.model, containerView);
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
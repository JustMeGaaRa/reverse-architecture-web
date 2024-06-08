import { ComponentViewStrategy, createDefaultComponentView } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ViewElementJsxVisitor } from "./types";
import { IViewMetadata, ViewMetadataProvider } from "./ViewMetadataProvider";
import { useWorkspace } from "./Workspace";

export const ComponentView: FC<PropsWithChildren<{
    value?: { key?: string; containerIdentifier: string; };
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
            const componentView = workspace.views.components.find(x => x.key === value.key)
                ?? createDefaultComponentView(value.containerIdentifier);
            const strategy = new ComponentViewStrategy(workspace.model, componentView);
            const elements = strategy.accept(visitor);
            setElements(elements);
        }
    }, [workspace, value.key, value.containerIdentifier]);
    
    return (
        <ViewMetadataProvider metadata={metadata}>
            {elements}
            {children}
        </ViewMetadataProvider>
    );
};

import { createDefaultSystemContextView, SystemContextViewStrategy } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { IViewMetadata, ViewMetadataProvider } from "./components";
import { ViewElementJsxVisitor } from "./types";
import { useWorkspace } from "./Workspace";

export const SystemContextView: FC<PropsWithChildren<{
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
            const visitor = new ViewElementJsxVisitor();
            const systemContextView = workspace.views.systemContexts.find(x => x.key === value.key)
                ?? createDefaultSystemContextView(value.softwareSystemIdentifier);
            const strategy = new SystemContextViewStrategy(workspace.model, systemContextView);
            const elements = strategy.accept(visitor);
            setElements(elements);
        }
    }, [workspace, value.key, value.softwareSystemIdentifier]);
    
    return (
        <ViewMetadataProvider metadata={metadata}>
            {elements}
            {children}
        </ViewMetadataProvider>
    );
};

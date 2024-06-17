import { createDefaultSystemLandscapeView, SystemLandscapeViewStrategy } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { IViewMetadata, ViewMetadataProvider } from "./components";
import { ViewElementJsxVisitor } from "./types";
import { useWorkspace } from "./Workspace";

export const SystemLandscapeView: FC<PropsWithChildren<{
    value?: { key?: string };
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
            const systemLandscapeView = workspace.views.systemLandscape
                ?? createDefaultSystemLandscapeView();
            const strategy = new SystemLandscapeViewStrategy(workspace.model, systemLandscapeView);
            const elements = strategy.accept(visitor);
            setElements(elements);
        }
    }, [workspace]);

    return (
        <ViewMetadataProvider metadata={metadata}>
            {/* TODO: figure out how to combine algorithm and event handlers */}
            {elements}
            {children}
        </ViewMetadataProvider>
    );
};

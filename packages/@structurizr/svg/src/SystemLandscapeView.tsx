import { createDefaultSystemLandscapeView, SystemLandscapeViewStrategy } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { JsxElementVisitor } from "./types";
import { IViewMetadata, ViewMetadataProvider } from "./ViewMetadataProvider";
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
            const visitor = new JsxElementVisitor();
            const systemLandscapeView = workspace.views.systemLandscape ?? createDefaultSystemLandscapeView();
            const strategy = new SystemLandscapeViewStrategy(workspace.model, systemLandscapeView);
            const elements = strategy.accept(visitor);
            setElements(elements);
        }
    }, [workspace]);

    return (
        <ViewMetadataProvider metadata={metadata}>
            {elements}
            {children}
        </ViewMetadataProvider>
    );
};

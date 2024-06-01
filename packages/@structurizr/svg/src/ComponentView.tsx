import { ComponentViewStrategy } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { JsxElementVisitor } from "./types";
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
            const visitor = new JsxElementVisitor();
            const componentView = workspace.views.components.find(x => x.key === value.key);
            const strategy = new ComponentViewStrategy(workspace.model, componentView);
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

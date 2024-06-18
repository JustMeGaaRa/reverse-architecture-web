import { createDefaultSystemLandscapeView, SystemLandscapeViewStrategy } from "@structurizr/dsl";
import { FC, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import { IViewMetadata, ViewMetadataProvider } from "./components";
import { ViewElementJsxVisitor } from "./types";
import { GraphElementVisitor } from "./types/GraphElementVisitor";
import { useWorkspace } from "./Workspace";

export const SystemLandscapeView: FC<PropsWithChildren<{
    value?: { key?: string };
    metadata?: IViewMetadata;
    setMetadata?: React.Dispatch<SetStateAction<IViewMetadata>>;
}>> = ({
    children,
    value,
    metadata,
    setMetadata = () => { console.debug("setMetadata not implemented"); },
}) => {
    const { workspace } = useWorkspace();
    const [ elements, setElements ] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (workspace) {
            const systemLandscapeView = workspace.views.systemLandscape
                ?? createDefaultSystemLandscapeView();
            const visitor = new ViewElementJsxVisitor();
            const strategy = new SystemLandscapeViewStrategy(workspace.model, systemLandscapeView);
            const elements = strategy.accept(visitor);

            const graphVisitor = new GraphElementVisitor();
            const graphElements = strategy.accept(graphVisitor);
            setElements(elements);
        }
    }, [workspace]);

    return (
        <ViewMetadataProvider metadata={metadata} setMetadata={setMetadata}>
            {/* TODO: figure out how to combine algorithm and event handlers */}
            {elements}
            {children}
        </ViewMetadataProvider>
    );
};

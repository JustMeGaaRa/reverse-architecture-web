import { ModelViewStrategy } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ViewMetadataProvider } from "./components";
import { ModelElementJsxVisitor } from "./types";
import { useWorkspace } from "./Workspace";

export const ModelView: FC<PropsWithChildren> = ({ children }) => {
    const { workspace } = useWorkspace();
    const [ elements, setElements ] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (workspace) {
            const visitor = new ModelElementJsxVisitor();
            const strategy = new ModelViewStrategy(workspace);
            const elements = strategy.accept(visitor);
            setElements(elements);
        }
    }, [workspace]);
    
    return (
        <ViewMetadataProvider>
            {elements}
            {children}
        </ViewMetadataProvider>
    );
};

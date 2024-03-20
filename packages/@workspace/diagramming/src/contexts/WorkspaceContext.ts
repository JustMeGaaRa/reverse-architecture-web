import { ISupportVisitor, IViewDefinitionMetadata, IWorkspaceSnapshot } from "@structurizr/dsl";
import { createContext, SetStateAction, Dispatch } from "react";
import * as Y from "yjs";

export type WorkspaceStore = {
    workspaceDocument?: Y.Doc;
    workspace: IWorkspaceSnapshot;
    undoManager?: Y.UndoManager;
    setWorkspace?: Dispatch<SetStateAction<IWorkspaceSnapshot>>;
};

export const WorkspaceContext = createContext<WorkspaceStore>(null);

export const ViewStrategyContext = createContext<{
    strategy: ISupportVisitor;
    setStrategy?: (strategy: ISupportVisitor) => void;
}>({
    strategy: null,
    setStrategy: () => { console.debug("ViewStrategy Context: dummy setStrategy") },
});

export const ViewMetadataContext = createContext<{
    metadata: IViewDefinitionMetadata;
    setMetadata?: Dispatch<SetStateAction<IViewDefinitionMetadata>>;
}>({
    metadata: null,
    setMetadata: () => { console.debug("ViewMetadata Context: dummy setMetadata") },
});
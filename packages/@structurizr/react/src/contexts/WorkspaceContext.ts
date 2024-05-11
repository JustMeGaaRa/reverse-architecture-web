import { IWorkspaceMetadata, IWorkspaceSnapshot } from "@structurizr/dsl";
import { createContext, Dispatch, SetStateAction } from "react";

export const WorkspaceContext = createContext<{
    workspace: IWorkspaceSnapshot;
    setWorkspace?: Dispatch<SetStateAction<IWorkspaceSnapshot>>;
}>({
    workspace: undefined,
    setWorkspace: () => { console.debug("Workspace Context: dummy setWorkspace") },
});

export const WorkspaceMetadataContext = createContext<{
    metadata: IWorkspaceMetadata;
    setMetadata?: Dispatch<SetStateAction<IWorkspaceMetadata>>;
}>({
    metadata: undefined,
    setMetadata: () => { console.debug("Workspace Metadata Context: dummy setMetadata") },
});

export const ElementContext = createContext<{
    isReadonly: boolean;
}>({
    isReadonly: false
});
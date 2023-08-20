import { IWorkspace, IWorkspaceMetadata } from "@structurizr/dsl";
import { FC, useEffect } from "react";
import { useWorkspaceMetadataStore, useWorkspaceStore } from "../hooks";

export const WorkspaceStoreUpdater: FC<{
    workspace?: IWorkspace;
    metadata?: IWorkspaceMetadata;
}> = ({
    workspace,
    metadata
}) => {
    useEffect(() => useWorkspaceStore.setState({ workspace }), [workspace]);
    useEffect(() => useWorkspaceMetadataStore.setState({ metadata }), [metadata]);
    return undefined;
}
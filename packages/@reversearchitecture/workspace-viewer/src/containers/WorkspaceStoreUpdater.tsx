import { IViewDefinition, IWorkspace, IWorkspaceMetadata } from "@structurizr/dsl";
import { FC, useEffect } from "react";
import { useWorkspaceMetadataStore, useWorkspaceStore } from "../hooks";
import { getView } from "../utils";

export const WorkspaceStoreUpdater: FC<{
    workspace?: IWorkspace;
    view?: IViewDefinition;
    metadata?: IWorkspaceMetadata;
}> = ({
    workspace,
    view,
    metadata
}) => {
    useEffect(() => useWorkspaceStore.setState({ workspace }), [workspace]);
    useEffect(() => useWorkspaceStore.setState({ selectedView: getView(workspace, view) }), [workspace, view]);
    useEffect(() => useWorkspaceMetadataStore.setState({ metadata }), [metadata]);
    return undefined;
}
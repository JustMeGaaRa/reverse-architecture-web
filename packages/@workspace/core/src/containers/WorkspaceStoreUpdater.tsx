import { IViewDefinition, IWorkspace, IWorkspaceMetadata } from "@structurizr/dsl";
import { FC, useEffect } from "react";
import { useWorkspaceStore } from "../hooks";
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
    useEffect(() => useWorkspaceStore.setState(state => ({ ...state, workspace })), [workspace]);
    useEffect(() => useWorkspaceStore.setState(state => ({ ...state, selectedView: getView(workspace, view) })), [workspace, view]);
    useEffect(() => useWorkspaceStore.setState(state => ({ ...state, metadata })), [metadata]);
    return undefined;
}
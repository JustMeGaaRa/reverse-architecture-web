import { IViewDefinition, IWorkspace, IWorkspaceMetadata, Workspace } from "@structurizr/dsl";
import { FC, useEffect } from "react";
import { useMetadata, useWorkspace } from "../hooks";

export const WorkspaceStoreUpdater: FC<{
    workspace?: IWorkspace;
    selectedView?: IViewDefinition;
    metadata?: IWorkspaceMetadata;
}> = ({
    workspace,
    selectedView,
    metadata
}) => {
    const { setWorkspace, setSelectedView } = useWorkspace();
    const { setMetadata } = useMetadata();
    
    useEffect(() => setWorkspace(workspace), [workspace, setWorkspace]);
    // useEffect(() => setSelectedView(selectedView), [selectedView, setSelectedView]);
    useEffect(() => setMetadata(metadata), [metadata, setMetadata]);

    return undefined;
}
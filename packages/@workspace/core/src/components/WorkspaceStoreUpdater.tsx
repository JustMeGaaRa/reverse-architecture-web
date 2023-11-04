import { IWorkspace, IWorkspaceMetadata } from "@structurizr/dsl";
import { FC, useEffect } from "react";
import { useWorkspaceStore } from "../hooks";

export const WorkspaceStoreUpdater: FC<{
    workspace?: IWorkspace;
    metadata?: IWorkspaceMetadata;
}> = ({
    workspace,
    metadata
}) => {
    useEffect(() => useWorkspaceStore.setState(state => ({ ...state, workspace })), [workspace]);
    useEffect(() => useWorkspaceStore.setState(state => ({ ...state, metadata })), [metadata]);
    return undefined;
}
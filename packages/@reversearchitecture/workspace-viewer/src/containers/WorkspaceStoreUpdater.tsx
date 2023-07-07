import { IViewDefinition, Workspace } from "@structurizr/dsl";
import { FC, useEffect } from "react";
import { useWorkspaceStore } from "../hooks";

export const WorkspaceStoreUpdater: FC<{
    workspace?: Workspace;
    selectedView?: IViewDefinition;
}> = ({
    workspace,
    selectedView,
}) => {
    const { setWorkspace, setSelectedView } = useWorkspaceStore();
    
    useEffect(() => setWorkspace(workspace), [setWorkspace, workspace]);
    useEffect(() => setSelectedView(selectedView), [selectedView, setSelectedView]);

    return (
        <>
        </>
    )
}
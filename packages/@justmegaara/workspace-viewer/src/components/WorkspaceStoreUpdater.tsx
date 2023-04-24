import { GenericView, Workspace, WorkspaceLayout } from "@justmegaara/structurizr-dsl";
import { FC, useEffect } from "react";
import { useWorkspaceStore } from "../store";

export const WorkspaceStoreUpdater: FC<{
    workspace?: Workspace;
    layout?: WorkspaceLayout;
    selectedView?: GenericView;
}> = ({
    workspace,
    layout,
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
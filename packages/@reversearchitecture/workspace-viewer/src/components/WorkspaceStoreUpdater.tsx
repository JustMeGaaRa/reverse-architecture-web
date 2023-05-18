import { IView, Workspace } from "@structurizr/dsl";
import { FC, useEffect } from "react";
import { useWorkspaceStore } from "../store/useWorkspaceStore";

export const WorkspaceStoreUpdater: FC<{
    workspace?: Workspace;
    selectedView?: IView;
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
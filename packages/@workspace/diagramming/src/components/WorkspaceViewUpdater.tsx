import { IViewDefinition, IWorkspaceSnapshot } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, useEffect } from "react";
import { useWorkspaceNavigation } from "../hooks";

export const WorkspaceViewUpdater: FC<{
    workspace: IWorkspaceSnapshot;
    currentView?: IViewDefinition;
}> = ({
    workspace,
    currentView
}) => {
    const { openView } = useWorkspaceNavigation();

    // NOTE: update the current view and do not trigger onViewChange callback, as it has not changed
    useEffect(() => {
        if (workspace && currentView) {
            openView(workspace, currentView)
        }
    }, [workspace, currentView, openView]);
    return null;
}

export const WorkspaceUpdater: FC<{
    workspace: IWorkspaceSnapshot;
}> = ({
    workspace
}) => {
    const { setWorkspace } = useWorkspace();

    useEffect(() => {
        if (workspace) {
            setWorkspace(workspace);
        }
    }, [workspace, setWorkspace]);

    return null;
}
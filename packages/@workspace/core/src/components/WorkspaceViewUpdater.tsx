import { IViewDefinition, Workspace } from "@structurizr/dsl";
import { FC, useEffect } from "react";
import { useWorkspaceNavigation } from "../hooks";

export const WorkspaceViewUpdater: FC<{
    workspace: Workspace;
    currentView?: IViewDefinition;
}> = ({
    workspace,
    currentView
}) => {
    const { openView } = useWorkspaceNavigation();

    // NOTE: update the current view and do not trigger onViewChange callback, as it has not changed
    useEffect(() => openView(workspace, currentView), [workspace, currentView, openView]);
    return null;
}
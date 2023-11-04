import { IViewDefinition, IWorkspace } from "@structurizr/dsl";
import { useWorkspaceStore } from "@workspace/core";
import { FC, useEffect } from "react";
import { getView } from "../utils";

export const WorkspaceViewStoreUpdater: FC<{
    workspace?: IWorkspace;
    view?: IViewDefinition;
}> = ({
    workspace,
    view,
}) => {
    useEffect(() => useWorkspaceStore.setState(state => ({ ...state, selectedView: getView(workspace, view) })), [workspace, view]);
    return undefined;
}
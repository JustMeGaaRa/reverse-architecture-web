import { useStoreApi } from "@reactflow/core";
import { Workspace } from "@structurizr/dsl";
import { useCallback } from "react";
import { useWorkspaceStore, useWorkspaceToolbarStore } from "@workspace/core";
import { getView } from "@workspace/diagramming";

export const useAutoLayoutMode = () => {
    const { setState } = useStoreApi();
    const { workspace, selectedView } = useWorkspaceStore();

    const toggleAutoLayout = useCallback(() => {
        const isAutoLayoutEnabled = selectedView.autoLayout !== undefined;
        const builder = new Workspace(workspace);

        builder.views.systemLandscape?.type === selectedView.type
            && builder.views.systemLandscape?.identifier === selectedView.identifier
            && builder.views.systemLandscape?.setAutoLayout(!isAutoLayoutEnabled);
        builder.views.systemContexts
            .filter(view => view.type === selectedView.type && view.identifier === selectedView.identifier)
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));
        builder.views.containers
            .filter(view => view.type === selectedView.type && view.identifier === selectedView.identifier)
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));
        builder.views.components
            .filter(view => view.type === selectedView.type && view.identifier === selectedView.identifier)
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));
        builder.views.deployments
            .filter(view => view.type === selectedView.type && view.identifier === selectedView.identifier && view.environment === selectedView?.["environment"])
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));

        const workspaceUpdated = builder.toObject();
        useWorkspaceStore.setState(state => ({
            ...state,
            workspace: workspaceUpdated,
            selectedView: getView(workspaceUpdated, selectedView)
        }));
        
        useWorkspaceToolbarStore.setState(state => ({
            ...state,
            isAutoLayoutEnabled: !isAutoLayoutEnabled
        }));
        
        setState({
            // NOTE: nodes should be draggable if we turn off auto layout
            nodesDraggable: isAutoLayoutEnabled,
        });
    }, [workspace, selectedView, setState]);

    return { toggleAutoLayout }
}
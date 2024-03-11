import { useStoreApi } from "@reactflow/core";
import { Workspace } from "@structurizr/dsl";
import { useCallback } from "react";
import { useWorkspace, useWorkspaceNavigation, useWorkspaceToolbarStore } from "@workspace/core";

export const useAutoLayoutMode = () => {
    const { setState } = useStoreApi();
    const { workspace } = useWorkspace();
    const { currentView } = useWorkspaceNavigation();

    const toggleAutoLayout = useCallback(() => {
        const isAutoLayoutEnabled = false;//currentView.autoLayout !== undefined;
        const builder = new Workspace(workspace);

        builder.views.systemLandscape
            .filter(view => view.type === currentView.type && view.identifier === currentView.identifier)
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));
        builder.views.systemContexts
            .filter(view => view.type === currentView.type && view.identifier === currentView.identifier)
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));
        builder.views.containers
            .filter(view => view.type === currentView.type && view.identifier === currentView.identifier)
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));
        builder.views.components
            .filter(view => view.type === currentView.type && view.identifier === currentView.identifier)
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));
        builder.views.deployments
            .filter(view => view.type === currentView.type && view.identifier === currentView.identifier && view.environment === currentView?.["environment"])
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));

        // TODO: update the code when all callbacks are implemented
        // const workspaceUpdated = builder.toObject();
        // useWorkspaceStore.setState(state => ({
        //     ...state,
        //     workspace: workspaceUpdated,
        //     currentView: getView(workspaceUpdated, currentView)
        // }));
        
        useWorkspaceToolbarStore.setState(state => ({
            ...state,
            isAutoLayoutEnabled: !isAutoLayoutEnabled
        }));
        
        setState({
            // NOTE: nodes should be draggable if we turn off auto layout
            nodesDraggable: isAutoLayoutEnabled,
        });
    }, [workspace, currentView, setState]);

    return { toggleAutoLayout }
}
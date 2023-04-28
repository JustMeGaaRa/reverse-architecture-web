import {
    IViewDefinition,
    IView
} from "@structurizr/dsl";
import { useCallback } from "react";
import { useWorkspaceStore } from "../store";

export const useWorkspaceNavigation = () => {
    const { workspace, setSelectedView } = useWorkspaceStore();
    
    const navigate = useCallback((view: IViewDefinition) => {
        // TODO: calculate the default layout
        const defaultView: IView = {
            ...view,
            layout: {}
        };
        const selectedView = 
            workspace.views.systemContexts.find(x => x.type === view.type && x.identifier === view.identifier)
            ?? workspace.views.containers.find(x => x.type === view.type && x.identifier === view.identifier)
            ?? workspace.views.components.find(x => x.type === view.type && x.identifier === view.identifier)
            ?? defaultView;

        setSelectedView(selectedView);
    }, [workspace, setSelectedView]);

    return {
        navigate
    }
}
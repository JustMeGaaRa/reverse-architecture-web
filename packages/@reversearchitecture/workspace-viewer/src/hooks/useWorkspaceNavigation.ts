import {
    IViewDefinition,
    IView
} from "@structurizr/dsl";
import { useCallback } from "react";
import { useWorkspaceStore } from "../store/useWorkspaceStore";

export const useWorkspaceNavigation = () => {
    // TODO: use the useMetadata hook to be able to manipulate the element positions
    // TODO: use the useAutoLayout hook to calculate the element positions
    // TODO: refactor into useSelectedView hook
    const { workspace, setSelectedView } = useWorkspaceStore();
    
    const navigate = useCallback((view: IViewDefinition) => {
        // TODO: calculate the automatic layout and update the metadata
        const defaultView: IView = { ...view, elements: [], relationships: [] };
        const selectedView = 
            workspace.views.systemContexts.find(x => x.type === view.type && x.identifier === view.identifier)
            ?? workspace.views.containers.find(x => x.type === view.type && x.identifier === view.identifier)
            ?? workspace.views.components.find(x => x.type === view.type && x.identifier === view.identifier)
            ?? defaultView;

        setSelectedView(selectedView);
    }, [workspace, setSelectedView]);

    return { navigate }
}
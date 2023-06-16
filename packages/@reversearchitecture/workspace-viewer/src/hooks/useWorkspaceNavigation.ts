import { IViewDefinition, IView, ViewType } from "@structurizr/dsl";
import { useCallback } from "react";
import { useWorkspaceStore } from "../hooks";

export const useWorkspaceNavigation = () => {
    // TODO: use the useMetadata hook to be able to manipulate the element positions
    // TODO: use the useAutoLayout hook to calculate the element positions
    // TODO: refactor into useSelectedView hook
    const { workspace, setSelectedView } = useWorkspaceStore();
    
    const navigate = useCallback((view: IViewDefinition) => {
        // TODO: calculate the automatic layout and update the metadata
        const defaultView: IView = { type: ViewType.None, title: "None", identifier: "none", elements: [], relationships: [] };
        const selectedView = Array.from([workspace.views.systemLandscape]).find(x => x?.type === view?.type)
            ?? workspace.views.systemContexts.find(x => x.type === view?.type && x.identifier === view?.identifier)
            ?? workspace.views.containers.find(x => x.type === view?.type && x.identifier === view?.identifier)
            ?? workspace.views.components.find(x => x.type === view?.type && x.identifier === view?.identifier);
        const unsetView = workspace.views.systemLandscape
            ?? workspace.views.systemContexts.at(0)
            ?? workspace.views.containers.at(0)
            ?? workspace.views.components.at(0);

        setSelectedView(selectedView ?? unsetView ?? defaultView);
    }, [workspace, setSelectedView]);

    return { navigate }
}
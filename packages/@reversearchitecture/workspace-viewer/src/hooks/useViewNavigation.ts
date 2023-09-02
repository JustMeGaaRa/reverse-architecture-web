import { useStoreApi } from "@reactflow/core";
import {
    IElement,
    Tag,
    ViewKeys,
    ViewType
} from "@structurizr/dsl";
import { useCallback } from "react";
import {
    useWorkspaceStore,
    useWorkspaceToolbarStore
} from "../hooks";
import { getView } from "../utils";

export const useViewNavigation = () => {
    const { workspace } = useWorkspaceStore();
    const { setState } = useStoreApi();

    const zoomIntoView = useCallback((view: ViewKeys) => {
        const selectedView = getView(workspace, view);
        useWorkspaceStore.setState({ selectedView });
        useWorkspaceToolbarStore.setState({ isAutoLayoutEnabled: selectedView.autoLayout !== undefined });

        // NOTE: nodes should be draggable if we turn off auto layout
        setState({ nodesDraggable: selectedView.autoLayout === undefined });
    }, [workspace, setState]);

    const zoomIntoElement = useCallback((element: IElement) => {
        if (element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)) {
            zoomIntoView({
                identifier: element.identifier,
                type: ViewType.Container
            });
        }

        if (element.tags.some(tag => tag.name === Tag.Container.name)) {
            zoomIntoView({
                identifier: element.identifier,
                type: ViewType.Component
            });
        }
    }, [zoomIntoView]);

    return {
        zoomIntoView,
        zoomIntoElement
    }
}
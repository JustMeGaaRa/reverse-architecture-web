import {
    IElement,
    Position,
    Tag,
    ViewKeys,
    ViewType
} from "@structurizr/dsl";
import { useCallback } from "react";
import {
    useWorkspaceStore,
    useWorkspaceToolbarStore
} from "@workspace/core";
import { getView } from "../utils";

export const useViewNavigation = () => {
    const { workspace } = useWorkspaceStore();
    // const { setState } = useStoreApi();

    const openView = useCallback((view: ViewKeys) => {
        const selectedView = getView(workspace, view);
        const isAutoLayoutEnabled = selectedView.autoLayout !== undefined;
        
        useWorkspaceStore.setState(state => ({ ...state, selectedView }));
        useWorkspaceToolbarStore.setState(state => ({ ...state, isAutoLayoutEnabled }));
        // TODO: nodes should be draggable if we turn off auto layout
        // setState({ nodesDraggable: !isAutoLayoutEnabled });
    }, [workspace]);

    const zoomIntoElement = useCallback((element: IElement) => {
        if (element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)) {
            openView({
                identifier: element.identifier,
                type: ViewType.Container
            });
        }

        if (element.tags.some(tag => tag.name === Tag.Container.name)) {
            openView({
                identifier: element.identifier,
                type: ViewType.Component
            });
        }
    }, [openView]);

    const zoomOutOfElement = useCallback((element: IElement) => {
        // TODO: find a parent element and zoom into it
    }, []);

    const setMousePosition = useCallback((position: Position) => {
        useWorkspaceStore.setState(state => ({ ...state, mousePosition: position }));
    }, []);

    return {
        openView,
        zoomIntoElement,
        zoomOutOfElement,
        setMousePosition
    }
}
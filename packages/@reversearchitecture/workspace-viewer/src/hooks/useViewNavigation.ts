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
} from "../hooks";
import { getView } from "../utils";

export const useViewNavigation = () => {
    const { workspace } = useWorkspaceStore();
    // const { setState } = useStoreApi();

    const zoomIntoView = useCallback((view: ViewKeys) => {
        const selectedView = getView(workspace, view);
        const isAutoLayoutEnabled = selectedView.autoLayout !== undefined;
        
        useWorkspaceStore.setState(state => ({ ...state, selectedView }));
        useWorkspaceToolbarStore.setState(state => ({ ...state, isAutoLayoutEnabled }));
        // NOTE: nodes should be draggable if we turn off auto layout
        // setState({ nodesDraggable: !isAutoLayoutEnabled });
    }, [workspace]);

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

    const setMousePosition = useCallback((position: Position) => {
        useWorkspaceStore.setState(state => ({ ...state, mousePosition: position }));
    }, []);

    return {
        zoomIntoView,
        zoomIntoElement,
        setMousePosition
    }
}
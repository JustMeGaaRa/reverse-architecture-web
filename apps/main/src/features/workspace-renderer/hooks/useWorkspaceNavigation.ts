import {
    createDefaultComponentView,
    createDefaultContainerView,
    createDefaultSystemLandscapeView,
    ElementType,
    findContainerParent,
    findViewForElement,
    IElement,
    IWorkspaceSnapshot,
    ViewType
} from "@structurizr/dsl";
import { useCallback, useContext } from "react";
import { WorkspaceNavigationContext } from "../contexts";

export const useWorkspaceNavigation = () => {
    const { currentView, setCurrentView } = useContext(WorkspaceNavigationContext);

    const zoomIntoElement = useCallback((workspace: IWorkspaceSnapshot, element: IElement) => {
        if (element === undefined) {
            const view = findViewForElement(workspace, ViewType.SystemLandscape, undefined)
                ?? createDefaultSystemLandscapeView();
            setCurrentView(view);
        }

        if (element?.type === ElementType.SoftwareSystem) {
            const view = findViewForElement(workspace, ViewType.Container, element.identifier)
                ?? createDefaultContainerView(element.identifier);
            setCurrentView(view);
        }

        if (element?.type === ElementType.Container) {
            const view = findViewForElement(workspace, ViewType.Component, element.identifier)
                ?? createDefaultComponentView(element.identifier);
            setCurrentView(view);
        }
    }, [setCurrentView]);

    const zoomOutOfElement = useCallback((workspace: IWorkspaceSnapshot, element: IElement) => {
        const parent = findContainerParent(workspace.model, element?.identifier);
        zoomIntoElement(workspace, parent);
    }, [zoomIntoElement]);

    return {
        currentView,
        setCurrentView,
        zoomIntoElement,
        zoomOutOfElement,
    }
}
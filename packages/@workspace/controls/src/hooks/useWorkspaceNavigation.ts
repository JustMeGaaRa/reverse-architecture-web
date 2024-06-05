import {
    createDefaultComponentView,
    createDefaultContainerView,
    createDefaultSystemContextView,
    createDefaultSystemLandscapeView,
    ElementType,
    findContainerParent,
    findViewForElement,
    IElement,
    IWorkspaceSnapshot,
    ViewDefinition,
    ViewType
} from "@structurizr/dsl";
import { useCallback, useContext } from "react";
import { WorkspaceNavigationContext } from "../contexts";

export const useWorkspaceNavigation = () => {
    const { currentView, setCurrentView } = useContext(WorkspaceNavigationContext);

    const openView = useCallback((workspace: IWorkspaceSnapshot, currentView: ViewDefinition) => {
        if (currentView === undefined) {
            const view = findViewForElement(workspace, ViewType.SystemLandscape, undefined)
                ?? createDefaultSystemLandscapeView();
            setCurrentView(view);
        }

        if (currentView?.type === ViewType.SystemLandscape) {
            const view = findViewForElement(workspace, ViewType.Container, undefined)
                ?? createDefaultSystemLandscapeView();
            setCurrentView(view);
        }

        if (currentView?.type === ViewType.SystemContext) {
            const view = findViewForElement(workspace, ViewType.Container, currentView.softwareSystemIdentifier)
                ?? createDefaultSystemContextView(currentView.softwareSystemIdentifier);
            setCurrentView(view);
        }

        if (currentView?.type === ViewType.Container) {
            const view = findViewForElement(workspace, ViewType.Container, currentView.softwareSystemIdentifier)
                ?? createDefaultContainerView(currentView.softwareSystemIdentifier);
            setCurrentView(view);
        }

        if (currentView?.type === ViewType.Component) {
            const view = findViewForElement(workspace, ViewType.Component, currentView.containerIdentifier)
                ?? createDefaultComponentView(currentView.containerIdentifier);
            setCurrentView(view);
        }
    }, [setCurrentView]);

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
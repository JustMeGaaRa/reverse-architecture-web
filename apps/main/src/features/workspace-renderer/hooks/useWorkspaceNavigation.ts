import {
    ElementType,
    findContainerParent,
    findViewOrDefault,
    IElement,
    IWorkspaceSnapshot,
    Tag,
    ViewType,
} from "@structurizr/dsl";
import { useCallback, useContext } from "react";
import { WorkspaceNavigationContext } from "../contexts";

export const useWorkspaceNavigation = () => {
    const { currentView, setCurrentView } = useContext(WorkspaceNavigationContext);

    const zoomIntoElement = useCallback((workspace: IWorkspaceSnapshot, element: IElement) => {
        if (element.type === ElementType.SoftwareSystem) {
            const view = findViewOrDefault(workspace, {
                identifier: element.identifier,
                type: ViewType.Container
            });
            setCurrentView(view);
        }

        if (element.type === ElementType.Container) {
            const view = findViewOrDefault(workspace, {
                identifier: element.identifier,
                type: ViewType.Component
            });
            setCurrentView(view);
        }
    }, [setCurrentView]);

    const zoomOutOfElement = useCallback((workspace: IWorkspaceSnapshot, element: IElement) => {
        if (element.type === ElementType.SoftwareSystem) {
            const view = findViewOrDefault(workspace, {
                identifier: element.identifier,
                type: ViewType.SystemContext
            });
            setCurrentView(view);
        }
        
        if (element.type === ElementType.Container) {
            const parent = findContainerParent(workspace.model, element.identifier);
            const view = findViewOrDefault(workspace, {
                identifier: parent.identifier,
                type: ViewType.Container
            });
            setCurrentView(view);
        }
    }, [setCurrentView]);

    return {
        currentView,
        setCurrentView,
        zoomIntoElement,
        zoomOutOfElement,
    }
}
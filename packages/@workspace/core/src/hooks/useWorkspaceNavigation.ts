import { useReactFlow } from "@reactflow/core";
import {
    findContainerParent,
    findViewOrDefault,
    IElement,
    IViewDefinition,
    IWorkspaceSnapshot,
    Tag,
    ViewType,
} from "@structurizr/dsl";
import { useCallback, useContext } from "react";
import { WorkspaceNavigationContext } from "../contexts";

export const useWorkspaceNavigation = () => {
    const {
        currentView,
        setCurrentView,
    } = useContext(WorkspaceNavigationContext);
    const { setViewport, getViewport } = useReactFlow();

    const openView = useCallback((workspace: IWorkspaceSnapshot, viewDefinition: IViewDefinition) => {
        const view = findViewOrDefault(workspace, viewDefinition);
        setCurrentView(view);
    }, [setCurrentView]);

    const zoomIntoElement = useCallback((workspace: IWorkspaceSnapshot, element: IElement) => {
        if (element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)) {
            const view = findViewOrDefault(workspace, {
                identifier: element.identifier,
                type: ViewType.Container
            });
            setCurrentView(view);
        }

        if (element.tags.some(tag => tag.name === Tag.Container.name)) {
            const view = findViewOrDefault(workspace, {
                identifier: element.identifier,
                type: ViewType.Component
            });
            setCurrentView(view);
        }
    }, [setCurrentView]);

    const zoomOutOfElement = useCallback((workspace: IWorkspaceSnapshot, element: IElement) => {
        if (element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)) {
            const view = findViewOrDefault(workspace, {
                identifier: element.identifier,
                type: ViewType.SystemContext
            });
            setCurrentView(view);
        }
        if (element.tags.some(tag => tag.name === Tag.Container.name)) {
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
        openView,
        zoomIntoElement,
        zoomOutOfElement,
        getViewport,
        setViewport
    }
}
import { useReactFlow } from "@reactflow/core";
import {
    ComponentPathProvider,
    ContainerPathProvider,
    findContainerParent,
    IElement,
    IWorkspace,
    SystemContextPathProvider,
    SystemLandscapePathProvider,
    Tag,
    ViewKeys,
    ViewType,
    Workspace
} from "@structurizr/dsl";
import { useCallback, useContext } from "react";
import { WorkspaceNavigationContext } from "../contexts";
import { getViewDefinition } from "../utils";

export const useWorkspaceNavigation = () => {
    const {
        currentView,
        currentViewPath,
        setCurrentView,
        setCurrentViewPath
    } = useContext(WorkspaceNavigationContext);
    const { setViewport, getViewport } = useReactFlow();

    const openView = useCallback((workspace: IWorkspace, view: ViewKeys) => {
        const viewDefinition = getViewDefinition(workspace, view);
        const pathBuilders = {
            [ViewType.SystemLandscape]: new SystemLandscapePathProvider(),
            [ViewType.SystemContext]: new SystemContextPathProvider(),
            [ViewType.Container]: new ContainerPathProvider(),
            [ViewType.Component]: new ComponentPathProvider()
        };
        const viewPath = pathBuilders[viewDefinition.type]?.getPath(workspace, viewDefinition) ?? [];

        setCurrentView(viewDefinition);
        setCurrentViewPath(viewPath);
    }, [setCurrentView, setCurrentViewPath]);

    const zoomIntoElement = useCallback((workspace: IWorkspace, element: IElement) => {
        if (element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)) {
            openView(workspace, {
                identifier: element.identifier,
                type: ViewType.Container
            });
        }

        if (element.tags.some(tag => tag.name === Tag.Container.name)) {
            openView(workspace, {
                identifier: element.identifier,
                type: ViewType.Component
            });
        }
    }, [openView]);

    const zoomOutOfElement = useCallback((workspace: IWorkspace, element: IElement) => {
        if (element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)) {
            openView(workspace, {
                identifier: element.identifier,
                type: ViewType.SystemContext
            });
        }
        if (element.tags.some(tag => tag.name === Tag.Container.name)) {
            const parent = findContainerParent(workspace.model, element.identifier);
            openView(workspace, {
                identifier: parent.identifier,
                type: ViewType.Container
            });
        }
    }, [openView]);

    return {
        currentView,
        currentViewPath,
        openView,
        zoomIntoElement,
        zoomOutOfElement,
        getViewport,
        setViewport
    }
}
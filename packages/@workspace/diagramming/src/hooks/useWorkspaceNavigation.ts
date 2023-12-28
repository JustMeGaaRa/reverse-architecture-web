import {
    ComponentPathProvider,
    ContainerPathProvider,
    DeploymentPathProvider,
    IElement,
    SystemContextPathProvider,
    SystemLandscapePathProvider,
    Tag,
    ViewKeys,
    ViewType,
    Workspace
} from "@structurizr/dsl";
import { useCallback, useContext } from "react";
import { getViewDefinition } from "../utils";
import { WorkspaceNavigationContext } from "../contexts";

export const useWorkspaceNavigation = () => {
    const {
        currentView,
        currentViewPath,
        setCurrentView,
        setCurrentViewPath
    } = useContext(WorkspaceNavigationContext);

    const openView = useCallback((workspace: Workspace, view: ViewKeys) => {
        const viewDefinition = getViewDefinition(workspace, view);
        const pathBuilders = [
            [ ViewType.SystemLandscape, new SystemLandscapePathProvider() ],
            [ ViewType.SystemContext, new SystemContextPathProvider() ],
            [ ViewType.Container, new ContainerPathProvider() ],
            [ ViewType.Component, new ComponentPathProvider() ],
            [ ViewType.Deployment, new DeploymentPathProvider() ],
        ];
        const viewPath = pathBuilders[currentView.type]?.getPath(workspace, currentView) ?? [];

        setCurrentView(viewDefinition);
        setCurrentViewPath(viewPath);
    }, [currentView, setCurrentView, setCurrentViewPath]);

    const zoomIntoElement = useCallback((workspace: Workspace, element: IElement) => {
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

    const zoomOutOfElement = useCallback((workspace: Workspace, element: IElement) => {
        if (element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)) {
            openView(workspace, {
                identifier: element.identifier,
                type: ViewType.SystemContext
            });
        }
        if (element.tags.some(tag => tag.name === Tag.Container.name)) {
            const parent = workspace.model.findContainerParent(element.identifier);
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
        zoomOutOfElement
    }
}
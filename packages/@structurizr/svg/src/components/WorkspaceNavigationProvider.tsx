import { createDefaultComponentView, createDefaultContainerView, createDefaultSystemContextView, createDefaultSystemLandscapeView, ElementType, findContainerParent, findViewForElement, IElement, IWorkspaceSnapshot, ViewDefinition, ViewType } from "@structurizr/dsl";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useCallback, useContext, useState } from "react";

export const WorkspaceNavigationContext = createContext<{
    currentView?: ViewDefinition;
    setCurrentView?: Dispatch<SetStateAction<ViewDefinition>>;
}>({
    currentView: null,
    setCurrentView: () => { console.debug("WorkspaceNavigationContext: setCurrentView not implemented") },
});

export const WorkspaceNavigationProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ currentView, setCurrentView ] = useState<ViewDefinition>();

    return (
        <WorkspaceNavigationContext.Provider value={{ currentView, setCurrentView }}>
            {children}
        </WorkspaceNavigationContext.Provider>
    );
};

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
};

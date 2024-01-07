import { ElementType, ViewType } from "@structurizr/dsl";
import { useWorkspaceNavigation, useWorkspaceToolbarStore, WorkspaceNavigationStore } from "@workspace/core";
import { useCallback } from "react";

const SelectedViewSelector = (state: WorkspaceNavigationStore) => {
    return {
        isSystemLandscapView: state.currentView?.type === ViewType.SystemLandscape,
        isSystemContextView: state.currentView?.type === ViewType.SystemContext,
        isContainerView: state.currentView?.type === ViewType.Container,
        isComponentView: state.currentView?.type === ViewType.Component,
        isDeploymentView: state.currentView?.type === ViewType.Deployment
    }
}

export const useAddingElementMode = () => {
    const store = useWorkspaceNavigation();
    const {
        isSystemLandscapView,
        isSystemContextView,
        isContainerView,
        isComponentView,
        isDeploymentView
    } = SelectedViewSelector(store);

    const enableAddingElement = useCallback((type: ElementType) => {
        useWorkspaceToolbarStore.setState({
            isSelectionEnabled: false,
            isDraggingEnabled: false,
            isAddingElementEnabled: true,
            addingElementType: type,
            isConnectionLineEnabled: false,
            isTextEditEnabled: false,
            isMultiSelectEnabled: false,
            isCommentAddingEnabled: false,
        });
    }, []);

    return {
        allowGroup: isSystemLandscapView || isContainerView || isComponentView,
        allowPerson: isSystemLandscapView || isSystemContextView || isContainerView || isComponentView,
        allowSoftwareSystem: isSystemLandscapView || isSystemContextView || isContainerView || isComponentView,
        allowContainer: isContainerView || isComponentView,
        allowComponent: isComponentView,
        allowDeploymentNode: isDeploymentView,
        allowInfrastructureNode: isDeploymentView,
        enableAddingElement
    }
}
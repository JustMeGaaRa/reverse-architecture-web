import { ElementType, ViewType } from "@structurizr/dsl";
import { useCallback } from "react";
import { useWorkspaceStore, WorkspaceStore } from "../hooks";
import { useWorkspaceToolbarStore } from "../hooks";

const SelectedViewSelector = (state: WorkspaceStore) => {
    return {
        isSystemLandscapView: state.selectedView?.type === ViewType.SystemLandscape,
        isSystemContextView: state.selectedView?.type === ViewType.SystemContext,
        isContainerView: state.selectedView?.type === ViewType.Container,
        isComponentView: state.selectedView?.type === ViewType.Component,
        isDeploymentView: state.selectedView?.type === ViewType.Deployment
    }
}

export const useAddingElementMode = () => {
    const {
        isSystemLandscapView,
        isSystemContextView,
        isContainerView,
        isComponentView,
        isDeploymentView
    } = useWorkspaceStore(SelectedViewSelector);

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
        allowGroup: true,
        allowPerson: isSystemLandscapView || isSystemContextView || isContainerView || isComponentView,
        allowSoftwareSystem: isSystemLandscapView || isSystemContextView || isContainerView || isComponentView,
        allowContainer: isContainerView || isComponentView,
        allowComponent: isComponentView,
        allowDeploymentNode: isDeploymentView,
        allowInfrastructureNode: isDeploymentView,
        enableAddingElement
    }
}
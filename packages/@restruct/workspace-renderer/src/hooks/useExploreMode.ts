import { useStoreApi } from "@reactflow/core";
import { ElementType, ViewType, Workspace } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { useCallback } from "react";
import { WorkspaceNavigationStore } from "../contexts";
import { useWorkspaceNavigation } from "./useWorkspaceNavigation";
import { useWorkspaceActionsToolbar, WorkspaceToolName } from "./useWorkspaceActionsToolbar";

const isElementAllowedInView = (viewType: ViewType, elementType: ElementType) => {
    switch (viewType) {
        case ViewType.SystemLandscape:
            return [
                ElementType.Group,
                ElementType.Person,
                ElementType.SoftwareSystem
            ].includes(elementType);
        case ViewType.SystemContext:
            return [
                ElementType.Group,
                ElementType.Person,
                ElementType.SoftwareSystem
            ].includes(elementType);
        case ViewType.Container:
            return [
                ElementType.Group,
                ElementType.Person,
                ElementType.SoftwareSystem,
                ElementType.Container
            ].includes(elementType);
        case ViewType.Component:
            return [
                ElementType.Group,
                ElementType.Person,
                ElementType.SoftwareSystem,
                ElementType.Container,
                ElementType.Component
            ].includes(elementType);
        case ViewType.Deployment:
            return [
                ElementType.DeploymentNode,
                ElementType.InfrastructureNode,
                ElementType.SoftwareSystemInstance,
                ElementType.ContainerInstance
            ].includes(elementType);
        default:
            return false;
    }
}

export const useElementSelectMode = () => {
    const { selectedTool, setSelectedTool } = useWorkspaceActionsToolbar();
    
    const enableSelectMode = useCallback(() => {
        setSelectedTool(WorkspaceToolName.ElementSelect);
    }, [setSelectedTool]);

    return {
        isSelectMode: selectedTool === WorkspaceToolName.ElementSelect,
        enableSelectMode
    };
}

export const useExploreMode = () => {
    const { selectedTool, setSelectedTool } = useWorkspaceActionsToolbar();
    
    const enableExploreMode = useCallback(() => {
        setSelectedTool(WorkspaceToolName.Explore);
    }, [setSelectedTool]);

    return {
        isExploreMode: selectedTool === WorkspaceToolName.Explore,
        enableExploreMode
    };
}

export const useElementDropMode = () => {
    const { currentView } = useWorkspaceNavigation();
    const { selectedTool, selectedElementType, setSelectedElementType, setSelectedTool } = useWorkspaceActionsToolbar();

    const enableElementDropMode = useCallback((type: ElementType) => {
        setSelectedElementType(type);
        setSelectedTool(WorkspaceToolName.ElementDrop);
    }, [setSelectedElementType, setSelectedTool]);

    return {
        isElementDropMode: selectedTool === WorkspaceToolName.ElementDrop,
        selectedElementType: selectedElementType,
        allowGroup: isElementAllowedInView(currentView?.type, ElementType.Group),
        allowPerson: isElementAllowedInView(currentView?.type, ElementType.Person),
        allowSoftwareSystem: isElementAllowedInView(currentView?.type, ElementType.SoftwareSystem),
        allowContainer: isElementAllowedInView(currentView?.type, ElementType.Container),
        allowComponent: isElementAllowedInView(currentView?.type, ElementType.Component),
        allowDeploymentNode: isElementAllowedInView(currentView?.type, ElementType.DeploymentNode),
        allowInfrastructureNode: isElementAllowedInView(currentView?.type, ElementType.InfrastructureNode),
        enableElementDropMode
    }
}

export const useTextEditMode = () => {
    const { selectedTool, setSelectedTool } = useWorkspaceActionsToolbar();

    const enableTextEditMode = useCallback(() => {
        setSelectedTool(WorkspaceToolName.EditText);
    }, [setSelectedTool]);

    return {
        isTextEditMode: selectedTool === WorkspaceToolName.EditText,
        enableTextEditMode
    }
}

export const useElementConnectMode = () => {
    const { selectedTool, setSelectedTool } = useWorkspaceActionsToolbar();

    const enableConnectMode = useCallback(() => {
        setSelectedTool(WorkspaceToolName.ElementConnect);
    }, [setSelectedTool]);

    return {
        isConnectMode: selectedTool === WorkspaceToolName.ElementConnect,
        enableConnectMode
    }
}

export const useCommentingMode = () => {
    const { selectedTool, setSelectedTool } = useWorkspaceActionsToolbar();

    const enableCommentMode = useCallback(() => {
        setSelectedTool(WorkspaceToolName.Comment);
    }, [setSelectedTool]);

    return {
        isCommentMode: selectedTool === WorkspaceToolName.Comment,
        enableCommentMode
    }
}
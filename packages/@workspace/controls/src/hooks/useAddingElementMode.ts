import { ElementType, ViewType } from "@structurizr/dsl";
import { useWorkspaceNavigation, useWorkspaceToolbarStore, WorkspaceNavigationStore } from "@workspace/core";
import { useCallback } from "react";

const AllowedViewElementSelector = (state: WorkspaceNavigationStore) => {
    switch (state.currentView?.type) {
        case ViewType.SystemLandscape:
            return [ElementType.Group, ElementType.Person, ElementType.SoftwareSystem];
        case ViewType.SystemContext:
            return [ElementType.Group, ElementType.Person, ElementType.SoftwareSystem];
        case ViewType.Container:
            return [ElementType.Group, ElementType.Person, ElementType.SoftwareSystem, ElementType.Container];
        case ViewType.Component:
            return [ElementType.Group, ElementType.Person, ElementType.SoftwareSystem, ElementType.Container, ElementType.Component];
        case ViewType.Deployment:
            return [ElementType.DeploymentNode, ElementType.InfrastructureNode];
        default:
            return [];
    }
}

export const useAddingElementMode = () => {
    const store = useWorkspaceNavigation();
    const { enabledTool, addingElementType, setAddingElementType, setEnabledTool } = useWorkspaceToolbarStore();
    const allowedElements = AllowedViewElementSelector(store);

    const enableAddingElement = useCallback((type: ElementType) => {
        setAddingElementType(type);
        setEnabledTool("adding-element");
    }, [setAddingElementType, setEnabledTool]);

    return {
        addingElementsEnabled: enabledTool === "adding-element",
        addingElementType: addingElementType,
        allowGroup: allowedElements.some(element => element === ElementType.Group),
        allowPerson: allowedElements.some(element => element === ElementType.Person),
        allowSoftwareSystem: allowedElements.some(element => element === ElementType.SoftwareSystem),
        allowContainer: allowedElements.some(element => element === ElementType.Container),
        allowComponent: allowedElements.some(element => element === ElementType.Component),
        allowDeploymentNode: allowedElements.some(element => element === ElementType.DeploymentNode),
        allowInfrastructureNode: allowedElements.some(element => element === ElementType.InfrastructureNode),
        enableAddingElement
    }
}
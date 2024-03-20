import { useStoreApi } from "@reactflow/core";
import { ElementType, ViewType, Workspace } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { useCallback } from "react";
import { WorkspaceNavigationStore } from "../contexts";
import { useWorkspaceNavigation } from "./useWorkspaceNavigation";
import { useWorkspaceToolbarStore } from "./useWorkspaceToolbarStore";

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

export const useAutoLayoutMode = () => {
    const { setState } = useStoreApi();
    const { workspace } = useWorkspace();
    const { currentView } = useWorkspaceNavigation();

    const toggleAutoLayout = useCallback(() => {
        const isAutoLayoutEnabled = false;//currentView.autoLayout !== undefined;
        const builder = new Workspace(workspace);

        [builder.views.systemLandscape]
            .filter(view => view.type === currentView.type && view.identifier === currentView.identifier)
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));
        builder.views.systemContexts
            .filter(view => view.type === currentView.type && view.identifier === currentView.identifier)
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));
        builder.views.containers
            .filter(view => view.type === currentView.type && view.identifier === currentView.identifier)
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));
        builder.views.components
            .filter(view => view.type === currentView.type && view.identifier === currentView.identifier)
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));
        builder.views.deployments
            .filter(view => view.type === currentView.type && view.identifier === currentView.identifier && view.environment === currentView?.["environment"])
            .forEach(x => x.setAutoLayout(!isAutoLayoutEnabled));

        // TODO: update the code when all callbacks are implemented
        // const workspaceUpdated = builder.toObject();
        // useWorkspaceStore.setState(state => ({
        //     ...state,
        //     workspace: workspaceUpdated,
        //     currentView: getView(workspaceUpdated, currentView)
        // }));
        
        useWorkspaceToolbarStore.setState(state => ({
            ...state,
            isAutoLayoutEnabled: !isAutoLayoutEnabled
        }));
        
        setState({
            // NOTE: nodes should be draggable if we turn off auto layout
            nodesDraggable: isAutoLayoutEnabled,
        });
    }, [workspace, currentView, setState]);

    return { toggleAutoLayout }
}

export const useCommentingMode = () => {
    const { enabledTool, setEnabledTool } = useWorkspaceToolbarStore();

    const enableCommentingMode = useCallback(() => {
        setEnabledTool("commenting");
    }, [setEnabledTool]);

    return {
        isCommentingModeEnabled: enabledTool === "commenting",
        enableCommentingMode
    };
}

export const useDraggingMode = () => {
    const { enabledTool, setEnabledTool } = useWorkspaceToolbarStore();
    
    const enableDraggingMode = useCallback(() => {
        setEnabledTool("dragging");
    }, [setEnabledTool]);

    return {
        isDraggingModeEnabled: enabledTool === "dragging",
        enableDraggingMode
    };
}

export const useSelectionMode = () => {
    const { enabledTool, setEnabledTool } = useWorkspaceToolbarStore();
    
    const enableSelectionMode = useCallback(() => {
        setEnabledTool("selection");
    }, [setEnabledTool]);

    return {
        isSelectionModeEnabled: enabledTool === "selection",
        enableSelectionMode
    };
}

export const useTextEditMode = () => {
    const { enabledTool, setEnabledTool } = useWorkspaceToolbarStore();

    const enableTextEditMode = useCallback(() => {
        setEnabledTool("text-edit");
    }, [setEnabledTool]);

    return {
        isTextEditEnabled: enabledTool === "text-edit",
        enableTextEditMode
    }
}

export const useUndoRedo = () => {
    const undo = useCallback(() => {

    }, []);

    const redo = useCallback(() => {

    }, []);

    return {
        undo,
        redo
    }
}
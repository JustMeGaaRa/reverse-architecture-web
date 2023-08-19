import { useReactFlow, useStoreApi } from "@reactflow/core";
import {
    ComponentViewStrategy,
    ContainerViewStrategy,
    DeploymentViewStrategy,
    IElement,
    IViewDefinition,
    IWorkspace,
    Position,
    SystemContextViewStrategy,
    SystemLandscapeViewStrategy,
    Tag,
    ViewKeys,
    ViewType
} from "@structurizr/dsl";
import { useCallback } from "react";
import { useWorkspaceStore, useWorkspaceToolbarStore } from "../hooks";
import { getReactFlowObject, getView } from "../utils";

export const useWorkspace = () => {
    const { workspace } = useWorkspaceStore();
    const { setNodes, setEdges } = useReactFlow();
    const { setState } = useStoreApi();
    
    const setWorkspace = useCallback((workspace: IWorkspace) => {
        useWorkspaceStore.setState(state => ({
            ...state,
            workspace,
            selectedView: getView(workspace)
        }));
    }, []);

    const setSelectedView = useCallback((view: ViewKeys) => {
        const getStrategy = (type: ViewType, selectedView: IViewDefinition) => {
            switch (type) {
                case ViewType.SystemLandscape:
                    return new SystemLandscapeViewStrategy(workspace.model, selectedView);
                case ViewType.SystemContext:
                    return new SystemContextViewStrategy(workspace.model, selectedView);
                case ViewType.Container:
                    return new ContainerViewStrategy(workspace.model, selectedView);
                case ViewType.Component:
                    return new ComponentViewStrategy(workspace.model, selectedView);
                case ViewType.Deployment:
                    return new DeploymentViewStrategy(workspace.model, selectedView, selectedView?.["environment"]);
            }
        }

        const selectedView = getView(workspace, view);

        useWorkspaceStore.setState(state => ({
            ...state,
            selectedView
        }));

        useWorkspaceToolbarStore.setState(state => ({
            ...state,
            isAutoLayoutEnabled: selectedView.autoLayout !== undefined
        }));
        
        const strategy = getStrategy(view.type, selectedView);
        const reactFlowObject = getReactFlowObject(
            strategy,
            workspace.model,
            workspace.views.configuration,
            selectedView
        );
        setNodes(reactFlowObject.nodes);
        setEdges(reactFlowObject.edges);

        setState({
            // NOTE: nodes should be draggable if we turn off auto layout
            nodesDraggable: selectedView.autoLayout === undefined,
        })
    }, [workspace, setState, setNodes, setEdges]);

    const zoomIntoElement = useCallback((element: IElement) => {
        if (element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)) {
            setSelectedView({
                identifier: element.identifier,
                type: ViewType.Container
            });
        }

        if (element.tags.some(tag => tag.name === Tag.Container.name)) {
            setSelectedView({
                identifier: element.identifier,
                type: ViewType.Component
            });
        }
    }, [setSelectedView]);

    const addElements = useCallback((element: IElement, position: Position, parentId?: string) => {

    }, []);

    const deleteElements = useCallback((elements: IElement[]) => {
        // TODO: what is the correct parameters here - nodes or elements?
    }, []);

    return {
        setWorkspace,
        setSelectedView,
        zoomIntoElement,
        addElements,
        deleteElements
    }
}
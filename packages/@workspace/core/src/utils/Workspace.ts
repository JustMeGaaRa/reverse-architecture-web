import {
    ViewType,
    ISupportVisitor,
    ViewKeys,
    IViewDefinition,
    IWorkspace,
    IModel,
    IConfiguration
} from "@structurizr/dsl";
import { ReactFlowJsonObject } from "@reactflow/core";
import { ReactFlowBuilder, ReactFlowVisitor } from "../types";

export const getView = (workspace: IWorkspace, viewDefinition?: ViewKeys) => {
    const emptyView: IViewDefinition = {
        type: ViewType.None,
        title: "None",
        identifier: "none",
        elements: [],
        relationships: []
    };
    const existingView =
        [workspace.views.systemLandscape].find(x => x?.type === viewDefinition?.type)
        ?? workspace.views.systemContexts.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.containers.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.components.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.deployments.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier);
    const defaultView =
        workspace.views.systemLandscape
        ?? workspace.views.systemContexts.at(0)
        ?? workspace.views.containers.at(0)
        ?? workspace.views.components.at(0)
        ?? workspace.views.deployments.at(0);
    
    return existingView ?? defaultView ?? emptyView;
}

export const getReactFlowObject = (
    strategy: ISupportVisitor,
    model: IModel,
    configuration: IConfiguration,
    selectedView: IViewDefinition
): ReactFlowJsonObject => {
    const reactFlowBuilder = new ReactFlowBuilder();
    const reactFlowVisitor = new ReactFlowVisitor(
        model,
        configuration,
        selectedView,
        reactFlowBuilder
    );
    strategy?.accept(reactFlowVisitor);
    return reactFlowBuilder.build();
}
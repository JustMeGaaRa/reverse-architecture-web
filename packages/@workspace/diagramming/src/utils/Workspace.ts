import {
    ISupportVisitor,
    ViewKeys,
    IViewDefinition,
    IWorkspace,
    IModel,
    IConfiguration,
    ViewType
} from "@structurizr/dsl";
import { ReactFlowJsonObject } from "@reactflow/core";
import { ReactFlowBuilder } from "@workspace/core";
import { ReactFlowVisitor } from "../types";

export const getView = (workspace: IWorkspace, viewDefinition?: ViewKeys) => {
    const defaultView: IViewDefinition = {
        type: viewDefinition?.type ?? ViewType.SystemContext,
        title: viewDefinition?.title ?? viewDefinition?.type ?? ViewType.SystemContext,
        identifier: viewDefinition?.identifier ?? "default",
        elements: [],
        relationships: []
    };
    const existingByIdentifier =
        [workspace.views.systemLandscape].find(x => x?.type === viewDefinition?.type)
        ?? workspace.views.systemContexts.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.containers.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.components.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.deployments.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier);
    const existingByType = 
        [workspace.views.systemLandscape].find(x => x?.type === viewDefinition?.type)
        ?? workspace.views.systemContexts.find(x => x.type === viewDefinition?.type)
        ?? workspace.views.containers.find(x => x.type === viewDefinition?.type)
        ?? workspace.views.components.find(x => x.type === viewDefinition?.type)
        ?? workspace.views.deployments.find(x => x.type === viewDefinition?.type);
    
    return existingByIdentifier ?? existingByType ?? defaultView;
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
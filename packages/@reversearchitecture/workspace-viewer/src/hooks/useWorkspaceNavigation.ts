import {
    ComponentViewStrategy,
    ContainerViewStrategy,
    DeploymentViewStrategy,
    SystemContextViewStrategy,
    SystemLandscapeViewStrategy,
    ViewType,
    ISupportVisitor,
    ISupportPath,
    SystemLandscapePathProvider,
    SystemContextPathProvider,
    ContainerPathProvider,
    ComponentPathProvider,
    DeploymentPathProvider,
    ViewKeys,
    IViewDefinition,
    Workspace
} from "@structurizr/dsl";
import { ReactFlowJsonObject } from "@reactflow/core";
import { AutoLayout, ReactFlowBuilder, ReactFlowVisitor } from "../types";
import { BoundingBoxTreeVisitor } from "../types/BoundingBoxTreeVisitor";
import { BoundingBoxTreeBuilder } from "../types/BoundingBoxTreeBuilder";

export const getView = (workspace: Workspace, viewDefinition: ViewKeys) => {
    const emptyView: IViewDefinition = {
        type: ViewType.None,
        title: "None",
        identifier: "none",
        elements: [],
        relationships: []
    };
    const existingView = Array.from([workspace.views.systemLandscape]).find(x => x?.type === viewDefinition?.type)
        ?? workspace.views.systemContexts.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.containers.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.components.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier);
    const defaultView = workspace.views.systemLandscape
        ?? workspace.views.systemContexts.at(0)
        ?? workspace.views.containers.at(0)
        ?? workspace.views.components.at(0);

    return existingView ?? defaultView ?? emptyView;
}

export const getViewGraph = async (workspace: Workspace, viewDefinition: ViewKeys): Promise<ReactFlowJsonObject> => {
    const selectedView = getView(workspace, viewDefinition);

    const viewBuilders: Map<ViewType, ISupportVisitor> = new Map<ViewType, ISupportVisitor>([
        [ ViewType.SystemLandscape, new SystemLandscapeViewStrategy(workspace, selectedView) ],
        [ ViewType.SystemContext, new SystemContextViewStrategy(workspace, selectedView) ],
        [ ViewType.Container, new ContainerViewStrategy(workspace, selectedView) ],
        [ ViewType.Component, new ComponentViewStrategy(workspace, selectedView) ],
        [ ViewType.Deployment, new DeploymentViewStrategy(workspace, selectedView, selectedView["environment"])],
    ]);

    const boundingBoxTreeBuilder = new BoundingBoxTreeBuilder();
    const boundingBoxTreeVisitor = new BoundingBoxTreeVisitor(workspace, selectedView, boundingBoxTreeBuilder);
    viewBuilders.get(selectedView.type)?.accept(boundingBoxTreeVisitor);
    const boundingBoxTree = boundingBoxTreeBuilder.build();

    const reactFlowBuilder = new ReactFlowBuilder();
    const reactFlowVisitor = new ReactFlowVisitor(workspace, selectedView, reactFlowBuilder, boundingBoxTree);
    viewBuilders.get(selectedView.type)?.accept(reactFlowVisitor);
    const reactFlow = reactFlowBuilder.build();

    const shouldAutoLayout = selectedView.autoLayout || selectedView.elements.length === 0;
    return shouldAutoLayout
        ? await new AutoLayout().execute(reactFlow)
        : reactFlow;
}

export const getViewPath = (workspace: Workspace, viewDefinition: ViewKeys) => {
    const selectedView = getView(workspace, viewDefinition);

    const pathBuilders: Map<ViewType, ISupportPath> = new Map<ViewType, ISupportPath>([
        [ ViewType.SystemLandscape, new SystemLandscapePathProvider() ],
        [ ViewType.SystemContext, new SystemContextPathProvider() ],
        [ ViewType.Container, new ContainerPathProvider() ],
        [ ViewType.Component, new ComponentPathProvider() ],
        [ ViewType.Deployment, new DeploymentPathProvider() ],
    ]);

    return pathBuilders.get(selectedView.type)?.getPath(workspace, selectedView) ?? [];
}
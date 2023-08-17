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
    Workspace,
    ElementType,
    Group,
    Person,
    SoftwareSystem,
    Container,
    Component,
    DeploymentNode,
    InfrastructureNode,
    IWorkspace,
    IModel,
    IConfiguration
} from "@structurizr/dsl";
import { ReactFlowJsonObject } from "@reactflow/core";
import { v4 } from "uuid";
import { AutoLayout, ReactFlowBuilder, ReactFlowVisitor } from "../types";
import { BoundingBoxTreeVisitor } from "../types/BoundingBoxTreeVisitor";
import { BoundingBoxTreeBuilder } from "../types/BoundingBoxTreeBuilder";

export const createEmptyElement = (type: ElementType) => {
    switch (type) {
        case ElementType.Group:
            const element = new Group({
                identifier: `group_${v4()}`,
                name: "Group",
                people: [],
                softwareSystems: [],
                containers: [],
                components: [],
                tags: []
            });
            return element;
        case ElementType.Person:
            const person = new Person({
                identifier: `person_${v4()}`,
                name: "Person",
                relationships: [],
                tags: []
            });
            return person;
        case ElementType.SoftwareSystem:
            const softwareSystem = new SoftwareSystem({
                identifier: `softwareSystem_${v4()}`,
                name: "Software System",
                containers: [],
                relationships: [],
                tags: [],
                groups: [],
                technology: []
            });
            return softwareSystem;
        case ElementType.Container:
            const container = new Container({
                identifier: `container_${v4()}`,
                name: "Container",
                components: [],
                relationships: [],
                tags: [],
                technology: [],
                groups: []
            });
            return container;
        case ElementType.Component:
            const component = new Component({
                identifier: `component_${v4()}`,
                name: "Component",
                relationships: [],
                tags: [],
                technology: []
            });
            return component;
        case ElementType.DeploymentNode:
            const deploymentNode = new DeploymentNode({
                identifier: `deploymentNode_${v4()}`,
                name: "Deployment Node",
                deploymentNodes: [],
                softwareSystemInstances: [],
                containerInstances: [],
                infrastructureNodes: [],
                relationships: [],
                technology: [],
                tags: []
            });
            return deploymentNode;
        case ElementType.InfrastructureNode:
            const infrastructureNode = new InfrastructureNode({
                identifier: `infrastructureNode_${v4()}`,
                name: "Infrastructure Node",
                relationships: [],
                tags: []
            });
            return infrastructureNode;
    }
}

export const getView = (workspace: IWorkspace, viewDefinition?: ViewKeys) => {
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
        ?? workspace.views.components.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier)
        ?? workspace.views.deployments.find(x => x.type === viewDefinition?.type && x.identifier === viewDefinition?.identifier);
    const defaultView = workspace.views.systemLandscape
        ?? workspace.views.systemContexts.at(0)
        ?? workspace.views.containers.at(0)
        ?? workspace.views.components.at(0)
        ?? workspace.views.deployments.at(0);

    return existingView ?? defaultView ?? emptyView;
}

export const getReactFlowObject = async (
    strategy: ISupportVisitor,
    model: IModel,
    configuration: IConfiguration,
    selectedView: IViewDefinition
): Promise<ReactFlowJsonObject> => {
    // TODO: get rid of this bounding box logic and rely on metadata or ELK autolayout instead
    const boundingBoxTreeBuilder = new BoundingBoxTreeBuilder();
    const boundingBoxTreeVisitor = new BoundingBoxTreeVisitor(model, configuration, selectedView, boundingBoxTreeBuilder);
    strategy?.accept(boundingBoxTreeVisitor);
    const boundingBoxTree = boundingBoxTreeBuilder.build();

    const reactFlowBuilder = new ReactFlowBuilder();
    const reactFlowVisitor = new ReactFlowVisitor(model, configuration, selectedView, reactFlowBuilder, boundingBoxTree);
    strategy?.accept(reactFlowVisitor);
    const reactFlow = reactFlowBuilder.build();

    const shouldAutoLayout = selectedView.autoLayout || selectedView.elements.length === 0;
    return shouldAutoLayout
        ? await new AutoLayout().execute(reactFlow)
        : reactFlow;
}
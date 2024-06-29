import {
    ComponentViewStrategy,
    ContainerViewStrategy,
    DeploymentViewStrategy,
    IElementMetadata,
    IElementVisitor,
    ISupportVisitor,
    IViewDefinitionMetadata,
    IWorkspaceSnapshot,
    ModelViewStrategy,
    SystemContextViewStrategy,
    SystemLandscapeViewStrategy,
    ViewDefinition,
    ViewType
} from "@structurizr/dsl";
import {
    Edge,
    GraphBuilder,
    GraphElementVisitor,
    GraphvizLayoutStrategy,
    Vertex
} from "@structurizr/graphviz-layout";

const reduceNodes = (nodes: Vertex[]) => {
    return nodes.reduce((array, node) => ([
        ...array,
        {
            id: node.id,
            x: node.x,
            y: node.y,
            height: node.height,
            width: node.width,
        }
    ]), [] as IElementMetadata[]);
};

const getReactFlow = (viewStrategy: ISupportVisitor) => {
    const reactFlowBuilder = new GraphBuilder();
    const reactFlowVisitor = new GraphElementVisitor(reactFlowBuilder);
    const layoutStrategy = new GraphvizLayoutStrategy();
    viewStrategy?.accept(reactFlowVisitor);
    return layoutStrategy.execute(reactFlowBuilder.build());
};

const getReactFlowAuto = (workspace: IWorkspaceSnapshot, view: ViewDefinition) => {
    switch (view.type) {
        case ViewType.Model:
            const viewStrategy = new ModelViewStrategy(workspace);
            return getReactFlow(viewStrategy);
        case ViewType.SystemLandscape:
            if (workspace.views.systemLandscape) {
                const viewStrategy = new SystemLandscapeViewStrategy(workspace.model, workspace.views.systemLandscape as any);
                return getReactFlow(viewStrategy);
            }
            break;
        case ViewType.SystemContext:
            const systemContext = workspace.views.systemContexts.find(v => v.key === view.key);
            if (systemContext) {
                const viewStrategy = new SystemContextViewStrategy(workspace.model, systemContext);
                return getReactFlow(viewStrategy);
            }
            break;
        case ViewType.Container:
            const container = workspace.views.containers.find(v => v.key === view.key);
            if (container) {
                const viewStrategy = new ContainerViewStrategy(workspace.model, container);
                return getReactFlow(viewStrategy);
            }
            break;
        case ViewType.Component:
            const component = workspace.views.components.find(v => v.key === view.key);
            if (component) {
                const viewStrategy = new ComponentViewStrategy(workspace.model, component);
                return getReactFlow(viewStrategy);
            }
            break;
        case ViewType.Deployment:
            const deployment = workspace.views.deployments.find(v => v.key === view.key);
            if (deployment) {
                const viewStrategy = new DeploymentViewStrategy(workspace.model, deployment);
                return getReactFlow(viewStrategy);
            }
            break;
    }

    return Promise.resolve({
        nodes: [],
        edges: []
    });
};

export const computeViewAutoLayout = async (workspace: IWorkspaceSnapshot, view: ViewDefinition) => {
    if (!workspace || !view) {
        return {
            type: view?.type,
            key: view?.key,
            elements: [],
            relationships: []
        };
    }

    const reactFlowAuto = await getReactFlowAuto(workspace, view);

    return {
        type: view?.type,
        key: view?.key,
        elements: reduceNodes(reactFlowAuto.nodes),
        relationships: []
    };
};

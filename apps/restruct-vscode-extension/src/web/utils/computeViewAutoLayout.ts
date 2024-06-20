import {
    IElementMetadata,
    IViewDefinitionMetadata,
    IWorkspaceSnapshot,
    SystemLandscapeViewStrategy,
    ViewDefinition,
    ViewType
} from "@structurizr/dsl";
import {
    GraphBuilder,
    GraphElementVisitor,
    GraphvizLayoutStrategy
} from "@structurizr/graphviz-layout";

export const computeViewAutoLayout = async (workspace: IWorkspaceSnapshot, view: ViewDefinition) => {
    const reactFlowBuilder = new GraphBuilder();
    const reactFlowVisitor = new GraphElementVisitor(reactFlowBuilder);
    const layoutStrategy = new GraphvizLayoutStrategy();

    switch (view.type) {
        case ViewType.SystemLandscape:
            const viewStrategy = new SystemLandscapeViewStrategy(workspace.model, workspace.views.systemLandscape as any);
            viewStrategy?.accept(reactFlowVisitor);
            const reactFlowObject = reactFlowBuilder.build();
            const reactFlowAuto = await layoutStrategy.execute(reactFlowObject);
            const metadata: IViewDefinitionMetadata = {
                key: workspace.views.systemLandscape?.key,
                elements: reactFlowAuto.nodes.reduce((array, node) => ([
                    ...array,
                    {
                        id: node.id,
                        x: node.x,
                        y: node.y,
                        height: node.height,
                        width: node.width,
                    }
                ]), [] as IElementMetadata[]),
                relationships: []
            };
            return metadata;
        default:
            return {
                key: view.key,
                elements: [],
                relationships: []
            };
    }
};

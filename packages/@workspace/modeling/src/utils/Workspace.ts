import { ReactFlowJsonObject } from "@reactflow/core";
import { IModel, ISupportVisitor, IWorkspace } from "@structurizr/dsl";
import { AutoLayout, ReactFlowBuilder } from "@workspace/core";
import { ReactFlowVisitor } from "../types";

export const getReactFlowObject = (
    strategy: ISupportVisitor,
    workspace: IWorkspace,
): ReactFlowJsonObject => {
    const reactFlowBuilder = new ReactFlowBuilder();

    const nodeHeight = 70;
    const nodeHeightSpacing = 64;
    
    const positionY = -(nodeHeight + nodeHeightSpacing);
    const positionX = 0;
    const workspaceNode = ({
        id: "workspace",
        type: "workspace",
        data: {
            element: {
                name: workspace.name,
                description: "Model",
                tags: [{ name: "Element" }, { name: "Workspace" }]
            }
        },
        position: { x: positionX, y: positionY },
    });
    reactFlowBuilder.addNode(workspaceNode);

    const reactFlowVisitor = new ReactFlowVisitor(workspace.model, reactFlowBuilder);
    strategy.accept(reactFlowVisitor);
    return reactFlowBuilder.build();
}

export const getReactFlowAuto = async (reactFlowObject: ReactFlowJsonObject) => {
    const autoLayout = new AutoLayout();
    const reactFlowAuto = await autoLayout.execute(reactFlowObject);
    return reactFlowObject;
}
import { ReactFlowJsonObject } from "@reactflow/core";
import { ISupportVisitor, IWorkspace } from "@structurizr/dsl";
import { AutoLayout, ReactFlowBuilder } from "@workspace/core";
import { ReactFlowVisitor } from "../types";
import { getNodeFromElement } from "./ReactFlow";

export const getReactFlowObject = (
    strategy: ISupportVisitor,
    workspace: IWorkspace,
): ReactFlowJsonObject => {
    const reactFlowBuilder = new ReactFlowBuilder();

    const nodeHeight = 70;
    const nodeHeightSpacing = 64;
    
    const x = 0;
    const y = -(nodeHeight + nodeHeightSpacing);
    const workspaceElement = {
        identifier: "workspace",
        name: workspace.name,
        description: "Model",
        tags: [
            { name: "Element" },
            { name: "Workspace" }
        ]
    }
    const workspaceNode = getNodeFromElement(
        workspaceElement as any,
        undefined,
        "workspace",
        { x, y }
    );
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
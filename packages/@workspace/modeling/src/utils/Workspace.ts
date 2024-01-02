import { ReactFlowJsonObject } from "@reactflow/core";
import { ISupportVisitor, IWorkspace, Tag } from "@structurizr/dsl";
import { ReactFlowBuilder } from "@workspace/core";
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
        (workspace.model.people.length + workspace.model.softwareSystems.length),
        "workspace",
        { x, y }
    );
    reactFlowBuilder.addNode(workspaceNode);

    const reactFlowVisitor = new ReactFlowVisitor(workspace.model, reactFlowBuilder);
    strategy.accept(reactFlowVisitor);
    return reactFlowBuilder.build();
}

export const getReactFlowAuto = async (reactFlowObject: Omit<ReactFlowJsonObject, "viewport">) => {
    const nodeHeight = 70;
    const nodeWidth = 300;
    const nodeHeightSpacing = 64;
    const nodeWidthSpacing = 32;

    return Promise.resolve<Omit<ReactFlowJsonObject, "viewport">>({
        ...reactFlowObject,
        nodes: [
            ...reactFlowObject.nodes
                .filter(node => node.hidden === false || node.hidden === undefined)
                .filter(node => node.data.element.tags.some(tag => tag.name === "Workspace"))
                .map(node => ({ ...node, position: { x: (-200 + nodeWidth / 2), y: -(64 + nodeHeightSpacing) } })),
            ...reactFlowObject.nodes
                .filter(node => node.hidden === false || node.hidden === undefined)
                .filter(node => node.data.element.tags.some(tag => tag.name === Tag.Person.name))
                .map((node, index) => ({ ...node, position: { x: (-index - 1) * (nodeWidth + nodeWidthSpacing), y: 0 } })),
            ...reactFlowObject.nodes
                .filter(node => node.hidden === false || node.hidden === undefined)
                .filter(node => node.data.element.tags.some(tag => tag.name === Tag.SoftwareSystem.name))
                .map((node, index) => ({ ...node, position: { x: index * (nodeWidth + nodeWidthSpacing), y: 0 } })),
            ...reactFlowObject.nodes
                .filter(node => node.hidden === false || node.hidden === undefined)
                .filter(node => node.data.element.tags.some(tag => tag.name === Tag.Container.name))
                .map((node, index) => ({ ...node, position: { x: index * (nodeWidth + nodeWidthSpacing), y: nodeHeight + nodeHeightSpacing } })),
            ...reactFlowObject.nodes
                .filter(node => node.hidden === false || node.hidden === undefined)
                .filter(node => node.data.element.tags.some(tag => tag.name === Tag.Component.name))
                .map((node, index) => ({ ...node, position: { x: index * (nodeWidth + nodeWidthSpacing), y: 2 * (nodeHeight + nodeHeightSpacing) } })),
            ...reactFlowObject.nodes.filter(node => node.hidden)
        ],
        edges: reactFlowObject.edges
    });
}
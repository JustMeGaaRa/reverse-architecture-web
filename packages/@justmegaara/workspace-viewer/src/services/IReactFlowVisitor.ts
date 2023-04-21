import { IVisitor } from "@justmegaara/structurizr-dsl";
import { Edge, Node } from "@reactflow/core";

export interface IReactFlowVisitor extends IVisitor {
    getReactFlow: () => { nodes: Node[], edges: Edge[] };
}
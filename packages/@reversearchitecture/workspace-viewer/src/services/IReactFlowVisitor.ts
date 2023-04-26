import { IVisitor } from "@structurizr/dsl";
import { Edge, Node } from "@reactflow/core";

export interface IReactFlowVisitor extends IVisitor {
    getGraph: () => { nodes: Node[], edges: Edge[] };
}
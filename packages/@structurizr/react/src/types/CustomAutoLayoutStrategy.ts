import { Edge, Node, ReactFlowJsonObject } from "@reactflow/core";
import { IAutoLayoutStrategy, Position } from "@structurizr/dsl";
import { BoundingBox } from "./BoundingBox";

export class CustomAutoLayoutStrategy implements IAutoLayoutStrategy<ReactFlowJsonObject> {
    constructor() { }

    async execute(reactFlow: ReactFlowJsonObject): Promise<ReactFlowJsonObject> {
        const nodeDefaultHeight = 70;
        const nodeDefaultWidth = 300;
        const nodeMarginY = 64;
        const nodeMarginX = 32;
    
        const reactFlowGraph = ReactFlowGraph.fromReactFlowObject(reactFlow);
        const rootNodes = reactFlowGraph.getRootNodes();
        const nodePositions = new Map<string, Position>();
    
        const layoutTree = (root: Node, offset: BoundingBox, depth: number): BoundingBox => {
            const children = reactFlowGraph.getChildNodes(root.id);
    
            if (children.length == 0) {
                const position = {
                    x: offset.x2,
                    y: (nodeDefaultHeight + nodeMarginY) * depth
                }
                const rootBox = new BoundingBox({
                    x1: position.x,
                    y1: position.y,
                    x2: position.x + nodeDefaultWidth,
                    y2: position.y + nodeDefaultHeight
                });
                nodePositions.set(root.id, position);
                return rootBox.marginX(nodeMarginX);
            }
    
            let previousOffset = offset;
            const childBoxes = children.map(child => {
                previousOffset = layoutTree(child, previousOffset, depth + 1);
                return previousOffset;
            });
            
            const childTotalBox = BoundingBox.combine(childBoxes);
            const position = {
                x: offset.x1 + childTotalBox.width / 2 - nodeDefaultWidth / 2,
                y: (nodeDefaultHeight + nodeMarginY) * depth
            }
            const rootBox = new BoundingBox({
                x1: position.x,
                y1: position.y,
                x2: position.x + nodeDefaultWidth,
                y2: position.y + nodeDefaultHeight
            });
            nodePositions.set(root.id, position);
            return BoundingBox.combine([rootBox, childTotalBox]);
        }
    
        const initialOffset = BoundingBox.Empty;
        layoutTree(rootNodes[0], initialOffset, 0);
    
        return Promise.resolve<ReactFlowJsonObject>({
            ...reactFlow,
            nodes: reactFlow.nodes.map(node => ({
                ...node,
                position: nodePositions.has(node.id)
                    ? nodePositions.get(node.id)
                    : { x: 0, y: 0 }
            })),
            edges: reactFlow.edges
        });
    }
}

class ReactFlowGraph {
    private nodesMap: Map<string, Node>;
    private nodeIncomingEdgesMap: Map<string, Edge[]>;
    private nodeOutgoingEdgesMap: Map<string, Edge[]>;

    constructor(
        private readonly nodes: Node[],
        private readonly edges: Edge[]
    ) {
        this.nodesMap = new Map<string, Node>(nodes.map(node => [node.id, node]));
        this.nodeIncomingEdgesMap = new Map<string, Edge[]>(nodes.map(node => [node.id, edges.filter(edge => edge.target === node.id)]));
        this.nodeOutgoingEdgesMap = new Map<string, Edge[]>(nodes.map(node => [node.id, edges.filter(edge => edge.source === node.id)]));
    }

    static fromReactFlowObject(reactFlowObject: { nodes: Node[], edges: Edge[] }) {
        return new ReactFlowGraph(
            reactFlowObject.nodes.filter(x => !x.hidden),
            reactFlowObject.edges.filter(x => !x.hidden)
        );
    }

    public hasIncomingEdges(nodeId: string) {
        return this.nodeIncomingEdgesMap.get(nodeId).length > 0;
    }

    public hasOutgoingEdges(nodeId: string) {
        return this.nodeOutgoingEdgesMap.get(nodeId).length > 0;
    }

    public getChildNodes(nodeId: string) {
        return this.nodeOutgoingEdgesMap.get(nodeId).map(edge => this.nodesMap.get(edge.target));
    }

    public getRootNodes() {
        return this.nodes.filter(node => !this.hasIncomingEdges(node.id));
    }
}
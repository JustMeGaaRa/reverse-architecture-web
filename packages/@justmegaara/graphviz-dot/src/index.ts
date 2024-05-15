export interface ISupportStringify {
    toString(): string;
}

export class Node implements ISupportStringify {
    constructor(
        public id: string,
        public label?: string
    ) {}

    toString(): string {
        return this.label
            ? `${this.id} [label="${this.label}"];`
            : `${this.id};`
    }
}

export class Edge implements ISupportStringify {
    constructor(
        public source: string,
        public target: string,
        public label?: string
    ) {}

    toString(): string {
        return this.label
            ? `${this.source} -> ${this.target} [label="${this.label}"];`
            : `${this.source} -> ${this.target};`
    }
}

export class Subgraph implements ISupportStringify {
    constructor(
        public id: string,
        public label?: string,
        public cluster?: boolean,
        public nodes: Node[] = [],
        public edges: Edge[] = [],
        public subgraphs: Subgraph[] = []
    ) {}

    addNode(id: string, label?: string): Node {
        const node = new Node(id, label);
        this.nodes.push(node);
        return node;
    }

    addEdge(source: string, target: string, label?: string): Edge {
        const edge = new Edge(source, target, label);
        this.edges.push(edge);
        return edge;
    }

    addSubgraph(id: string, label?: string, cluster?: boolean): Subgraph {
        const subgraph = new Subgraph(id, label, cluster);
        this.subgraphs.push(subgraph);
        return subgraph;
    }

    toString(): string {
        return `subgraph ${this.id} {
            cluster=${this.cluster ? "true" : "false"};

            ${this.subgraphs.map(subgraph => subgraph.toString()).join("\n")}
            ${this.nodes.map(node => node.toString()).join("\n")}
            ${this.edges.map(edge => edge.toString()).join("\n")}
        }`;
    }
}

export type GraphConfig = {
    layout: "dot" | "neato" | "fdp" | "sfdp" | "twopi" | "circo";
    node: {
        shape: string;
        height: number;
        width: number;
        fontsize: number;
    };
    edge: {

    }
}

export class Graph implements ISupportStringify {
    constructor(
        public id: string,
        public nodes: Node[] = [],
        public edges: Edge[] = [],
        public subgraphs: Subgraph[] = [],
        public config: GraphConfig = {
            layout: "dot",
            node: {
                shape: "box",
                height: 4,
                width: 4,
                fontsize: 12
            },
            edge: {

            }
        }
    ) { }

    addNode(id: string, label?: string): Node {
        const node = new Node(id, label);
        this.nodes.push(node);
        return node;
    }

    addEdge(source: string, target: string, label?: string): Edge {
        const edge = new Edge(source, target, label);
        this.edges.push(edge);
        return edge;
    }

    addSubgraph(id: string, label?: string, cluster?: boolean): Subgraph {
        const subgraph = new Subgraph(id, label, cluster);
        this.subgraphs.push(subgraph);
        return subgraph;
    }

    toString() {
        return `digraph ${this.id} {
            node [shape=${this.config.node.shape} height=${this.config.node.height} width=${this.config.node.width} fontsize=${this.config.node.fontsize}]
            ${this.subgraphs.map(subgraph => subgraph.toString()).join("\n")}
            ${this.nodes.map(node => node.toString()).join("\n")}
            ${this.edges.map(edge => edge.toString()).join("\n")}
        }`;
    }
}
import { Edge, Node, useReactFlow } from "@reactflow/core";
import { useCallback } from "react";
import { getReactFlowModelAuto } from "../utils";

const getNextLevelNodeIds = (edges: Edge[], nodeIds: string[], depth?: number) => {
    if (depth === 0) return [];

    const childNodeIds = nodeIds
        .flatMap(nodeId => {
            const targetNodeIds = edges
                .filter(edge => edge.source === nodeId)
                .map(edge => edge.target);
            return targetNodeIds;
        })
    
    const areChildrenAvailable = childNodeIds.length > 0;
    const depthNotReached = depth - 1 !== 0;
    const depthNotSet = depth === undefined || depth === null;

    return areChildrenAvailable && (depthNotReached || depthNotSet)
        ? [...childNodeIds, ...getNextLevelNodeIds(edges, childNodeIds, depth - 1)]
        : childNodeIds;
}

const getNextLevelEdgeIds = (edges: Edge[], nodeIds: string[], depth?: number) => {
    if (depth === 0) return [];

    const [childNodeIds, childEdgeIds] = nodeIds
        .map(nodeId => {
            const levelNodeIds = edges
                .filter(edge => edge.source === nodeId)
                .map(edge => edge.target);
            const levelEdgeIds = edges
                .filter(edge => edge.source === nodeId)
                .map(edge => edge.id);
            return [levelNodeIds, levelEdgeIds];
        })
        .reduce((result, current) => {
            const [resultNodeIds, resultEdgeIds] = result;
            const [childNodeIds, childEdgeIds] = current;
            return [[...resultNodeIds, ...childNodeIds], [...resultEdgeIds, ...childEdgeIds]]
        }, [[], []])
    
    const areChildrenAvailable = childEdgeIds.length > 0;
    const depthNotReached = depth - 1 !== 0;
    const depthNotSet = depth === undefined || depth === null;

    return areChildrenAvailable && (depthNotReached || depthNotSet)
        ? [...childEdgeIds, ...getNextLevelEdgeIds(edges, childNodeIds, depth - 1)]
        : childEdgeIds;
}

type OperationConfig = {
    level: "node" | "tree";
    operation: "collapse" | "expand";
};

export const useCollapsable = () => {
    const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();
    
    const onVisitTree = useCallback((
        initialNodes: Node[],
        initialEdges: Edge[],
        parentNodeId: string,
        config: OperationConfig
    ) => {
        if (parentNodeId === undefined || parentNodeId === null) return;

        const depth = config.operation === "collapse" ? undefined : 1;
        const isNodeCollapsed = config.operation === "collapse";

        const childNodeIds = getNextLevelNodeIds(initialEdges, [parentNodeId], depth);
        const childEdgeIds = getNextLevelEdgeIds(initialEdges, [parentNodeId], depth);
        console.log(config.operation, childNodeIds, childEdgeIds)

        const nodes = initialNodes.map(node => {
            return node.id === parentNodeId
                ? ({ ...node, data: { ...node.data, isCollapsed: isNodeCollapsed }})
                : childNodeIds.includes(node.id)
                    ? ({ ...node, data: { ...node.data, isCollapsed: true }, hidden: isNodeCollapsed })
                    : node
        })
        const edges = initialEdges.map(edge => {
            return childEdgeIds.includes(edge.id)
                ? ({ ...edge, hidden: isNodeCollapsed })
                : edge
        })
        
        getReactFlowModelAuto({ nodes, edges })
            .then(reactFlowObject => {
                setNodes(reactFlowObject.nodes);
                setEdges(reactFlowObject.edges);
            });
    }, [setEdges, setNodes]);

    const onCollapseNode = useCallback((parentNodeId: string) => {
        const nodes = getNodes();
        const edges = getEdges();
        const collapseNodeConfig: OperationConfig = {
            level: "node",
            operation: "collapse"
        }
        onVisitTree(nodes, edges, parentNodeId, collapseNodeConfig);
    }, [getEdges, getNodes, onVisitTree]);

    const onExpandNode = useCallback((parentNodeId: string) => {
        const nodes = getNodes();
        const edges = getEdges();
        const expandNodeConfig: OperationConfig = {
            level: "node",
            operation: "expand"
        }
        onVisitTree(nodes, edges, parentNodeId, expandNodeConfig);
    }, [getEdges, getNodes, onVisitTree]);

    const onCollapseTree = useCallback(() => {
        const nodes = getNodes();
        const edges = getEdges();
        const parentNodeId = edges.find(edge => edges.every(x => edge.source !== x.target))?.source;
        const collapseTreeConfig: OperationConfig = {
            level: "tree",
            operation: "collapse"
        }
        onVisitTree(nodes, edges, parentNodeId, collapseTreeConfig);
    }, [getEdges, getNodes, onVisitTree]);

    const onExpandTree = useCallback(() => {
        const nodes = getNodes();
        const edges = getEdges();
        const parentNodeId = edges.find(edge => edges.every(x => edge.source !== x.target))?.source;
        const expandTreeConfig: OperationConfig = {
            level: "tree",
            operation: "expand"
        }
        onVisitTree(nodes, edges, parentNodeId, expandTreeConfig);
    }, [getEdges, getNodes, onVisitTree]);

    return {
        onCollapseNode,
        onExpandNode,
        onCollapseTree,
        onExpandTree
    }
}
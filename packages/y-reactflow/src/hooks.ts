import {
    Node,
    Edge,
    useReactFlow
} from "@reactflow/core";
import { useCallback, useEffect } from "react";
import * as Y from "yjs";
import { useReactFlowRoom } from "./context";

export const useYReactFlow = () => {
    const { document } = useReactFlowRoom();
    const store = useReactFlow()

    const NodesKey = "nodes";
    const EdgesKey = "edges";

    const ynodes = document.getMap(NodesKey);
    const yedges = document.getMap(EdgesKey);

    const setNodes = useCallback((nodes: Node[]) => {
        if (document) {
            Y.transact(document, () => {
                ynodes.clear();
                nodes.forEach(node => ynodes.set(node.id, node));
            });
        }
    }, [document, ynodes]);

    const setEdges = useCallback((edges: Edge[]) => {
        if (document) {
            Y.transact(document, () => {
                yedges.clear();
                edges.forEach(edge => yedges.set(edge.id, edge));
            });
        }
    }, [document, yedges]);
    
    const updateNodes = useCallback((nodes: Node[]) => {
        if (document) {
            Y.transact(document, () => {
                nodes.forEach(node => ynodes.set(node.id, node));
            });
        }
    }, [document, ynodes]);

    const updateEdges = useCallback((edges: Edge[]) => {
        if (document) {
            Y.transact(document, () => {
                edges.forEach(edge => yedges.set(edge.id, edge));
            });
        }
    }, [document, yedges]);

    const deleteNodes = useCallback((nodes: Node[]) => {
        if (document) {
            Y.transact(document, () => {
                nodes.forEach(node => ynodes.delete(node.id));
            });
        }
    }, [document, ynodes]);

    const deleteEdges = useCallback((edges: Edge[]) => {
        if (document) {
            Y.transact(document, () => {
                edges.forEach(edge => yedges.delete(edge.id));
            });
        }
    }, [document, yedges]);

    useEffect(() => {
        ynodes.observe((event, node) => {
            store.setNodes(Array.from(ynodes.values()));
        });

        yedges.observe((event, edge) => {
            store.setEdges(Array.from(yedges.values()));
        });
    }, [store, ynodes, yedges]);

    return {
        setNodes,
        setEdges,
        updateNodes,
        updateEdges,
        deleteNodes,
        deleteEdges,
    }
}
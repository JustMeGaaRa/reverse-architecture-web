import { Handle, NodeProps, Position, useReactFlow } from "@reactflow/core";
import { IElement } from "@structurizr/dsl";
import { FC, PropsWithChildren, useCallback } from "react";
import { v4 } from "uuid";

export function ReactFlowNodeWrapper(ElementNodeComponent: FC<PropsWithChildren<{
    element: IElement;
    elementChildrenCount?: number;
    isSelected?: boolean;
    isHovered?: boolean;
}>>): FC<NodeProps<{
    element: IElement;
    elementChildrenCount?: number;
}>> {
    return function ReactFlowNodeComponent({ id, data, selected }) {
        const { setNodes, setEdges, getNodes } = useReactFlow();
    
        const handleOnClick = useCallback(() => {
            const newNodeId = v4();
            const newPlaceholderId = v4();
            const newNodeEdgeId = v4();
            const newPlaceholderEdgeId = v4();
            const currentNode = getNodes().find(node => node.id === id);
    
            setNodes(nodes => {
                const elementNode = {
                    id: newNodeId,
                    type: "element",
                    data: {
                        name: "Software System",
                        tags: [{ name: "Software System" }]
                    },
                    position: { x: currentNode.position.x, y: currentNode.position.y + 400 },
                }
                const placholderNode = {
                    id: newPlaceholderId,
                    type: "placeholder",
                    data: { },
                    position: { x: currentNode.position.x, y: currentNode.position.y + 400 },
                }
    
                return [...nodes, elementNode, placholderNode];
            });
            setEdges(edges => {
                const elementEdge = {
                    id: newNodeEdgeId,
                    type: "smoothstep",
                    source: currentNode.id,
                    target: newNodeId,
                }
                const placeholderEdge = {
                    id: newPlaceholderEdgeId,
                    type: "smoothstep",
                    source: newNodeId,
                    target: newPlaceholderId,
                }
    
                return [...edges, elementEdge, placeholderEdge];
            });
        }, [id, getNodes, setNodes, setEdges]);
        
        return (
            <ElementNodeComponent
                element={data.element}
                elementChildrenCount={data.elementChildrenCount}
                // isSelected={selected}
                // onClick={handleOnClick}
            >
                <Handle
                    id={"handle-source-bottom"}
                    type={"source"}
                    position={Position.Bottom}
                    style={{
                        background: "none",
                        border: "none",
                        pointerEvents: "none",
                        bottom: "0px",
                    }}
                />
                <Handle
                    id={"handle-target-top"}
                    type={"target"}
                    position={Position.Top}
                    style={{
                        background: "none",
                        border: "none",
                        pointerEvents: "none",
                        top: "0px",
                    }}
                />
            </ElementNodeComponent>
        )
    }
}
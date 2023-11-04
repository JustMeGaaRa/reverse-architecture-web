import { Box } from "@chakra-ui/react";
import { Handle, Position, useReactFlow } from "@reactflow/core";
import { FC, useCallback } from "react";
import { v4 } from "uuid"
import { ElementLabel } from "../";

export const ElementNode: FC<{ id: string; data: any }> = ({ id, data }) => {
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
                connectable: false,
                draggable: false,
            }
            const placholderNode = {
                id: newPlaceholderId,
                type: "placeholder",
                data: { },
                position: { x: currentNode.position.x, y: currentNode.position.y + 400 },
                connectable: false,
                draggable: false,
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
        <Box
            backgroundColor={"whiteAlpha.400"}
            borderColor={"whiteAlpha.800"}
            borderRadius={"2xl"}
            borderWidth={2}
            height={"200px"}
            width={"200px"}
            onClick={handleOnClick}
        >
            <ElementLabel data={data.element} />
            <Handle id={"handle-1"} type={"target"} position={Position.Top} />
            <Handle id={"handle-2"} type={"source"} position={Position.Bottom} />
        </Box>
    )
}
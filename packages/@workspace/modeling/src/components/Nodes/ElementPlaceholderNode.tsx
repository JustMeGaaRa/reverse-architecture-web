import { Flex } from "@chakra-ui/react";
import { Handle, Position, useReactFlow } from "@reactflow/core";
import { IElement } from "@structurizr/dsl";
import { Square } from "iconoir-react";
import { FC, useCallback } from "react";
import { v4 } from "uuid"

export const ElementPlaceholderNode: FC<{ element: IElement; }> = ({ element }) => {
    const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();

    const handleOnClick = useCallback(() => {
        const newNodeId = v4();
        const newEdgeId = v4();
        const currentNode = getNodes().find(node => node.id === element.identifier);
        const currentEdge = getEdges().find(edge => edge.target === element.identifier);
        const currentNodeId = element.identifier;
        const currentEdgeId = currentEdge?.id;

        setNodes(nodes => {
            const elementNode = {
                id: newNodeId,
                type: "element",
                data: {
                    name: "Software System",
                    tags: [{ name: "Software System" }]
                },
                position: { x: currentNode.position.x, y: currentNode.position.y },
                connectable: false,
                draggable: false,
            }
            const placholderNode = {
                id: currentNodeId,
                type: "placeholder",
                data: { },
                position: { x: currentNode.position.x, y: currentNode.position.y + 200 },
                connectable: false,
                draggable: false,
            }

            return [...nodes.filter(x => x.id !== element.identifier), elementNode, placholderNode];
        });
        setEdges(edges => {
            const elementEdge = {
                id: newEdgeId,
                type: "smoothstep",
                source: currentEdge !== undefined ? currentEdge.source : newNodeId,
                target: currentEdge !== undefined ? newNodeId : currentNodeId,
            }
            const placeholderEdge = {
                id: currentEdgeId,
                type: "smoothstep",
                source: newNodeId,
                target: currentEdge?.target,
            }

            return currentEdge !== undefined
                ? [...edges.filter(x => x.id !== currentEdge.id), elementEdge, placeholderEdge]
                : [...edges.filter(x => x.id !== currentEdge.id), elementEdge];
        });
    }, [element.identifier, getNodes, getEdges, setNodes, setEdges]);

    return (
        <Flex
            backgroundColor={"whiteAlpha.200"}
            borderColor={"whiteAlpha.400"}
            borderStyle={"dashed"}
            borderRadius={"2xl"}
            borderWidth={2}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100px"}
            width={"200px"}
            _hover={{
                backgroundColor: "whiteAlpha.300",
                borderColor: "whiteAlpha.500",
            }}
            onClick={handleOnClick}
        >
            <Square stroke={"whiteAlpha.400"} />
            <Handle id={"handle-1"} type={"target"} position={Position.Top} />
            <Handle id={"handle-2"} type={"source"} position={Position.Bottom} />
        </Flex>
    )
}
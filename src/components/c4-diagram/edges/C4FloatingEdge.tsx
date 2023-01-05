import { FC, useCallback } from "react";
import {
    Node,
    EdgeProps,
    EdgeLabelRenderer,
    Position,
    internalsSymbol,
    useStore,
    getBezierPath,
} from "reactflow";
import { Box } from "@chakra-ui/react";
import { C4RelationshipInfo } from "../info/C4RelationshipInfo";
import { Relationship } from "../types";

function getNodeCenter(node: Node) {
    return {
        x: node.positionAbsolute.x + node.width / 2,
        y: node.positionAbsolute.y + node.height / 2
    };
}

function getHandleCoordsByPosition(node: Node, handlePosition: Position) {
    // all handles are from type source, that's why we use handleBounds.source here
    const handle = node[internalsSymbol].handleBounds.source.find(
        (handle) => handle.position === handlePosition
    );

    let offsetX = handle.width / 2;
    let offsetY = handle.height / 2;

    // this is a tiny detail to make the markerEnd of an edge visible.
    // The handle position that gets calculated has the origin top-left, so depending which side we are using, we add a little offset
    // when the handlePosition is Position.Right for example, we need to add an offset as big as the handle itself in order to get the correct position
    switch (handlePosition) {
        case Position.Left:
            offsetX = 0;
            break;
        case Position.Right:
            offsetX = handle.width;
            break;
        case Position.Top:
            offsetY = 0;
            break;
        case Position.Bottom:
            offsetY = handle.height;
            break;
    }

    const x = node.positionAbsolute.x + handle.x + offsetX;
    const y = node.positionAbsolute.y + handle.y + offsetY;

    return [x, y];
}

// returns the position (top,right,bottom or right) passed node compared to
function getParams(nodeA: Node, nodeB: Node) {
    const centerA = getNodeCenter(nodeA);
    const centerB = getNodeCenter(nodeB);

    const horizontalDiff = Math.abs(centerA.x - centerB.x);
    const verticalDiff = Math.abs(centerA.y - centerB.y);

    // when the horizontal difference between the nodes is bigger, we use Position.Left or Position.Right for the handle
    // here the vertical difference between the nodes is bigger, so we use Position.Top or Position.Bottom for the handle
    const position: any = horizontalDiff > verticalDiff
        ? (centerA.x > centerB.x ? Position.Left : Position.Right)
        : (centerA.y > centerB.y ? Position.Top : Position.Bottom);
    
    const [x, y] = getHandleCoordsByPosition(nodeA, position);
    return [x, y, position];
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source: Node, target: Node) {
    const [sourceX, sourceY, sourcePosition] = getParams(source, target);
    const [targetX, targetY, targetPosition] = getParams(target, source);

    return {
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition
    };
}

export interface IRelationshipProps {
    relationship: Relationship;
}

export const C4FloatingEdge: FC<EdgeProps<IRelationshipProps>> = ({
    id,
    source,
    target,
    markerStart,
    markerEnd,
    data
}) => {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

    if (!sourceNode || !targetNode) return null;

    const edgeParams = getEdgeParams(sourceNode, targetNode);
    const [edgePath, labelX, labelY] = getBezierPath(edgeParams);

    return (
        <path
            id={id}
            d={edgePath}
            style={{
                stroke: "#b1b1b7",
                strokeWidth: 2,
                fill: "none"
            }}
            markerStart={markerStart}
            markerEnd={markerEnd}
        >
            <EdgeLabelRenderer>
                <Box
                    background={"whiteAlpha.900"}
                    boxShadow={"lg"}
                    borderRadius={"lg"}
                    className="nodrag nopan"
                    padding={1}
                    position={"absolute"}
                    transform={`translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}
                >
                    <C4RelationshipInfo
                        data={data.relationship}
                        align="center"
                        showTechnologies
                        showTitle
                    />
                </Box>
            </EdgeLabelRenderer>
        </path>
    );
};

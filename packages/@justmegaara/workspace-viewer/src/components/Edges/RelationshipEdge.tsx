import { Box, useColorModeValue } from "@chakra-ui/react";
import {
    defaultRelationshipStyle,
    Relationship,
    RelationshipStyleProperties
} from "@justmegaara/structurizr-dsl";
import {
    Node,
    EdgeProps,
    EdgeLabelRenderer,
    Position,
    internalsSymbol,
    useStore,
    getBezierPath,
} from "@reactflow/core";
import { FC, useCallback } from "react";
import { RelationshipLabel } from "../Labels";
import { BaseEdge } from "./BaseEdge";

function getNodeCenter(node: Node) {
    if (!node.positionAbsolute || !node.width || !node.height) {
        return { x: 0, y: 0 }
    }

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
function getParams(nodeA: Node, nodeB: Node): [number, number, Position] {
    const centerA = getNodeCenter(nodeA);
    const centerB = getNodeCenter(nodeB);

    const horizontalDiff = Math.abs(centerA.x - centerB.x);
    const verticalDiff = Math.abs(centerA.y - centerB.y);

    // when the horizontal difference between the nodes is bigger, we use Position.Left or Position.Right for the handle
    // here the vertical difference between the nodes is bigger, so we use Position.Top or Position.Bottom for the handle
    const position = horizontalDiff > verticalDiff
        ? (centerA.x > centerB.x ? Position.Left : Position.Right)
        : (centerA.y > centerB.y ? Position.Top : Position.Bottom);
    
    const [x, y] = getHandleCoordsByPosition(nodeA, position);
    return [x, y, position];
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
function getEdgeParams(source: Node, target: Node) {
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

export type RelationshipEdgeProps = {
    data: Relationship;
    style?: Partial<RelationshipStyleProperties>;
    selected?: boolean;
}

export const RelationshipEdge: FC<RelationshipEdgeProps> = ({
    data,
    style = defaultRelationshipStyle,
    selected = false,
}) => {
    const backgroundDefault = useColorModeValue("whiteAlpha.900", "gray.200");
    const backgroundHighlight = useColorModeValue("whiteAlpha.900", "gray.200");
    const background = selected
        ? backgroundDefault
        : backgroundHighlight;
    
    const borderDefault = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
    const borderHightlight = useColorModeValue("blackAlpha.400", "whiteAlpha.400");
    const border = selected
        ? borderDefault
        : borderHightlight;
    
    const source = data.sourceIdentifier;
    const target = data.targetIdentifier;
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

    if (!sourceNode || !targetNode) return null;

    const edgeParams = getEdgeParams(sourceNode, targetNode);
    const [path, labelX, labelY] = getBezierPath(edgeParams);

    return (
        <BaseEdge
            path={path}
            labelX={labelX}
            labelY={labelY}
            style={{
                width: style.thikness
            }}
            interactionWidth={style.thikness * 2}
            // TODO: resolve marker end style
            // markerEnd={{ type: MarkerType.Arrow }}
        >
            <EdgeLabelRenderer>
                <Box
                    background={background}
                    boxShadow={"lg"}
                    border={border}
                    borderWidth={1}
                    borderRadius={"lg"}
                    className="nodrag nopan"
                    padding={1}
                    position={"absolute"}
                    transform={`translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}
                >
                    <RelationshipLabel data={data} />
                </Box>
            </EdgeLabelRenderer>
        </BaseEdge>
    );
};

export type RelationshipEdgeWrapperProps = {
    relationship: Relationship;
    style?: Partial<RelationshipStyleProperties>;
}

export const RelationshipEdgeWrapper: FC<EdgeProps<RelationshipEdgeWrapperProps>> = ({
    data,
    selected
}) => {
    return (
        <RelationshipEdge
            data={data.relationship}
            style={data.style ?? defaultRelationshipStyle}
            selected={selected}
        />
    );
}
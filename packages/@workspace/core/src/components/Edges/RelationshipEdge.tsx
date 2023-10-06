import { Box, useColorModeValue } from "@chakra-ui/react";
import {
    StructurizrRelationshipTagDefaultStyle,
    Relationship,
    RelationshipStyleProperties
} from "@structurizr/dsl";
import {
    EdgeLabelRenderer,
    useStore,
    getBezierPath
} from "@reactflow/core";
import { FC, useCallback } from "react";
import { RelationshipLabel } from "./RelationshipLabel";
import { BaseEdge } from "./BaseEdge";
import { getEdgeParams } from "./utils";
import { MarkerType } from "./MarkerType";

export const RelationshipBezierEdge: FC<{
    data: Relationship;
    style: RelationshipStyleProperties;
    selected?: boolean;
}> = ({
    data,
    style = StructurizrRelationshipTagDefaultStyle,
    selected = false,
}) => {
    const backgroundDefault = useColorModeValue("whiteAlpha.100", "transparent");
    const backgroundHighlight = useColorModeValue("whiteAlpha.100", "gray.500");
    const backgroundColor = selected
        ? backgroundDefault
        : backgroundHighlight;
    
    const borderDefault = useColorModeValue("whiteAlpha.400", "transparent");
    const borderHightlight = useColorModeValue("whiteAlpha.700", "whiteAlpha.700");
    const borderColor = selected
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
                width: style.thikness,
                // TODO: handle stroke color from theme
                stroke: selected ? "#B9BABA" : "#8A8B8C"
            }}
            interactionWidth={20}
            markerStart={MarkerType.CircleOutline}
            markerEnd={MarkerType.ArrowClosed}
        >
            <EdgeLabelRenderer>
                <Box
                    // TODO: handle background color from theme
                    // backgroundColor={backgroundColor}
                    borderColor={selected ? "whiteAlpha.700" : "transparent"}
                    borderRadius={"lg"}
                    borderWidth={1}
                    className={"nodrag nopan"}
                    padding={1}
                    position={"absolute"}
                    transform={`translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}
                    maxWidth={style.width}
                >
                    <RelationshipLabel data={data} selected={selected} />
                </Box>
            </EdgeLabelRenderer>
        </BaseEdge>
    );
};
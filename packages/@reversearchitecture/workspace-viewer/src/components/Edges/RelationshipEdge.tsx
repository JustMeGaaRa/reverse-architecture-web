import { Box, useColorModeValue } from "@chakra-ui/react";
import {
    defaultRelationshipStyle,
    Relationship,
    RelationshipStyleProperties
} from "@structurizr/dsl";
import {
    EdgeLabelRenderer,
    useStore,
    getBezierPath,
} from "@reactflow/core";
import { FC, useCallback } from "react";
import { RelationshipLabel } from "./RelationshipLabel";
import { BaseEdge } from "./BaseEdge";
import { getEdgeParams } from "./utils";

export const RelationshipBezierEdge: FC<{
    data: Relationship;
    style: RelationshipStyleProperties;
    selected?: boolean;
}> = ({
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
                    maxWidth={style.width}
                >
                    <RelationshipLabel data={data} />
                </Box>
            </EdgeLabelRenderer>
        </BaseEdge>
    );
};
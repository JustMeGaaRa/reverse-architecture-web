import { Box } from "@chakra-ui/react";
import { useStore, getBezierPath, EdgeLabelRenderer } from "@reactflow/core";
import { IRelationship, IRelationshipStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren, useCallback } from "react";
import { MarkerType } from "../Edges";
import { getEdgeParams, } from "./utils";

type BezierLineProps = {
    relationship: IRelationship;
    style: IRelationshipStyleProperties;
    isSelected?: boolean;
    markerEnd?: MarkerType;
    markerStart?: MarkerType;
}

export const BezierLine: FC<PropsWithChildren<BezierLineProps>> = ({
    children,
    relationship,
    style,
    isSelected,
    markerEnd,
    markerStart,
}) => {
    const source = relationship.sourceIdentifier;
    const target = relationship.targetIdentifier;
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

    if (!sourceNode || !targetNode) return null;

    const edgeParams = getEdgeParams(sourceNode, targetNode);
    const [path, labelX, labelY] = getBezierPath(edgeParams);

    return (
        <>
            <path
                className="react-flow__edge-path"
                d={path}
                fill={"none"}
                style={{
                    width: style.thickness,
                    // TODO: handle stroke color from theme
                    stroke: isSelected ? "#B9BABA" : "#8A8B8C"
                }}
                markerStart={`url(#${markerStart})`}
                markerEnd={`url(#${markerEnd})`}
            />
            <path
                className="react-flow__edge-interaction"
                d={path}
                fill={"none"}
                strokeOpacity={0}
                strokeWidth={20}
            />
            <EdgeLabelRenderer>
                <Box
                    // TODO: handle background color from theme
                    // backgroundColor={backgroundColor}
                    borderColor={isSelected ? "whiteAlpha.700" : "transparent"}
                    borderRadius={"lg"}
                    borderWidth={1}
                    className={"nodrag nopan"}
                    padding={1}
                    position={"absolute"}
                    transform={`translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}
                    maxWidth={style.width}
                >
                    {children}
                </Box>
            </EdgeLabelRenderer>
        </>
    );
}

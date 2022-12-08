import { FC, useCallback } from "react";
import {
  useStore,
  getBezierPath,
  EdgeProps,
  EdgeLabelRenderer
} from "reactflow";

import { C4RelationshipInfo } from "../c4-relationship-info";
import { getEdgeParams } from "./EdgeUtils";

export const C4FloatingEdge: FC<EdgeProps<any>> = ({
  id,
  source,
  target,
  markerStart,
  markerEnd,
  style,
  data
}) => {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty
  });

  return (
    <path
      className="react-flow__edge-path"
      id={id}
      d={edgePath}
      markerStart={markerStart}
      markerEnd={markerEnd}
      style={style}
    >
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: "#ffffff",
            borderRadius: 5,
            zIndex: 99
          }}
          className="nodrag nopan"
        >
          <C4RelationshipInfo
            data={data}
            align="center"
            showTechnologies
            showTitle
          />
        </div>
      </EdgeLabelRenderer>
    </path>
  );
};

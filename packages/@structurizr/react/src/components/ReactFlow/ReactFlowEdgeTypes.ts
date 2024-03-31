import { ReactFlowEdgeTypeNames } from "../../types";
import { RelationshipBezierEdge } from "../Edges";
import { ReactFlowViewEdgeAdapter } from "./ReactFlowViewEdgeAdapter";

const ReactFlowBezierEdge = ReactFlowViewEdgeAdapter(RelationshipBezierEdge);

export const ReactFlowEdgeTypes = {
    [ReactFlowEdgeTypeNames.ViewRelationship]: ReactFlowBezierEdge,
    [ReactFlowEdgeTypeNames.ViewRelationshipStraight]: ReactFlowBezierEdge,
    [ReactFlowEdgeTypeNames.ViewRelationshipStep]: ReactFlowBezierEdge,
    [ReactFlowEdgeTypeNames.ViewRelationshipSmoothstep]: ReactFlowBezierEdge,
    [ReactFlowEdgeTypeNames.ViewRelationshipSimpleBezier]: ReactFlowBezierEdge
}
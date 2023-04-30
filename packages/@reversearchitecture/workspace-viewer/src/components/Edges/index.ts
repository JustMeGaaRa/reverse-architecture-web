import { ReactFlowEdgeWrapper } from "./ReactFlowEdgeWrapper";
import { RelationshipBezierEdge } from "./RelationshipEdge";

export * from "./BaseEdge";
export * from "./RelationshipEdge";
export * from "./ReactFlowEdgeWrapper";

export const ReactFlowBezierEdge = ReactFlowEdgeWrapper(RelationshipBezierEdge);
import { Edge, EdgeProps } from "@reactflow/core";
import { IRelationship } from "@structurizr/dsl";

export type StructurizrViewRelationshipProps = {
    relationship: IRelationship;
    isSelected?: boolean;
}

export type StructurizrViewRelationshipData = {
    relationship: IRelationship;
}

export type ReactFlowEdge = Edge<StructurizrViewRelationshipData>;

export type ReactFlowEdgeProps = EdgeProps<StructurizrViewRelationshipData>
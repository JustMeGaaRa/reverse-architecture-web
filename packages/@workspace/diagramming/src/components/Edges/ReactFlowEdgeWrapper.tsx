import {
    StructurizrRelationshipTagDefaultStyle,
    foldStyles,
    Relationship,
    RelationshipStyleCollection,
    IRelationshipStyleProperties
} from "@structurizr/dsl";
import { EdgeProps } from "@reactflow/core";
import { FC, useMemo } from "react";

export function ReactFlowEdgeWrapper(EdgeElement: FC<{
    data: Relationship;
    style: IRelationshipStyleProperties;
    selected?: boolean;
}>): FC<EdgeProps<{
    relationship: Relationship;
    style: RelationshipStyleCollection;
}>> {
    return function WrappedEdge({
        data,
        selected
    }) {
        const edgeStyle = useMemo(() => foldStyles(
            StructurizrRelationshipTagDefaultStyle,
            data.style,
            data.relationship.tags
        ), [data.relationship.tags, data.style]);

        return (
            <EdgeElement
                data={data.relationship}
                style={edgeStyle ?? StructurizrRelationshipTagDefaultStyle}
                selected={selected}
            />
        )
    }
}

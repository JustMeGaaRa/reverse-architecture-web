import {
    aggrerateStyles,
    defaultRelationshipStyle,
    Relationship,
    RelationshipStyle,
    RelationshipStyleProperties
} from "@structurizr/dsl";
import { EdgeProps } from "@reactflow/core";
import { FC, useMemo } from "react";

export function ReactFlowEdgeWrapper(EdgeElement: FC<{
    data: Relationship;
    style: RelationshipStyleProperties;
    selected?: boolean;
}>): FC<EdgeProps<{
    relationship: Relationship;
    style: RelationshipStyle;
}>> {
    return function WrappedEdge({
        data,
        selected
    }) {
        const edgeStyle = useMemo(() => aggrerateStyles(
            defaultRelationshipStyle,
            data.style,
            [...data.relationship.tags].reverse()
        ), [data.relationship.tags, data.style]);

        return (
            <EdgeElement
                data={data.relationship}
                style={edgeStyle ?? defaultRelationshipStyle}
                selected={selected}
            />
        )
    }
}

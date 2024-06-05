import { Relationship, IRelationshipStyleProperties, StructurizrRelationshipTagDefaultStyle, foldStyles } from "@structurizr/dsl";
import { FC, useMemo } from "react";
import { useWorkspace } from "../../hooks";
import { RelationshipLabel } from "./RelationshipLabel";
import { RelationshipStyleSelector } from "./RelationshipStyleSelector";

export const RelationshipBezierEdge: FC<{
    relationship: Relationship;
    isSelected?: boolean;
}> = ({
    relationship,
    isSelected,
}) => {
    const { workspace } = useWorkspace();
    
    const edgeStyle = useMemo(() => foldStyles(
        StructurizrRelationshipTagDefaultStyle,
        workspace.views.configuration.styles.relationships,
        relationship.tags
    ), [relationship.tags, workspace.views.configuration.styles.relationships]);

    return (
        <RelationshipStyleSelector
            relationship={relationship}
            style={edgeStyle}
        >
            <RelationshipLabel
                relationship={relationship}
                isSelected={isSelected}
            />
        </RelationshipStyleSelector>
    );
}
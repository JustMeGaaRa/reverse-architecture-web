import { FC } from "react";
import { ReactFlowEdgeProps, StructurizrViewRelationshipProps } from "./StructurizrViewRelationshipProps";

export function ReactFlowViewEdgeAdapter(EdgeComponent: FC<StructurizrViewRelationshipProps>): FC<ReactFlowEdgeProps> {
    return function ReactFlowEdgeComponent({ data, selected }) {
        return (
            <EdgeComponent
                relationship={data.relationship}
                isSelected={selected}
            />
        )
    }
}

import { IRelationship, IRelationshipStyleProperties, RoutingStyle } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { BezierLine } from "../Lines";
import { MarkerType } from "./MarkerType";

export const RelationshipStyleSelector: FC<PropsWithChildren<{
    relationship: IRelationship;
    style: IRelationshipStyleProperties;
}>> = ({
    children,
    relationship,
    style
}) => {
    switch (style.routing) {
        case RoutingStyle.Curved:
            return (
                <BezierLine
                    relationship={relationship}
                    style={style}
                    markerStart={MarkerType.CircleOutline}
                    markerEnd={MarkerType.ArrowClosed}
                >
                    {children}
                </BezierLine>
            );
        default:
            return (
                <BezierLine
                    relationship={relationship}
                    style={style}
                    markerStart={MarkerType.CircleOutline}
                    markerEnd={MarkerType.ArrowClosed}
                >
                    {children}
                </BezierLine>
            );
    };
}
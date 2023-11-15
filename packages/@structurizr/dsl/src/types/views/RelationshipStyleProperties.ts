import { Color } from "./Color";
import { LineStyle } from "./LineStyle";
import { Properties } from "../model/Properties";
import { RoutingStyle } from "./RoutingStyle";

export interface RelationshipStyleProperties {
    color: Color;
    fontSize: number;
    opacity: number;
    position: number;
    properties: Properties;
    routing: RoutingStyle;
    style: LineStyle;
    thickness: number;
    width: number;
}

export const StructurizrRelationshipTagDefaultStyle: RelationshipStyleProperties = {
    color: "#707070",
    fontSize: 24,
    opacity: 100,
    position: 50,
    properties: new Map(),
    routing: RoutingStyle.Direct,
    style: LineStyle.Dashed,
    thickness: 2,
    width: 200,
}
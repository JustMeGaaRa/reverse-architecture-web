import { Color } from "./Color";
import { LineStyle } from "./LineStyle";
import { Properties } from "../model/Properties";
import { RoutingStyle } from "./RoutingStyle";

export class RelationshipStyleProperties {
    thikness: number;
    color: Color;
    style: LineStyle;
    routing: RoutingStyle;
    fontSize: number;
    width: number;
    position: number;
    opacity: number;
    properties: Properties;
}

export const defaultRelationshipStyle: RelationshipStyleProperties = {
    thikness: 1,
    color: "#898989",
    style: LineStyle.Solid,
    routing: RoutingStyle.Direct,
    fontSize: 14,
    width: 1,
    position: 1,
    opacity: 100,
    properties: new Map()
}
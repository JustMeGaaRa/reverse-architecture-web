import { Color } from "./Color";
import { LineStyle } from "./LineStyle";
import { Properties } from "../model/Properties";
import { RoutingStyle } from "./RoutingStyle";

export class RelationshipStyleProperties {
    color: Color;
    fontSize: number;
    opacity: number;
    position: number;
    properties: Properties;
    routing: RoutingStyle;
    style: LineStyle;
    thikness: number;
    width: number;
}

export const defaultRelationshipStyle: RelationshipStyleProperties = {
    color: "#898989",
    fontSize: 14,
    opacity: 100,
    position: 1,
    properties: new Map(),
    routing: RoutingStyle.Direct,
    style: LineStyle.Solid,
    thikness: 1,
    width: 1,
}
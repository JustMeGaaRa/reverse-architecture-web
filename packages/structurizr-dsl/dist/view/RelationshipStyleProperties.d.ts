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
    thikness: number;
    width: number;
}
export declare const defaultRelationshipStyle: RelationshipStyleProperties;
//# sourceMappingURL=RelationshipStyleProperties.d.ts.map
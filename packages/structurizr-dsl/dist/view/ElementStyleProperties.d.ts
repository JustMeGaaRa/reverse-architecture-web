import { Color } from "./Color";
import { LineStyle } from "./LineStyle";
import { Properties } from "../model/Properties";
import { ShapeType } from "./ShapeType";
import { Url } from "../model/Url";
export interface ElementStyleProperties {
    background: Color;
    border: LineStyle;
    color: Color;
    description: boolean;
    fontSize: number;
    height: number;
    icon: Url | string;
    metadata: boolean;
    opacity: number;
    properties: Properties;
    shape: ShapeType | string;
    stroke: Color;
    strokeWidth: number;
    width: number;
}
export declare const defaultElementStyle: ElementStyleProperties;
//# sourceMappingURL=ElementStyleProperties.d.ts.map
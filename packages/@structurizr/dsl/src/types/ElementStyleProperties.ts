import { Color } from "./Color";
import { LineStyle } from "./LineStyle";
import { Properties } from "./Properties";
import { ShapeType } from "./ShapeType";
import { Url } from "./Url";

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
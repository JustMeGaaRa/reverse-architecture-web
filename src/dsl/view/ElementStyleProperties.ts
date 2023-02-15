import { Color } from "./Color";
import { LineStyle } from "./LineStyle";
import { Properties } from "../model/Properties";
import { ShapeType } from "./ShapeType";
import { Url } from "../model/Url";


export class ElementStyleProperties {
    shape: ShapeType | string;
    icon: Url | string;
    width: number;
    height: number;
    background: Color;
    color: Color;
    stroke: Color;
    strokeWidth: number;
    fontSize: number;
    border: LineStyle;
    opacity: number;
    metadata: boolean;
    description: boolean;
    properties: Properties;
}

export const defaultElementStyle: ElementStyleProperties = {
    shape: ShapeType.RoundedBox,
    icon: "",
    width: 300,
    height: 200,
    background: "#DDDDDD",
    color: "#000000",
    stroke: "#C3C3C3",
    strokeWidth: 0,
    fontSize: 14,
    border: LineStyle.Solid,
    opacity: 100,
    metadata: false,
    description: true,
    properties: new Map()
}
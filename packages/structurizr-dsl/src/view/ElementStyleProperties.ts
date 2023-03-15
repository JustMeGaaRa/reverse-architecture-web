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

export const defaultElementStyle: ElementStyleProperties = {
    background: "#DDDDDD",
    border: LineStyle.Solid,
    color: "#000000",
    description: true,
    fontSize: 14,
    height: 200,
    icon: "",
    metadata: false,
    opacity: 100,
    properties: new Map(),
    shape: ShapeType.RoundedBox,
    stroke: "#C3C3C3",
    strokeWidth: 1,
    width: 300,
}
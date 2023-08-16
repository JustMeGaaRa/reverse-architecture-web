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

export const StructurizrElementTagDefaultStyle: ElementStyleProperties = {
    shape: ShapeType.Box,
    icon: "",
    width: 450,
    height: 300,
    background: "#dddddd",
    stroke: "#c3c3c3",
    strokeWidth: 2,
    color: "#000000",
    fontSize: 24,
    border: LineStyle.Solid,
    opacity: 100,
    metadata: true,
    description: true,
    properties: new Map(),
}
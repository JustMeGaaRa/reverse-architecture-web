import { indent, line } from "../../utils/Formatting";
import { ElementStyleProperties } from "./ElementStyleProperties";

export interface ElementStyle {
    [tag: string]: Partial<ElementStyleProperties>;
}

export function toElementStyleString(elementStyle?: ElementStyle): string {
    if (!elementStyle) {
        return "";
    }
    
    return Object.keys(elementStyle)
        .map(tag => {
            const style: any = elementStyle[tag];
            const properties = Object.keys(style)
                .map(property => line(indent(`${property} ${style[property]}`)))
                .join("");
            return `element "${tag}" {\n${properties}\n}`;
        })
        .join("\n");
}
import { ElementStyleProperties } from "./ElementStyleProperties";

export interface ElementStyle {
    [tag: string]: Partial<ElementStyleProperties>;
}

export function toElementStyleString(elementStyle: ElementStyle): string {
    if (!elementStyle) {
        return "";
    }
    
    return Object.keys(elementStyle)
        .map(tag => {
            const style = elementStyle[tag];
            return `element "${tag}" {
                \t${Object.keys(style)
                    .map(key => `${key} ${style[key]}`)
                    .join("\n\t")}
            }`
        })
        .join("\n\t")
}

export function element(
    tag: string,
    style: Partial<ElementStyleProperties>
): ElementStyle {
    return {
        [tag]: style
    }
}
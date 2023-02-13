import { ElementStyleProperties } from "./ElementStyleProperties";

export interface ElementStyle {
    [tag: string]: Partial<ElementStyleProperties>;
}

export function element(
    tag: string,
    style: Partial<ElementStyleProperties>
): ElementStyle {
    return {
        [tag]: style
    }
}
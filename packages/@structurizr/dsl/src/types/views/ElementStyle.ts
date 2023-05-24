import { ElementStyleProperties } from "./ElementStyleProperties";

export interface ElementStyle {
    [tag: string]: Partial<ElementStyleProperties>;
}
import { ElementStyleProperties } from "./ElementStyleProperties";
export interface ElementStyle {
    [tag: string]: Partial<ElementStyleProperties>;
}
export declare function toElementStyleString(elementStyle?: ElementStyle): string;
export declare function elementStyle(tag: string, style: Partial<ElementStyleProperties>): ElementStyle;
//# sourceMappingURL=ElementStyle.d.ts.map
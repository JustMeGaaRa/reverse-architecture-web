import { Tag } from "../model/Tag";
import { ElementStyle } from "./ElementStyle";
import { RelationshipStyle } from "./RelationshipStyle";
export interface Styles {
    element: ElementStyle;
    relationship: RelationshipStyle;
}
export declare function toStylesString(styles?: Styles): string;
export declare function styles(element?: ElementStyle[], relationship?: RelationshipStyle[]): Styles;
export declare function aggrerateStyles<TStyle, TTagStyles extends {
    [key: string]: Partial<TStyle>;
}>(style: TStyle, tagStyles: TTagStyles, tags: Tag[]): TStyle;
//# sourceMappingURL=Style.d.ts.map
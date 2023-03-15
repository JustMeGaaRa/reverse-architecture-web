import { Tag } from "../model/Tag";
import { indent } from "../utils";
import { ElementStyle, toElementStyleString } from "./ElementStyle";
import { RelationshipStyle, toRelationshipStyleString } from "./RelationshipStyle";

export interface Styles {
    element: ElementStyle;
    relationship: RelationshipStyle;
}

export function toStylesString(styles?: Styles): string {
    const elements = indent(toElementStyleString(styles?.element));
    const relationships = indent(toRelationshipStyleString(styles?.relationship));
    return `styles {\n${elements}\n${relationships}\n}`;
}

export function styles(
    element?: ElementStyle[],
    relationship?: RelationshipStyle[],
): Styles {
    return {
        element: element?.reduce((result, current) => ({ ...result, ...current }), {}) ?? {},
        relationship: relationship?.reduce((result, current) => ({ ...result, ...current }), {}) ?? {},
    }
}

export function aggrerateStyles<
    TStyle,
    TTagStyles extends { [key: string]: Partial<TStyle> }
>(
    style: TStyle,
    tagStyles: TTagStyles,
    tags: Tag[]
): TStyle {
    const nextTag = tags.pop();

    if (tagStyles && nextTag) {
        const nextStyle = tagStyles[nextTag.name];

        const appliedStyle: TStyle = {
            ...style,
            ...nextStyle
        }

        return nextStyle
            ? aggrerateStyles(appliedStyle, tagStyles, tags)
            : aggrerateStyles(style, tagStyles, tags);
    }

    return style;
}
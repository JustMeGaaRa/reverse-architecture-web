import { Tag } from "../model/Tag";
import { ElementStyle } from "./ElementStyle";
import { RelationshipStyle } from "./RelationshipStyle";

export interface Styles {
    element: ElementStyle;
    relationship: RelationshipStyle;
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

        const appliedStyle: any = Object.fromEntries(
            Object
                .entries({ ...style, ...nextStyle })
                .map(([key, value]) => [key, value !== undefined ? value : style[key]])
        );

        return nextStyle
            ? aggrerateStyles(appliedStyle, tagStyles, tags)
            : aggrerateStyles(style, tagStyles, tags);
    }

    return style;
}
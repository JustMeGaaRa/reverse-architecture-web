import { Tag } from "../model/Tag";
import { ElementStyle } from "./ElementStyle";
import { RelationshipStyle } from "./RelationshipStyle";

export interface Styles {
    element: ElementStyle;
    relationship: RelationshipStyle;
}

export function styles(
    element?: ElementStyle[],
    relationship?: RelationshipStyle[],
): Styles {
    return {
        element: element?.reduce((result, current) => ({ ...result, ...current }), {}),
        relationship: relationship?.reduce((result, current) => ({ ...result, ...current }), {})
    }
}

export function aggrerateStyles<TStyle, TTagStyles>(style: TStyle, tagStyles: TTagStyles, tags: Tag[]) {
    if (tagStyles && tags?.length > 0) {
        const nextTag = tags.pop();
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
import { Tag } from "../model/Tag";
import { ElementStyle } from "./ElementStyle";
import { RelationshipStyle } from "./RelationshipStyle";

export interface Styles {
    element: ElementStyle;
    relationship: RelationshipStyle;
}

export function foldStyles<
    TStyle,
    TTagStyle extends { [key: string]: Partial<TStyle> }
>(
    style: TStyle,
    tagStyles: TTagStyle,
    tags: Tag[]
): TStyle {
    const applyStyle = (style: TStyle, nextStyle: Partial<TStyle>) => {
        return Object.fromEntries(
            Object
                .entries({ ...style, ...nextStyle })
                .map(([key, value]) => [key, value !== undefined ? value : style[key]])
        ) as TStyle;
    };

    return tags ?
        [...tags]
            .reverse()
            .reduce((state, tag) => tagStyles[tag.name]
                ? applyStyle(state, tagStyles[tag.name])
                : state, style)
        : style;
}
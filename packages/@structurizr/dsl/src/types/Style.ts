import { IElementStyleProperties } from "./ElementStyleProperties";
import { IRelationshipStyleProperties } from "./RelationshipStyleProperties";
import { Tag } from "./Tag";

export type ElementStyleCollection = Array<Style<IElementStyleProperties>>;

export type RelationshipStyleCollection = Array<Style<IRelationshipStyleProperties>>;

export type Style<TProperties> = Partial<TProperties> & { tag: string };

export function foldStyles<
    TStyleProperties,
    TTagStyle extends Style<TStyleProperties>
>(
    style: TStyleProperties,
    tagStyles: TTagStyle[],
    tags: Tag[]
): TStyleProperties {
    const applyStyle = (
        style: TStyleProperties,
        tagStyle: Partial<TStyleProperties>
    ) => {
        return Object.fromEntries(
            Object
                .entries({ ...style, ...tagStyle })
                .map(([key, value]) => [key, value !== undefined ? value : style[key]])
        ) as TStyleProperties;
    };

    return tags ? tags.reduce((state, tag) => {
        const tagStyle = tagStyles.find(x => x.tag === tag.name);
        return applyStyle(state, tagStyle)
    }, style) : style;
}
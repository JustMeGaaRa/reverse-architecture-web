"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggrerateStyles = exports.styles = exports.toStylesString = void 0;
const utils_1 = require("../utils");
const ElementStyle_1 = require("./ElementStyle");
const RelationshipStyle_1 = require("./RelationshipStyle");
function toStylesString(styles) {
    const elements = (0, utils_1.indent)((0, ElementStyle_1.toElementStyleString)(styles?.element));
    const relationships = (0, utils_1.indent)((0, RelationshipStyle_1.toRelationshipStyleString)(styles?.relationship));
    return `styles {\n${elements}\n${relationships}\n}`;
}
exports.toStylesString = toStylesString;
function styles(element, relationship) {
    return {
        element: element?.reduce((result, current) => ({ ...result, ...current }), {}) ?? {},
        relationship: relationship?.reduce((result, current) => ({ ...result, ...current }), {}) ?? {},
    };
}
exports.styles = styles;
function aggrerateStyles(style, tagStyles, tags) {
    const nextTag = tags.pop();
    if (tagStyles && nextTag) {
        const nextStyle = tagStyles[nextTag.name];
        const appliedStyle = {
            ...style,
            ...nextStyle
        };
        return nextStyle
            ? aggrerateStyles(appliedStyle, tagStyles, tags)
            : aggrerateStyles(style, tagStyles, tags);
    }
    return style;
}
exports.aggrerateStyles = aggrerateStyles;
//# sourceMappingURL=Style.js.map
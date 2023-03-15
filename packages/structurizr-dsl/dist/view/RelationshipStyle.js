"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationshipStyle = exports.toRelationshipStyleString = void 0;
const utils_1 = require("../utils");
function toRelationshipStyleString(relationshipStyle) {
    if (!relationshipStyle) {
        return "";
    }
    return Object.keys(relationshipStyle)
        .map(tag => {
        const style = relationshipStyle[tag];
        const properties = Object.keys(style)
            .map(property => (0, utils_1.line)((0, utils_1.indent)(`${property} ${style[property]}`)))
            .join("");
        return `element "${tag}" {\n${properties}\n}`;
    })
        .join("\n");
}
exports.toRelationshipStyleString = toRelationshipStyleString;
function relationshipStyle(tag, style) {
    return {
        [tag]: style
    };
}
exports.relationshipStyle = relationshipStyle;
//# sourceMappingURL=RelationshipStyle.js.map
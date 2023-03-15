"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementStyle = exports.toElementStyleString = void 0;
const utils_1 = require("../utils");
function toElementStyleString(elementStyle) {
    if (!elementStyle) {
        return "";
    }
    return Object.keys(elementStyle)
        .map(tag => {
        const style = elementStyle[tag];
        const properties = Object.keys(style)
            .map(property => (0, utils_1.line)((0, utils_1.indent)(`${property} ${style[property]}`)))
            .join("");
        return `element "${tag}" {\n${properties}\n}`;
    })
        .join("\n");
}
exports.toElementStyleString = toElementStyleString;
function elementStyle(tag, style) {
    return {
        [tag]: style
    };
}
exports.elementStyle = elementStyle;
//# sourceMappingURL=ElementStyle.js.map
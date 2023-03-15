"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.views = exports.toViewsString = void 0;
const Style_1 = require("../view/Style");
const utils_1 = require("../utils");
function toViewsString(views) {
    const styles = (0, utils_1.line)((0, utils_1.indent)((0, Style_1.toStylesString)(views.styles)));
    return `views {\n${styles}\n}`;
}
exports.toViewsString = toViewsString;
function views(systemContexts, containers, components, deployments, styles) {
    return {
        systemContexts: systemContexts ?? [],
        containers: containers ?? [],
        components: components ?? [],
        deployments: deployments ?? [],
        filtered: [],
        dynamics: [],
        custom: [],
        themes: [],
        styles: styles ?? { element: {}, relationship: {} },
    };
}
exports.views = views;
//# sourceMappingURL=Views.js.map
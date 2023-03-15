"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoLayout = void 0;
const AutoLayoutDirection_1 = require("./AutoLayoutDirection");
class AutoLayout {
    constructor() {
        this.direction = AutoLayoutDirection_1.AutoLayoutDirection.TopBotom;
        this.rankSeparation = 300;
        this.nodeSeparation = 300;
    }
    direction;
    rankSeparation;
    nodeSeparation;
}
exports.AutoLayout = AutoLayout;
//# sourceMappingURL=AutoLayout.js.map
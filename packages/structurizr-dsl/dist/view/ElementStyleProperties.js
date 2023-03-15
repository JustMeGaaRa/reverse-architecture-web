"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultElementStyle = void 0;
const LineStyle_1 = require("./LineStyle");
const ShapeType_1 = require("./ShapeType");
exports.defaultElementStyle = {
    background: "#DDDDDD",
    border: LineStyle_1.LineStyle.Solid,
    color: "#000000",
    description: true,
    fontSize: 14,
    height: 200,
    icon: "",
    metadata: false,
    opacity: 100,
    properties: new Map(),
    shape: ShapeType_1.ShapeType.RoundedBox,
    stroke: "#C3C3C3",
    strokeWidth: 1,
    width: 300,
};
//# sourceMappingURL=ElementStyleProperties.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRelationshipStyle = void 0;
const LineStyle_1 = require("./LineStyle");
const RoutingStyle_1 = require("./RoutingStyle");
exports.defaultRelationshipStyle = {
    color: "#898989",
    fontSize: 14,
    opacity: 100,
    position: 1,
    properties: new Map(),
    routing: RoutingStyle_1.RoutingStyle.Direct,
    style: LineStyle_1.LineStyle.Solid,
    thikness: 1,
    width: 1,
};
//# sourceMappingURL=RelationshipStyleProperties.js.map
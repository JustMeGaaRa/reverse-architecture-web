"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureNode = void 0;
const Tag_1 = require("./Tag");
function InfrastructureNode(identifier, name, description, technology, tags) {
    return {
        identifier,
        name,
        description,
        technology,
        tags: [
            Tag_1.Tag.Element,
            Tag_1.Tag.DeploymentNode,
            ...(tags ?? [])
        ]
    };
}
exports.InfrastructureNode = InfrastructureNode;
//# sourceMappingURL=InfrastructureNode.js.map
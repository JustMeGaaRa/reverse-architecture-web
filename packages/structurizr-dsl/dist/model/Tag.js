"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = exports.Tag = void 0;
class Tag {
    constructor(name) {
        this.name = name;
    }
    name;
    static Element = new Tag("Element");
    static Person = new Tag("Person");
    static SoftwareSystem = new Tag("Software System");
    static Container = new Tag("Container");
    static Component = new Tag("Component");
    static DeploymentNode = new Tag("Deployment Node");
    static InfrastructureNode = new Tag("Infrastructure Node");
    static SoftwareSystemInstance = new Tag("Software System Instance");
    static ContainerInstance = new Tag("Container Instance");
    static Relationship = new Tag("Relationship");
}
exports.Tag = Tag;
function tags(...names) {
    return names.map(name => new Tag(name));
}
exports.tags = tags;
//# sourceMappingURL=Tag.js.map
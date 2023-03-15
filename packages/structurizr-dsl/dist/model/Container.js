"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = exports.toContainerArrayString = exports.toContainerString = void 0;
const utils_1 = require("../utils");
const Component_1 = require("./Component");
const Relationship_1 = require("./Relationship");
const Tag_1 = require("./Tag");
function toContainerString(container) {
    const components = (0, utils_1.indent)((0, Component_1.toComponentArrayString)(container.components ?? []));
    const rels = (0, utils_1.indent)((0, Relationship_1.toRelationshipArrayString)(container.relationships ?? []));
    return container
        ? `${container.identifier} = container "${container.name}" "${container.description ?? ""}" {\n${components}\n${rels}\n}`
        : "";
}
exports.toContainerString = toContainerString;
function toContainerArrayString(containers) {
    return containers.map(toContainerString).join("\n");
}
exports.toContainerArrayString = toContainerArrayString;
function container(identifier, name, description, technology, components, tags) {
    return {
        identifier,
        name,
        description,
        technology: technology ?? [],
        components: components ?? [],
        groups: [],
        relationships: [],
        tags: [
            Tag_1.Tag.Element,
            Tag_1.Tag.Container,
            ...(tags ?? [])
        ]
    };
}
exports.container = container;
//# sourceMappingURL=Container.js.map
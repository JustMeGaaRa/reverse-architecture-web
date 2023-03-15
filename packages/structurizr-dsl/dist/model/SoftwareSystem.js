"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softwareSystem = exports.toSoftwareSystemArrayString = exports.toSoftwareSystemString = void 0;
const Container_1 = require("./Container");
const Relationship_1 = require("./Relationship");
const Tag_1 = require("./Tag");
const utils_1 = require("../utils");
function toSoftwareSystemString(software) {
    const containers = (0, utils_1.indent)((0, Container_1.toContainerArrayString)(software.containers ?? []));
    const rels = (0, utils_1.indent)((0, Relationship_1.toRelationshipArrayString)(software.relationships ?? []));
    return software
        ? `${software.identifier} = softwareSystem "${software.name}" "${software.description ?? ""}" {\n${containers}\n${rels}\n}`
        : "";
}
exports.toSoftwareSystemString = toSoftwareSystemString;
function toSoftwareSystemArrayString(softwareSystems) {
    return softwareSystems.map(toSoftwareSystemString).join("\n");
}
exports.toSoftwareSystemArrayString = toSoftwareSystemArrayString;
function softwareSystem(identifier, name, description, containers, tags) {
    return {
        identifier,
        name,
        description,
        containers: containers ?? [],
        groups: [],
        technology: [],
        tags: [
            Tag_1.Tag.Element,
            Tag_1.Tag.SoftwareSystem,
            ...(tags ?? [])
        ]
    };
}
exports.softwareSystem = softwareSystem;
//# sourceMappingURL=SoftwareSystem.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.component = exports.toComponentArrayString = exports.toComponentString = void 0;
const Tag_1 = require("./Tag");
function toComponentString(component) {
    return component
        ? `${component.identifier} = component "${component.name}" "${component.description ?? ""}"`
        : "";
}
exports.toComponentString = toComponentString;
function toComponentArrayString(components) {
    return components.map(toComponentString).join("\n");
}
exports.toComponentArrayString = toComponentArrayString;
function component(identifier, name, description, technology, tags) {
    return {
        identifier,
        name,
        description,
        technology: technology ?? [],
        relationships: [],
        tags: [
            Tag_1.Tag.Element,
            Tag_1.Tag.Component,
            ...(tags ?? [])
        ]
    };
}
exports.component = component;
//# sourceMappingURL=Component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.person = exports.toPersonArrayString = exports.toPersonString = void 0;
const utils_1 = require("../utils");
const Relationship_1 = require("./Relationship");
const Tag_1 = require("./Tag");
function toPersonString(person) {
    const rels = (0, utils_1.indent)((0, Relationship_1.toRelationshipArrayString)(person.relationships ?? []));
    return `${person.identifier} = person "${person.name}" "${person.description ?? ""}" {\n${rels}\n}`;
}
exports.toPersonString = toPersonString;
function toPersonArrayString(persons) {
    return persons.map(toPersonString).join("\n");
}
exports.toPersonArrayString = toPersonArrayString;
function person(identifier, name, description, tags) {
    return {
        identifier,
        name,
        description,
        tags: [
            Tag_1.Tag.Element,
            Tag_1.Tag.Person,
            ...(tags ?? [])
        ]
    };
}
exports.person = person;
//# sourceMappingURL=Person.js.map
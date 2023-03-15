"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationship = exports.toRelationshipArrayString = exports.toRelationshipString = void 0;
const Tag_1 = require("./Tag");
function toRelationshipString(relationship) {
    return `${relationship.sourceIdentifier} -> ${relationship.targetIdentifier} "${relationship.description ?? ""}"`;
}
exports.toRelationshipString = toRelationshipString;
function toRelationshipArrayString(relationships) {
    return relationships.map(toRelationshipString).join("\n");
}
exports.toRelationshipArrayString = toRelationshipArrayString;
function relationship(sourceIdentifier, targetIdentifier, description, technology, tags) {
    return {
        sourceIdentifier,
        targetIdentifier,
        description,
        technology,
        tags: [
            Tag_1.Tag.Relationship,
            ...(tags ?? [])
        ]
    };
}
exports.relationship = relationship;
//# sourceMappingURL=Relationship.js.map
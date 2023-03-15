"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterprise = exports.toEnterpriseString = void 0;
const Relationship_1 = require("./Relationship");
const SoftwareSystem_1 = require("./SoftwareSystem");
const Person_1 = require("./Person");
function toEnterpriseString(enterprise) {
    return enterprise ? `enterprise "${enterprise.name}" {
        ${enterprise.people.map(Person_1.toPersonString).join("\n")}
        ${enterprise.softwareSystems.map(SoftwareSystem_1.toSoftwareSystemString).join("\n")}
        ${enterprise.relationships.map(Relationship_1.toRelationshipString).join("\n")}
    }` : "";
}
exports.toEnterpriseString = toEnterpriseString;
function enterprise(name, people, softwareSystems) {
    return {
        name,
        people: people ?? [],
        softwareSystems: softwareSystems ?? [],
        groups: [],
        relationships: []
    };
}
exports.enterprise = enterprise;
//# sourceMappingURL=Enterprise.js.map
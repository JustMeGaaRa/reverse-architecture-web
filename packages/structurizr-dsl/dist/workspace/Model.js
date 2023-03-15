"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = exports.toModelString = void 0;
const Relationship_1 = require("../model/Relationship");
const DeploymentEnvironment_1 = require("../model/DeploymentEnvironment");
const SoftwareSystem_1 = require("../model/SoftwareSystem");
const Person_1 = require("../model/Person");
const Enterprise_1 = require("../model/Enterprise");
const utils_1 = require("../utils");
function toModelString(model) {
    const enterprise = (0, utils_1.indent)((0, Enterprise_1.toEnterpriseString)(model.enterprise));
    const people = (0, utils_1.indent)((0, Person_1.toPersonArrayString)(model.people ?? []));
    const softwareSystems = (0, utils_1.indent)((0, SoftwareSystem_1.toSoftwareSystemArrayString)(model.softwareSystems ?? []));
    const environments = (0, utils_1.indent)((0, DeploymentEnvironment_1.toDeploymentEnvironmentArrayString)(model.deploymentEnvironments ?? []));
    const relationships = (0, utils_1.indent)((0, Relationship_1.toRelationshipArrayString)(model.relationships ?? []));
    return `model {\n${enterprise}\n${people}\n${softwareSystems}\n${environments}\n${relationships}\n}`;
}
exports.toModelString = toModelString;
function model(people, softwareSystems, deploymentEnvironments, relationships, enterprise, groups, elements) {
    return {
        people: people ?? [],
        softwareSystems: softwareSystems ?? [],
        deploymentEnvironments: deploymentEnvironments ?? [],
        relationships: relationships ?? [],
        enterprise,
        groups: groups ?? [],
        elements: elements ?? []
    };
}
exports.model = model;
//# sourceMappingURL=Model.js.map
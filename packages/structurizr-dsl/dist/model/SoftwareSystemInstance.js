"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softwareSystemInstance = exports.toSoftwareSystemInstanceArrayString = exports.toSoftwareSystemInstanceString = void 0;
const Tag_1 = require("./Tag");
function toSoftwareSystemInstanceString(instance) {
    return `${instance.identifier} = softwareSystemInstance "${instance.softwareSystemIdentifier}"`;
}
exports.toSoftwareSystemInstanceString = toSoftwareSystemInstanceString;
function toSoftwareSystemInstanceArrayString(instances) {
    return instances.map(toSoftwareSystemInstanceString).join("\n");
}
exports.toSoftwareSystemInstanceArrayString = toSoftwareSystemInstanceArrayString;
function softwareSystemInstance(softwareSystemIdentifier, identifier, deploymentGroups, tags) {
    return {
        identifier,
        softwareSystemIdentifier,
        deploymentGroups,
        tags: [
            Tag_1.Tag.Element,
            Tag_1.Tag.SoftwareSystem,
            Tag_1.Tag.SoftwareSystemInstance,
            ...(tags ?? [])
        ]
    };
}
exports.softwareSystemInstance = softwareSystemInstance;
//# sourceMappingURL=SoftwareSystemInstance.js.map
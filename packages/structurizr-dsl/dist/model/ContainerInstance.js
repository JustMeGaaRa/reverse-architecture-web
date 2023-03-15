"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerInstance = exports.toContainerInstanceArrayString = exports.toContainerInstanceString = void 0;
const Tag_1 = require("./Tag");
function toContainerInstanceString(instance) {
    return `${instance.identifier} = containerInstance "${instance.containerIdentifier}"`;
}
exports.toContainerInstanceString = toContainerInstanceString;
function toContainerInstanceArrayString(instances) {
    return instances.map(toContainerInstanceString).join("\n");
}
exports.toContainerInstanceArrayString = toContainerInstanceArrayString;
function containerInstance(containerIdentifier, identifier, deploymentGroups, tags) {
    return {
        identifier,
        containerIdentifier,
        deploymentGroups,
        tags: [
            Tag_1.Tag.Element,
            Tag_1.Tag.Container,
            Tag_1.Tag.ContainerInstance,
            ...(tags ?? [])
        ]
    };
}
exports.containerInstance = containerInstance;
//# sourceMappingURL=ContainerInstance.js.map
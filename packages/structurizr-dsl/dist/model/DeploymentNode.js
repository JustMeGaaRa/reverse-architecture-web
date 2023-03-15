"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploymentNode = exports.toDeploymentNodeArrayString = exports.toDeploymentNodeString = void 0;
const utils_1 = require("../utils");
const ContainerInstance_1 = require("./ContainerInstance");
const SoftwareSystemInstance_1 = require("./SoftwareSystemInstance");
const Tag_1 = require("./Tag");
function toDeploymentNodeString(deploymentNode) {
    const deploymentNodes = (0, utils_1.indent)(toDeploymentNodeArrayString(deploymentNode.deploymentNodes ?? []));
    const systems = (0, utils_1.indent)((0, SoftwareSystemInstance_1.toSoftwareSystemInstanceArrayString)(deploymentNode.softwareSystemInstances ?? []));
    const containers = (0, utils_1.indent)((0, ContainerInstance_1.toContainerInstanceArrayString)(deploymentNode.containerInstances ?? []));
    return deploymentNode
        ? `deploymentNode "${deploymentNode.name}" {\n${deploymentNodes}\n${systems}\n${containers}\n}`
        : "";
}
exports.toDeploymentNodeString = toDeploymentNodeString;
function toDeploymentNodeArrayString(deploymentNodes) {
    return deploymentNodes.map(toDeploymentNodeString).join("\n");
}
exports.toDeploymentNodeArrayString = toDeploymentNodeArrayString;
function deploymentNode(identifier, name, description, technology, instances, tags, deploymentNodes, softwareSystemInstances, containerInstances) {
    return {
        identifier,
        name,
        description,
        technology,
        instances,
        tags: [
            Tag_1.Tag.Element,
            Tag_1.Tag.DeploymentNode,
            ...(tags ?? [])
        ],
        deploymentNodes,
        softwareSystemInstances,
        containerInstances
    };
}
exports.deploymentNode = deploymentNode;
//# sourceMappingURL=DeploymentNode.js.map
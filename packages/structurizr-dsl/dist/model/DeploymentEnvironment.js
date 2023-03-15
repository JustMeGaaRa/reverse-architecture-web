"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploymentEnvironment = exports.toDeploymentEnvironmentArrayString = exports.toDeploymentEnvironmentString = void 0;
const utils_1 = require("../utils");
const DeploymentNode_1 = require("./DeploymentNode");
function toDeploymentEnvironmentString(environment) {
    const deploymentNodes = (0, utils_1.indent)((0, DeploymentNode_1.toDeploymentNodeArrayString)(environment.deploymentNodes ?? []));
    return environment
        ? `deploymentEnvironment "${environment.name}" {\n${deploymentNodes}\n}`
        : "";
}
exports.toDeploymentEnvironmentString = toDeploymentEnvironmentString;
function toDeploymentEnvironmentArrayString(environments) {
    return environments.map(toDeploymentEnvironmentString).join("\n");
}
exports.toDeploymentEnvironmentArrayString = toDeploymentEnvironmentArrayString;
function deploymentEnvironment(identifier, name, deploymentNodes) {
    return {
        identifier,
        name,
        deploymentNodes,
        deploymentGroups: [],
        relationships: []
    };
}
exports.deploymentEnvironment = deploymentEnvironment;
//# sourceMappingURL=DeploymentEnvironment.js.map
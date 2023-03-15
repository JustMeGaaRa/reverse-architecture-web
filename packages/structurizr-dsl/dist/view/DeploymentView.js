"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploymentView = void 0;
function deploymentView(softwareSystemIdentifier, environment, key, title, layout, description, deploymentNodes) {
    return {
        softwareSystemIdentifier,
        environment,
        key,
        layout,
        title,
        description,
        deploymentNodes: deploymentNodes ?? [],
    };
}
exports.deploymentView = deploymentView;
//# sourceMappingURL=DeploymentView.js.map
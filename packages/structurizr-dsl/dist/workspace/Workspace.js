"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findComponent = exports.findContainer = exports.findSoftwareSystem = exports.workspace = exports.toWorkspaceString = void 0;
const Model_1 = require("./Model");
const Views_1 = require("./Views");
const utils_1 = require("../utils");
function toWorkspaceString(workspace) {
    const model = (0, utils_1.indent)((0, Model_1.toModelString)(workspace.model));
    const views = (0, utils_1.indent)((0, Views_1.toViewsString)(workspace.views));
    return `workspace "${workspace.name}" "${workspace.description}" {\n${model}\n${views}\n}`;
}
exports.toWorkspaceString = toWorkspaceString;
function workspace(name, description, model, views) {
    return {
        name,
        description,
        lastModifiedData: new Date(),
        model,
        views
    };
}
exports.workspace = workspace;
const findSoftwareSystem = (workspace, identifier) => {
    return workspace.model.softwareSystems
        .find(x => x.identifier === identifier);
};
exports.findSoftwareSystem = findSoftwareSystem;
const findContainer = (workspace, identifier) => {
    return workspace.model.softwareSystems
        .flatMap(x => x.containers)
        .find(x => x.identifier === identifier);
};
exports.findContainer = findContainer;
const findComponent = (workspace, identifier) => {
    return workspace.model.softwareSystems
        .flatMap(x => x.containers)
        .flatMap(x => x.components)
        .find(x => x.identifier === identifier);
};
exports.findComponent = findComponent;
//# sourceMappingURL=Workspace.js.map
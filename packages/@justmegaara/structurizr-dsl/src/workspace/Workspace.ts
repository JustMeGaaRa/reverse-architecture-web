import { Identifier } from "../model/Identifier";
import { Properties } from "../model/Properties";
import { Model, toModelString } from "./Model";
import { toViewsString, Views } from "./Views";
import { indent } from "../utils";

export interface Workspace {
    name?: string;
    description?: string;
    lastModifiedData?: Date;
    properties?: Properties;
    model: Model;
    views: Views;
}

export function toWorkspaceString(workspace: Workspace): string {
    const model = indent(toModelString(workspace.model));
    const views = indent(toViewsString(workspace.views));
    return `workspace "${workspace.name}" "${workspace.description}" {\n${model}\n${views}\n}`;
}

export function workspace(
    name: string,
    description: string,
    model: Model,
    views: Views,
): Workspace {
    return {
        name,
        description,
        lastModifiedData: new Date(),
        model,
        views
    }
}

export const findSoftwareSystem = (workspace: Workspace, identifier: Identifier) => {
    return workspace.model.softwareSystems
        .find(x => x.identifier === identifier);
}

export const findContainer = (workspace: Workspace, identifier: Identifier) => {
    return workspace.model.softwareSystems
        .flatMap(x => x.containers)
        .find(x => x.identifier === identifier);
}

export const findComponent = (workspace: Workspace, identifier: Identifier) => {
    return workspace.model.softwareSystems
        .flatMap(x => x.containers)
        .flatMap(x => x.components)
        .find(x => x.identifier === identifier);
}
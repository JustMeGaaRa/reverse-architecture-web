import { Model } from "./Model";
import { Identifier } from "./model/Identifier";
import { Properties } from "./model/Properties";
import { Views } from "./Views";

export class Workspace {
    name?: string;
    description?: string;
    lastModifiedData?: Date;
    properties?: Properties;
    model: Model;
    views: Views;
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
    return workspace?.model.softwareSystems
        .find(x => x.identifier === identifier);
}

export const findContainer = (workspace: Workspace, identifier: Identifier) => {
    return workspace.model.softwareSystems
        .flatMap(x => x.containers ?? [])
        .find(x => x.identifier === identifier);
}

export const findComponent = (workspace: Workspace, identifier: Identifier) => {
    return workspace.model.softwareSystems
        .flatMap(x => x.containers ?? [])
        .flatMap(x => x.components ?? [])
        .find(x => x.identifier === identifier);
}
import { Properties } from "./model/Properties";
import { Model, toModelString } from "./Model";
import { toViewsString, Views } from "./Views";
import { indent } from "../utils/Formatting";

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
        model: model ?? {
            people: [],
            softwareSystems: [],
            deploymentEnvironments: [],
            groups: [],
            relationships: []
        },
        views: views ?? {
            systemContexts: [],
            containers: [],
            components: [],
            dynamics: [],
            deployments: [],
            filtered: [],
            custom: [],
            themes: [],
            styles: {
                element: {},
                relationship: {}
            }
        }
    }
}
import { IWorkspaceSnapshot, ViewDefinition, ViewType } from "@structurizr/dsl";
import { ISupportPath } from "./ISuppportPath";

export class SystemLandscapePathProvider implements ISupportPath {
    getPath(workspace: IWorkspaceSnapshot, view: ViewDefinition): Array<ViewDefinition> {
        return [{
            type: ViewType.SystemLandscape,
            identifier: workspace.name,
            title: ViewType.SystemLandscape,
            elements: [],
            relationships: []
        }];
    }
}
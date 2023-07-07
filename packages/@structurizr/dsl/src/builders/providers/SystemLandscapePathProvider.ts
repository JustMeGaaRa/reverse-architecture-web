import { ISupportPath, IViewDefinition, ViewType, Workspace } from "../..";

export class SystemLandscapePathProvider implements ISupportPath {
    getPath(workspace: Workspace, view: IViewDefinition): Array<IViewDefinition> {
        return [{
            type: ViewType.SystemLandscape,
            identifier: workspace.name,
            title: workspace.name,
            elements: [],
            relationships: []
        }];
    }
}
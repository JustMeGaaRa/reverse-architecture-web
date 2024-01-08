import { ISupportPath, IViewDefinition, IWorkspace, ViewType, Workspace } from "../..";

export class SystemLandscapePathProvider implements ISupportPath {
    getPath(workspace: IWorkspace, view: IViewDefinition): Array<IViewDefinition> {
        return [{
            type: ViewType.SystemLandscape,
            identifier: workspace.name,
            title: ViewType.SystemLandscape,
            elements: [],
            relationships: []
        }];
    }
}
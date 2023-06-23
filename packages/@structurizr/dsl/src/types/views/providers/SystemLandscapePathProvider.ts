import { ISupportPath, IView, ViewType, Workspace } from "../../../";

export class SystemLandscapePathProvider implements ISupportPath {
    getPath(workspace: Workspace, view: IView): Array<IView> {
        return [{
            type: ViewType.SystemLandscape,
            identifier: workspace.name,
            title: workspace.name,
            elements: [],
            relationships: []
        }];
    }
}
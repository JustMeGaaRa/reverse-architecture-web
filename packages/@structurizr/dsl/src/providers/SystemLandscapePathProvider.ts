import { ISupportPath } from "../shared/ISupportPath";
import { IView } from "../shared/IView";
import { ViewType } from "../types/views/ViewType";
import { Workspace } from "../types/Workspace";

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
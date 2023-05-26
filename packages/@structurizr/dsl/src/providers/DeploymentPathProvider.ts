import { ISupportPath } from "../shared/ISupportPath";
import { IView } from "../shared/IView";
import { ViewType } from "../types/views/ViewType";
import { Workspace } from "../types/Workspace";

export class DeploymentPathProvider implements ISupportPath {
    getPath(workspace: Workspace, view: IView): Array<IView> {
        for (let softwareSystem of workspace.model.softwareSystems) {
            if (softwareSystem.identifier === view.identifier) {
                return [
                    {
                        type: ViewType.Deployment,
                        identifier: softwareSystem.identifier,
                        title: softwareSystem.name,
                        elements: [],
                        relationships: []
                    }
                ];
            }
        }

        return [];
    }
}
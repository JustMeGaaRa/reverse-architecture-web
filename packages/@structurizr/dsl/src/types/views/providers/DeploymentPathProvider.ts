import { ISupportPath, IView, ViewType, Workspace } from "../../../";

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
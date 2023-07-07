import { ISupportPath, IViewDefinition, ViewType, Workspace } from "../..";

export class DeploymentPathProvider implements ISupportPath {
    getPath(workspace: Workspace, view: IViewDefinition): Array<IViewDefinition> {
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
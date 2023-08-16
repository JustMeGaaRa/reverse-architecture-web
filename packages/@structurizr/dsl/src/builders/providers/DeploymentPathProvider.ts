import { ISupportPath, IViewDefinition, IWorkspace, ViewType, Workspace } from "../..";

export class DeploymentPathProvider implements ISupportPath {
    getPath(workspace: IWorkspace, view: IViewDefinition): Array<IViewDefinition> {
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
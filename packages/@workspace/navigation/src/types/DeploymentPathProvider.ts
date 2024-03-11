import { IViewDefinition, IWorkspaceSnapshot, ViewType } from "@structurizr/dsl";
import { ISupportPath } from "./ISuppportPath";

export class DeploymentPathProvider implements ISupportPath {
    getPath(workspace: IWorkspaceSnapshot, view: IViewDefinition): Array<IViewDefinition> {
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
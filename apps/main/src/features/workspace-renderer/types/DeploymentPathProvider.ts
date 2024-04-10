import { IViewDefinition, IWorkspaceSnapshot, ViewDefinition, ViewType } from "@structurizr/dsl";
import { ISupportPath } from "./ISuppportPath";

export class DeploymentPathProvider implements ISupportPath {
    getPath(workspace: IWorkspaceSnapshot, view: ViewDefinition): Array<ViewDefinition> {
        for (let softwareSystem of workspace.model.softwareSystems) {
            if (softwareSystem.identifier === view.identifier) {
                return [
                    {
                        type: ViewType.Deployment,
                        identifier: softwareSystem.identifier,
                        title: softwareSystem.name,
                        softwareSystemIdentifier: softwareSystem.identifier,
                        environment: view["environment"],
                        elements: [],
                        relationships: []
                    }
                ];
            }
        }

        return [];
    }
}
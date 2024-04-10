import { IWorkspaceSnapshot, ViewDefinition, ViewType } from "@structurizr/dsl";
import { ISupportPath } from "./ISuppportPath";

export class SystemContextPathProvider implements ISupportPath {
    getPath(workspace: IWorkspaceSnapshot, view: ViewDefinition): Array<ViewDefinition> {
        const softwareSystems = workspace.model.groups
            .flatMap(group => group.softwareSystems)
            .concat(workspace.model.softwareSystems);

        for (let softwareSystem of softwareSystems) {
            if (softwareSystem.identifier === view.identifier) {
                return [
                    {
                        type: ViewType.SystemLandscape,
                        identifier: workspace.name,
                        title: ViewType.SystemLandscape,
                        elements: [],
                        relationships: []
                    },
                    {
                        type: ViewType.SystemContext,
                        identifier: softwareSystem.identifier,
                        title: softwareSystem.name,
                        softwareSystemIdentifier: softwareSystem.identifier,
                        elements: [],
                        relationships: []
                    }
                ];
            }
        }

        return [];
    }
}
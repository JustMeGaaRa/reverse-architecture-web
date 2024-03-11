import { IViewDefinition, IWorkspaceSnapshot, ViewType } from "@structurizr/dsl";
import { ISupportPath } from "./ISuppportPath";

export class ContainerPathProvider implements ISupportPath {
    getPath(workspace: IWorkspaceSnapshot, view: IViewDefinition): Array<IViewDefinition> {
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
                        elements: [],
                        relationships: []
                    },
                    {
                        type: ViewType.Container,
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
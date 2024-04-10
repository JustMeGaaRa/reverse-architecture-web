import { IWorkspaceSnapshot, ViewDefinition, ViewType } from "@structurizr/dsl";
import { ISupportPath } from "./ISuppportPath";

export class ComponentPathProvider implements ISupportPath {
    getPath(workspace: IWorkspaceSnapshot, view: ViewDefinition): Array<ViewDefinition> {
        const softwareSystems = workspace.model.groups
            .flatMap(group => group.softwareSystems)
            .concat(workspace.model.softwareSystems);

        for (let softwareSystem of softwareSystems) {
            const containers = softwareSystem.groups
                .flatMap(group => group.containers)
                .concat(softwareSystem.containers)

            for (let container of containers) {
                if (container.identifier === view.identifier) {
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
                        },
                        {
                            type: ViewType.Container,
                            identifier: softwareSystem.identifier,
                            title: softwareSystem.name,
                            softwareSystemIdentifier: softwareSystem.identifier,
                            elements: [],
                            relationships: []
                        },
                        {
                            type: ViewType.Component,
                            identifier: container.identifier,
                            title: container.name,
                            containerIdentifier: container.identifier,
                            elements: [],
                            relationships: []
                        }
                    ]
                }
            }

        }

        return [];
    }
}
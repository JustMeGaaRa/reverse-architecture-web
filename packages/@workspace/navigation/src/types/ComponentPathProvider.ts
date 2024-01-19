import { IViewDefinition, IWorkspace, ViewType } from "@structurizr/dsl";
import { ISupportPath } from "./ISuppportPath";

export class ComponentPathProvider implements ISupportPath {
    getPath(workspace: IWorkspace, view: IViewDefinition): Array<IViewDefinition> {
        const softwareSystems = workspace.model.groups
            .flatMap(group => group.softwareSystems)
            .concat(workspace.model.softwareSystems);

        for (let softwareSystem of softwareSystems) {
            const container = softwareSystem.groups
                .flatMap(group => group.containers)
                .concat(softwareSystem.containers)
                .find(container => container.identifier === view.identifier);

            if (container) {
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
                    },
                    {
                        type: ViewType.Component,
                        identifier: container.identifier,
                        title: container.name,
                        elements: [],
                        relationships: []
                    }
                ]
            }
        }

        return [];
    }
}
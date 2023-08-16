import { ISupportPath, IViewDefinition, IWorkspace, ViewType, Workspace } from "../..";

export class SystemContextPathProvider implements ISupportPath {
    getPath(workspace: IWorkspace, view: IViewDefinition): Array<IViewDefinition> {
        const softwareSystems = workspace.model.groups
            .flatMap(group => group.softwareSystems)
            .concat(workspace.model.softwareSystems);

        for (let softwareSystem of softwareSystems) {
            if (softwareSystem.identifier === view.identifier) {
                return [
                    {
                        type: ViewType.SystemContext,
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
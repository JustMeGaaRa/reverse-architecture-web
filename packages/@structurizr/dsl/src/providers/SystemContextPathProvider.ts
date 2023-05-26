import { ISupportPath } from "../shared/ISupportPath";
import { IView } from "../shared/IView";
import { ViewType } from "../types/views/ViewType";
import { Workspace } from "../types/Workspace";

export class SystemContextPathProvider implements ISupportPath {
    getPath(workspace: Workspace, view: IView): Array<IView> {
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
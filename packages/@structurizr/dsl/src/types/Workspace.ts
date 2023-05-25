import { Properties } from "./model/Properties";
import { Model } from "./Model";
import { Views } from "./Views";
import { IWorkspaceMetadata } from "../shared/IWorkspaceMetadata";
import { SystemContextView } from "./views/SystemContextView";
import { ContainerView } from "./views/ContainerView";
import { ComponentView } from "./views/ComponentView";
import { DeploymentView } from "./views/DeploymentView";
import { Identifier } from "./model/Identifier";

type WorkspaceParams = 
    Required<Pick<Workspace, "name" | "description">>
    & Partial<Omit<Workspace, "name" | "description">>;

export class Workspace {
    constructor(
        params: WorkspaceParams
    ) {
        this.name = params.name;
        this.description = params.description;
        this.lastModifiedDate = params.lastModifiedDate ?? new Date();
        this.properties = params.properties;
        this.model = new Model({});
        this.views = new Views({});
    }

    public readonly name?: string;
    public readonly description?: string;
    public readonly lastModifiedDate?: Date;
    public readonly properties?: Properties;
    public readonly model: Model;
    public readonly views: Views;

    public static Empty = new Workspace({
        name: "Empty Workspace",
        description: "An empty workspace."
    });

    public static applyMetadata(workspace: Workspace, metadata: IWorkspaceMetadata): Workspace {
        return {
            ...workspace,
            views: {
                ...workspace.views,
                systemLandscape: workspace.views.systemLandscape && {
                    ...workspace.views.systemLandscape,
                    elements: metadata.views.systemLandscape?.elements ?? []
                },
                systemContexts: workspace.views.systemContexts.map((view: SystemContextView) => ({
                    ...view,
                    elements: metadata.views.systemContexts
                        .find(x => x.identifier === view.identifier)?.elements ?? []
                })),
                containers: workspace.views.containers.map((view: ContainerView) => ({
                    ...view,
                    elements: metadata.views.containers
                        .find(x => x.identifier === view.identifier)?.elements ?? []
                })),
                components: workspace.views.components.map((view: ComponentView) => ({
                    ...view,
                    elements: metadata.views.components
                        .find(x => x.identifier === view.identifier)?.elements ?? []
                })),
                deployments: workspace.views.deployments.map((view: DeploymentView) => ({
                    ...view,
                    elements: metadata.views.deployments
                        .find(x => x.identifier === view.identifier)?.elements ?? []
                }))
            }
        };
    }
}

export const findSoftwareSystem = (workspace: Workspace, identifier: Identifier) => {
    return workspace?.model.softwareSystems
        .concat(workspace?.model.groups.flatMap(x => x.softwareSystems))
        .find(x => x.identifier === identifier);
}

export const findContainer = (workspace: Workspace, identifier: Identifier) => {
    return workspace?.model.softwareSystems
        .flatMap(x => x.containers)
        .concat(workspace?.model.groups
            .flatMap(x => x.softwareSystems)
            .flatMap(x => x.containers))
        .find(x => x.identifier === identifier);
}

export const relationshipExists = (
    workspace: Workspace,
    sourceIdentifier: Identifier,
    targetIdentifier: Identifier
) => {
    return workspace?.model.relationships.some(x => 
        x.sourceIdentifier === sourceIdentifier && x.targetIdentifier === targetIdentifier
        || x.sourceIdentifier === targetIdentifier && x.targetIdentifier === sourceIdentifier
    )
}
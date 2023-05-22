import { Properties } from "./model/Properties";
import { Model, toModelString } from "./Model";
import { toViewsString, Views } from "./Views";
import { indent } from "../utils/Formatting";
import { IWorkspaceMetadata } from "../shared/IWorkspaceMetadata";
import { SystemContextView } from "./views/SystemContextView";
import { ContainerView } from "./views/ContainerView";
import { ComponentView } from "./views/ComponentView";
import { DeploymentView } from "./views/DeploymentView";

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

export function toWorkspaceString(workspace: Workspace): string {
    const model = indent(toModelString(workspace.model));
    const views = indent(toViewsString(workspace.views));
    return `workspace "${workspace.name}" "${workspace.description}" {\n${model}\n${views}\n}`;
}
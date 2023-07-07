import { Properties } from "./model/Properties";
import { ComponentViewDefinition } from "./views/ComponentViewDefinition";
import { ContainerViewDefinition } from "./views/ContainerViewDefinition";
import { Configuration } from "./views/Configuration";
import { DeploymentViewDefinition } from "./views/DeploymentViewDefinition";
import { SystemContextViewDefinition } from "./views/SystemContextViewDefinition";
import { SystemLandscapeViewDefinition } from "./views/SystemLandscapeViewDefinition";
import { IViewDefinition } from "./views/IViewDefinition";

export class Views {
    constructor(
        params: Partial<Views>
    ) {
        this.systemLandscape = params.systemLandscape;
        this.systemContexts = params.systemContexts ?? [];
        this.containers = params.containers ?? [];
        this.components = params.components ?? [];
        this.deployments = params.deployments ?? [];
        this.filtered = params.filtered ?? [];
        this.dynamics = params.dynamics ?? [];
        this.custom = params.custom ?? [];
        this.configuration = params.configuration ?? new Configuration({});
        this.properties = params.properties ?? new Map<string, string>();
    }

    public readonly systemLandscape?: SystemLandscapeViewDefinition;
    public readonly systemContexts: SystemContextViewDefinition[];
    public readonly containers: ContainerViewDefinition[];
    public readonly components: ComponentViewDefinition[];
    public readonly filtered: IViewDefinition[];
    public readonly dynamics: IViewDefinition[];
    public readonly deployments: DeploymentViewDefinition[];
    public readonly custom: IViewDefinition[];
    public readonly configuration: Configuration;
    public readonly properties?: Properties;
}
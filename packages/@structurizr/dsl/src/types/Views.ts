import { ISupportSnapshot, IViews } from "../interfaces";
import { ComponentViewDefinition } from "./ComponentViewDefinition";
import { Configuration } from "./Configuration";
import { ContainerViewDefinition } from "./ContainerViewDefinition";
import { DeploymentViewDefinition } from "./DeploymentViewDefinition";
import { Properties } from "./Properties";
import { SystemContextViewDefinition } from "./SystemContextViewDefinition";
import { SystemLandscapeViewDefinition } from "./SystemLandscapeViewDefinition";

export class Views implements ISupportSnapshot<IViews> {
    constructor(params: IViews) {
        this.systemLandscape = params.systemLandscape
            ? new SystemLandscapeViewDefinition(params.systemLandscape)
            : new SystemLandscapeViewDefinition({ });
        this.systemContexts = params.systemContexts
            ? params.systemContexts.map(s => new SystemContextViewDefinition(s))
            : [];
        this.containers = params.containers
            ? params.containers.map(c => new ContainerViewDefinition(c))
            : [];
        this.components = params.components
            ? params.components.map(c => new ComponentViewDefinition(c))
            : [];
        this.deployments = params.deployments
            ? params.deployments.map(d => new DeploymentViewDefinition(d))
            : [];
        // this.filtered = params.filtered ?? [];
        // this.dynamics = params.dynamics ?? [];
        // this.custom = params.custom ?? [];
        this.configuration = params.configuration
            ? new Configuration(params.configuration)
            : undefined;
        // this.properties = params.properties;
    }

    public readonly systemLandscape?: SystemLandscapeViewDefinition;
    public readonly systemContexts: SystemContextViewDefinition[];
    public readonly containers: ContainerViewDefinition[];
    public readonly components: ComponentViewDefinition[];
    // public readonly filtered: IViewDefinition[];
    // public readonly dynamics: IViewDefinition[];
    public readonly deployments: DeploymentViewDefinition[];
    // public readonly custom: IViewDefinition[];
    public readonly configuration: Configuration;
    public readonly properties?: Properties;

    public toSnapshot(): IViews {
        return {
            systemLandscape: this.systemLandscape?.toSnapshot(),
            systemContexts: this.systemContexts.map(s => s.toSnapshot()),
            containers: this.containers.map(c => c.toSnapshot()),
            components: this.components.map(c => c.toSnapshot()),
            deployments: this.deployments.map(d => d.toSnapshot()),
            // filtered: this.filtered,
            // dynamics: this.dynamics,
            // custom: this.custom,
            configuration: this.configuration.toSnapshot(),
            // properties: this.properties
        }
    }
}
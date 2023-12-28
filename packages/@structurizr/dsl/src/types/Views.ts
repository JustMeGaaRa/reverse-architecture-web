import {
    ComponentViewDefinition,
    Configuration,
    ContainerViewDefinition,
    DeploymentViewDefinition,
    IComponentView,
    IConfiguration,
    IContainerView,
    IDeploymentView,
    ISupportImmutable,
    ISystemContextView,
    ISystemLandscapeView,
    IViewDefinition,
    Properties,
    SystemContextViewDefinition,
    SystemLandscapeViewDefinition,
    ViewType
} from "..";

export interface IViews {
    systemLandscape?: ISystemLandscapeView;
    systemContexts: ISystemContextView[];
    containers: IContainerView[];
    components: IComponentView[];
    filtered: IViewDefinition[];
    dynamics: IViewDefinition[];
    deployments: IDeploymentView[];
    custom: IViewDefinition[];
    configuration: IConfiguration;
    properties?: Properties;
}

export class Views implements ISupportImmutable<IViews> {
    constructor(params: IViews) {
        this.systemLandscape = params.systemLandscape
            ? new SystemLandscapeViewDefinition(params.systemLandscape)
            : new SystemLandscapeViewDefinition({ identifier: "" });
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
        this.filtered = params.filtered ?? [];
        this.dynamics = params.dynamics ?? [];
        this.custom = params.custom ?? [];
        this.configuration = params.configuration ? new Configuration(params.configuration) : undefined;
        this.properties = params.properties;
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

    public toObject(): IViews {
        return {
            systemLandscape: this.systemLandscape?.toObject(),
            systemContexts: this.systemContexts.map(s => s.toObject()),
            containers: this.containers.map(c => c.toObject()),
            components: this.components.map(c => c.toObject()),
            deployments: this.deployments.map(d => d.toObject()),
            filtered: this.filtered,
            dynamics: this.dynamics,
            custom: this.custom,
            configuration: this.configuration.toObject(),
            properties: this.properties
        }
    }
}
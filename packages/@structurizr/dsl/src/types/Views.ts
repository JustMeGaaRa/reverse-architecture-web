import { Properties } from "./model/Properties";
import { ComponentView } from "./views/ComponentView";
import { ContainerView } from "./views/ContainerView";
import { Configuration } from "./views/Configuration";
import { DeploymentView } from "./views/DeploymentView";
import { SystemContextView } from "./views/SystemContextView";
import { SystemLandscapeView } from "./views/SystemLandscapeView";
import { IView } from "../shared/IView";

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

    public readonly systemLandscape?: SystemLandscapeView;
    public readonly systemContexts: SystemContextView[];
    public readonly containers: ContainerView[];
    public readonly components: ComponentView[];
    public readonly filtered: IView[];
    public readonly dynamics: IView[];
    public readonly deployments: DeploymentView[];
    public readonly custom: IView[];
    public readonly configuration: Configuration;
    public readonly properties?: Properties;
}
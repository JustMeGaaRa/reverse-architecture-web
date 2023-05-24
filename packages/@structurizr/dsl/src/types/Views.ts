import { Properties } from "./model/Properties";
import { Terminology } from "./model/Terminology";
import { Branding } from "./views/Branding";
import { Styles } from "./views/Style";
import { ComponentView } from "./views/ComponentView";
import { ContainerView } from "./views/ContainerView";
import { DeploymentView } from "./views/DeploymentView";
import { SystemContextView } from "./views/SystemContextView";
import { SystemLandscapeView } from "./views/SystemLandscapeView";
import { IView } from "../shared/IView";

type ViewsParams = Partial<Views>;

export class Views {
    constructor(
        params: ViewsParams
    ) {
        this.systemLandscape = params.systemLandscape;
        this.systemContexts = params.systemContexts ?? [];
        this.containers = params.containers ?? [];
        this.components = params.components ?? [];
        this.deployments = params.deployments ?? [];
        this.filtered = params.filtered ?? [];
        this.dynamics = params.dynamics ?? [];
        this.custom = params.custom ?? [];
        this.styles = params.styles ?? {
            element: {},
            relationship: {}
        };
        this.theme = params.theme;
        this.themes = params.themes ?? [];
        this.branding = params.branding;
        this.terminology = params.terminology;
        this.properties = params.properties;
    }

    public readonly systemLandscape?: SystemLandscapeView;
    public readonly systemContexts: SystemContextView[];
    public readonly containers: ContainerView[];
    public readonly components: ComponentView[];
    public readonly filtered: IView[];
    public readonly dynamics: IView[];
    public readonly deployments: DeploymentView[];
    public readonly custom: IView[];
    public readonly styles: Styles;
    public readonly theme?: string;
    public readonly themes: string[];
    public readonly branding?: Branding;
    public readonly terminology?: Terminology;
    public readonly properties?: Properties;
}
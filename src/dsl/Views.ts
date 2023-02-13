import { Properties } from "./model/Properties";
import { Terminology } from "./model/Terminology";
import { Branding } from "./view/Branding";
import { Styles } from "./view/Style";
import { ComponentView } from "./view/ComponentView";
import { ContainerView } from "./view/ContainerView";
import { DeploymentView } from "./view/DeploymentView";
import { DynamicView } from "./view/DynamicView";
import { SystemContextView } from "./view/SystemContextView";
import { SystemLandscapeView } from "./view/SystemLandscapeView";
import { GenericView } from "./view/GenericView";

export interface Views {
    systemLandscape?: SystemLandscapeView;
    systemContexts?: SystemContextView[];
    containers?: ContainerView[];
    components?: ComponentView[];
    filtered?: GenericView[];
    dynamics?: DynamicView[];
    deployments?: DeploymentView[];
    custom?: GenericView[];
    styles: Styles;
    theme?: string;
    themes?: string[];
    branding?: Branding;
    terminology?: Terminology;
    properties?: Properties;
}

export function views(
    systemContexts: SystemContextView[],
    containers: ContainerView[],
    components: ComponentView[],
    deployments: DeploymentView[],
    styles: Styles
): Views {
    return {
        systemContexts,
        containers,
        components,
        deployments,
        styles
    }
}
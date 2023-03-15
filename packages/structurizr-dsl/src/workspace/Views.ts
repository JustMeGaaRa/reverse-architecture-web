import { Properties } from "../model/Properties";
import { Terminology } from "../model/Terminology";
import { Branding } from "../view/Branding";
import { Styles, toStylesString } from "../view/Style";
import { ComponentView } from "../view/ComponentView";
import { ContainerView } from "../view/ContainerView";
import { DeploymentView } from "../view/DeploymentView";
import { DynamicView } from "../view/DynamicView";
import { SystemContextView } from "../view/SystemContextView";
import { SystemLandscapeView } from "../view/SystemLandscapeView";
import { GenericView } from "../view/GenericView";
import { indent, line } from "../utils";

export interface Views {
    systemLandscape?: SystemLandscapeView;
    systemContexts: SystemContextView[];
    containers: ContainerView[];
    components: ComponentView[];
    filtered: GenericView[];
    dynamics: DynamicView[];
    deployments: DeploymentView[];
    custom: GenericView[];
    styles: Styles;
    theme?: string;
    themes: string[];
    branding?: Branding;
    terminology?: Terminology;
    properties?: Properties;
}

export function toViewsString(views: Views): string {
    const styles = line(indent(toStylesString(views.styles)));
    return `views {\n${styles}\n}`;
}

export function views(
    systemContexts?: SystemContextView[],
    containers?: ContainerView[],
    components?: ComponentView[],
    deployments?: DeploymentView[],
    styles?: Styles
): Views {
    return {
        systemContexts: systemContexts ?? [],
        containers: containers ?? [],
        components: components ?? [],
        deployments: deployments ?? [],
        filtered: [],
        dynamics: [],
        custom: [],
        themes: [],
        styles: styles ?? { element: {}, relationship: {} },
    }
}
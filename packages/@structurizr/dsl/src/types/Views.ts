import { Properties } from "./model/Properties";
import { Terminology } from "./model/Terminology";
import { Branding } from "./views/Branding";
import { Styles, toStylesString } from "./views/Style";
import { ComponentView } from "./views/ComponentView";
import { ContainerView } from "./views/ContainerView";
import { DeploymentView } from "./views/DeploymentView";
import { SystemContextView } from "./views/SystemContextView";
import { SystemLandscapeView } from "./views/SystemLandscapeView";
import { indent, line } from "../utils/Formatting";
import { IView } from "../shared/IView";

export interface Views {
    systemLandscape?: SystemLandscapeView;
    systemContexts: SystemContextView[];
    containers: ContainerView[];
    components: ComponentView[];
    filtered: IView[];
    dynamics: IView[];
    deployments: DeploymentView[];
    custom: IView[];
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
        styles: styles ?? {
            element: {},
            relationship: {}
        }
    }
}
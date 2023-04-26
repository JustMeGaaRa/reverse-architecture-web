import { All, Identifier } from "../model/Identifier";
import { Layout } from "./Layout";
import { Properties } from "../model/Properties";
import { AutoLayout } from "./AutoLayout";
import { IView } from "../../shared/IView";
import { ViewType } from "./ViewType";

type DeploymentViewValues = Omit<IView, "type"> & {
    environment: string;
};

export class DeploymentView implements IView {
    constructor(values: DeploymentViewValues) {
        Object.assign(this, values);
        this.type = ViewType.Deployment;
    }

    type: ViewType;
    identifier: string;
    key?: string;
    autoLayout?: AutoLayout;
    layout: Layout;
    animation?: any;
    title?: string;
    description?: string;
    properties?: Properties;
}

export function deploymentView(
    softwareSystemIdentifier: All | Identifier,
    environment: string,
    key?: string,
    title?: string,
    layout?: Layout,
    description?: string
): DeploymentView {
    return new DeploymentView({
        identifier: softwareSystemIdentifier,
        environment,
        key,
        layout,
        title,
        description
    })
}
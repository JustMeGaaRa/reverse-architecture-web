import { All, Identifier } from "../model/Identifier";
import { Properties } from "../model/Properties";
import { IView } from "../../shared/IView";
import { IElementPosition } from "../../shared/IVIewMetadata";
import { AutoLayout } from "./AutoLayout";
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
    animation?: any;
    title?: string;
    description?: string;
    properties?: Properties;
    elements: Array<IElementPosition>;
}

export function deploymentView(
    softwareSystemIdentifier: All | Identifier,
    environment: string,
    key?: string,
    title?: string,
    layout?: Array<IElementPosition>,
    description?: string
): DeploymentView {
    return new DeploymentView({
        identifier: softwareSystemIdentifier,
        environment,
        key,
        title,
        description,
        elements: layout ?? [],
    })
}
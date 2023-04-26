import { Identifier } from "../model/Identifier";
import { Layout } from "./Layout";
import { Properties } from "../model/Properties";
import { AutoLayout } from "./AutoLayout";
import { IView } from "../../shared/IView";
import { ViewType } from "./ViewType";

export class ContainerView implements IView {
    constructor(values: Omit<IView, "type">) {
        Object.assign(this, values);
        this.type = ViewType.Container;
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

export function containerView(
    softwareSystemIdentifier: Identifier,
    key?: string,
    title?: string,
    layout?: Layout,
    description?: string,
): ContainerView {
    return new ContainerView({
        identifier: softwareSystemIdentifier,
        key,
        layout,
        title,
        description,
    })
}
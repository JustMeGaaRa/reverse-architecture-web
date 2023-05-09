import { Identifier } from "../model/Identifier";
import { Properties } from "../model/Properties";
import { IView } from "../../shared/IView";
import { IElementPosition } from "../../shared/IVIewMetadata";
import { AutoLayout } from "./AutoLayout";
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
    animation?: any;
    title?: string;
    description?: string;
    properties?: Properties;
    elements: Array<IElementPosition>;
}

export function containerView(
    softwareSystemIdentifier: Identifier,
    key?: string,
    title?: string,
    layout?: Array<IElementPosition>,
    description?: string,
): ContainerView {
    return new ContainerView({
        identifier: softwareSystemIdentifier,
        key,
        title,
        description,
        elements: layout ?? [],
    })
}
import { Identifier } from "../model/Identifier";
import { Properties } from "../model/Properties";
import { IView } from "../../shared/IView";
import { IElementPosition } from "../../shared/IVIewMetadata";
import { AutoLayout } from "./AutoLayout";
import { ViewType } from "./ViewType";

export class SystemContextView implements IView {
    constructor(values: Omit<IView, "type">) {
        Object.assign(this, values);
        this.type = ViewType.SystemContext;
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

export function systemContextView(
    softwareSystemIdentifier: Identifier,
    key?: string,
    title?: string,
    layout?: Array<IElementPosition>,
    description?: string,
): SystemContextView {
    return new SystemContextView({
        identifier: softwareSystemIdentifier,
        key,
        title,
        description,
        elements: layout ?? [],
    });
}
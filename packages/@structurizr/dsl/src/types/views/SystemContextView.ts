import { Identifier } from "../model/Identifier";
import { Layout } from "./Layout";
import { Properties } from "../model/Properties";
import { AutoLayout } from "./AutoLayout";
import { IView } from "../../shared/IView";
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
    layout: Layout;
    animation?: any;
    title?: string;
    description?: string;
    properties?: Properties;
}

export function systemContextView(
    softwareSystemIdentifier: Identifier,
    key?: string,
    title?: string,
    layout?: Layout,
    description?: string,
): SystemContextView {
    return new SystemContextView({
        identifier: softwareSystemIdentifier,
        key,
        layout,
        title,
        description,
    });
}
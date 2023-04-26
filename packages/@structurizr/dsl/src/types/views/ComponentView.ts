import { Identifier } from "../model/Identifier";
import { Layout } from "./Layout";
import { Properties } from "../model/Properties";
import { AutoLayout } from "./AutoLayout";
import { IView } from "../../shared/IView";
import { ViewType } from "./ViewType";

export class ComponentView implements IView {
    constructor(values: Omit<IView, "type">) {
        Object.assign(this, values);
        this.type = ViewType.Component;
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

export function componentView(
    containerIdentifier: Identifier,
    key?: string,
    title?: string,
    layout?: Layout,
    description?: string,
): ComponentView {
    return new ComponentView({
        identifier: containerIdentifier,
        key,
        layout,
        title,
        description,
    });
}
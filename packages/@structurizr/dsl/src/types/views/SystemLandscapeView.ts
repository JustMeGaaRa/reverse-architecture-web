import { Layout } from "./Layout";
import { Properties } from "../model/Properties";
import { AutoLayout } from "./AutoLayout";
import { IView } from "../../shared/IView";
import { ViewType } from "./ViewType";

export class SystemLandscapeView implements IView {
    constructor(values: Omit<IView, "type">) {
        Object.assign(this, values);
        this.identifier = "System Landscape";
        this.type = ViewType.SystemLandscape;
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

export function systemLandscapeView(
    title?: string,
    key?: string,
    layout?: Layout,
): SystemLandscapeView {
    return new SystemLandscapeView({
        identifier: "System Landscape",
        title,
        key,
        layout: layout ?? {},
    });
}
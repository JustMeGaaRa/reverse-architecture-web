import { Properties } from "../model/Properties";
import { IView } from "../../shared/IView";
import { IElementPosition } from "../../shared/IVIewMetadata";
import { AutoLayout } from "./AutoLayout";
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
    animation?: any;
    title?: string;
    description?: string;
    properties?: Properties;
    elements: Array<IElementPosition>;
}

export function systemLandscapeView(
    title?: string,
    key?: string,
    layout?: Array<IElementPosition>,
): SystemLandscapeView {
    return new SystemLandscapeView({
        identifier: "System Landscape",
        title,
        key,
        elements: layout ?? [],
    });
}
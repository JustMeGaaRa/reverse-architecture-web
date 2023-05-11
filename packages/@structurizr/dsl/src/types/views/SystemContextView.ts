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

    public readonly type: ViewType;
    public readonly identifier: string;
    public readonly key?: string;
    public readonly autoLayout?: AutoLayout;
    public readonly animation?: any;
    public readonly title?: string;
    public readonly description?: string;
    public readonly properties?: Properties;
    public readonly elements: Array<IElementPosition>;
}
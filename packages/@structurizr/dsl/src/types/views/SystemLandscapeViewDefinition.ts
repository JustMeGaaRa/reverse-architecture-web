import { Properties } from "../model/Properties";
import { IViewDefinition } from "./IViewDefinition";
import { IElementPosition, IRelationshipPosition } from "../../metadata/IViewMetadata";
import { AutoLayout } from "./AutoLayout";
import { ViewType } from "./ViewType";

export class SystemLandscapeViewDefinition implements IViewDefinition {
    constructor(values: Omit<IViewDefinition, "type" | "identifier">) {
        Object.assign(this, values);
        this.identifier = "System Landscape";
        this.type = ViewType.SystemLandscape;
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
    public readonly relationships: Array<IRelationshipPosition>;
}
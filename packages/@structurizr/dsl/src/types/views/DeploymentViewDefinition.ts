import { Properties } from "../model/Properties";
import { IViewDefinition } from "./IViewDefinition";
import { IElementPosition, IRelationshipPosition } from "../../metadata/IViewMetadata";
import { AutoLayout } from "./AutoLayout";
import { ViewType } from "./ViewType";

type DeploymentViewValues = Omit<IViewDefinition, "type"> & {
    environment: string;
};

export class DeploymentViewDefinition implements IViewDefinition {
    constructor(values: DeploymentViewValues) {
        Object.assign(this, values);
        this.type = ViewType.Deployment;
    }

    public readonly type: ViewType;
    public readonly identifier: string;
    public readonly environment: string;
    public readonly key?: string;
    public readonly description?: string;
    public readonly autoLayout?: AutoLayout;
    public readonly animation?: any;
    public readonly title?: string;
    public readonly properties?: Properties;
    public readonly elements: Array<IElementPosition>;
    public readonly relationships: Array<IRelationshipPosition>;
}
import { Properties } from "../model/Properties";
import { IView } from "../../shared/IView";
import { IElementPosition, IRelationshipPosition } from "../../shared/IWorkspaceMetadata";
import { AutoLayout } from "./AutoLayout";
import { ViewType } from "./ViewType";

type DeploymentViewValues = Omit<IView, "type"> & {
    environment: string;
};

export class DeploymentView implements IView {
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
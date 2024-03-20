import { Identifier, IDeploymentView, ISupportSnapshot, ViewType } from "@structurizr/dsl";
import * as Y from "yjs";

export class DeploymentView implements ISupportSnapshot<IDeploymentView> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ViewType.Deployment;

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }

    public fromSnapshot(deploymentView: IDeploymentView) {
        this.identifier = deploymentView.identifier;
    }

    public toSnapshot(): IDeploymentView {
        return Object.freeze({
            type: this.type,
            identifier: this.identifier,
            environment: "",
            elements: [],
            relationships: []
        });
    }
}

import { Identifier, IDeploymentView, ISupportSnapshot, ViewType } from "@structurizr/dsl";
import * as Y from "yjs";

export class DeploymentView implements ISupportSnapshot<IDeploymentView> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ViewType.Deployment;
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }

    public toSnapshot(): IDeploymentView {
        throw new Error("Method not implemented.");
    }
}

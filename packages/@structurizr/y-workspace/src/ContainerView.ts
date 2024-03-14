import { IContainerView, Identifier, ISupportSnapshot, ViewType } from "@structurizr/dsl";
import * as Y from "yjs";

export class ContainerView implements ISupportSnapshot<IContainerView> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ViewType.Container;
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }

    public toSnapshot(): IContainerView {
        throw new Error("Method not implemented.");
    }
}

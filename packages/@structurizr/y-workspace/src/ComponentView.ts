import { IComponentView, Identifier, ISupportSnapshot, ViewType } from "@structurizr/dsl";
import * as Y from "yjs";

export class ComponentView implements ISupportSnapshot<IComponentView> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ViewType.Component;
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }

    public toSnapshot(): IComponentView {
        throw new Error("Method not implemented.");
    }
}

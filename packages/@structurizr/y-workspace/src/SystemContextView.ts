import { Identifier, ISupportSnapshot, ISystemContextView, ViewType } from "@structurizr/dsl";
import * as Y from "yjs";

export class SystemContextView implements ISupportSnapshot<ISystemContextView> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ViewType.SystemContext;
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }

    public toSnapshot(): ISystemContextView {
        throw new Error("Method not implemented.");
    }
}

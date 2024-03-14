import { Identifier, ISupportSnapshot, ISystemLandscapeView, ViewType } from "@structurizr/dsl";
import * as Y from "yjs";

export class SystemLandscapeView implements ISupportSnapshot<ISystemLandscapeView> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ViewType.SystemLandscape;
    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }

    public toSnapshot(): ISystemLandscapeView {
        throw new Error("Method not implemented.");
    }
}

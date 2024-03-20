import { Identifier, ISupportSnapshot, ISystemLandscapeView, ViewType } from "@structurizr/dsl";
import * as Y from "yjs";

export class SystemLandscapeView implements ISupportSnapshot<ISystemLandscapeView> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ViewType.SystemLandscape;

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }

    public fromSnapshot(systemLandscapeView: ISystemLandscapeView) {
        this.identifier = systemLandscapeView.identifier;
    }

    public toSnapshot(): ISystemLandscapeView {
        return Object.freeze({
            type: this.type,
            identifier: this.identifier,
            elements: [],
            relationships: []
        });
    }
}

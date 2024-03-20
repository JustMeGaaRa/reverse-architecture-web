import { IContainerView, Identifier, ISupportSnapshot, ViewType } from "@structurizr/dsl";
import * as Y from "yjs";

export class ContainerView implements ISupportSnapshot<IContainerView> {
    public constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public readonly type: ViewType.Container;

    public get identifier(): Identifier { return this.propertiesMap.get("identifier") as Identifier; }
    public set identifier(value: Identifier) { this.propertiesMap.set("identifier", value); }

    public fromSnapshot(containerView: IContainerView) {
        this.identifier = containerView.identifier;
    }

    public toSnapshot(): IContainerView {
        return Object.freeze({
            type: this.type,
            identifier: this.identifier,
            elements: [],
            relationships: []
        });
    }
}

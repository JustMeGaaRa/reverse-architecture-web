import { IStyles, ISupportSnapshot } from "@structurizr/dsl";
import * as Y from "yjs";
import { RelationshipStyle } from "./RelationshipStyle";
import { ElementStyle } from "./ElementStyle";

export class Styles implements ISupportSnapshot<IStyles> {
    private get elementsArray(): Y.Array<ElementStyle> { return this.propertiesMap.get("elements") as Y.Array<ElementStyle>; }
    private get relationshipsArray(): Y.Array<RelationshipStyle> { return this.propertiesMap.get("relationships") as Y.Array<RelationshipStyle>; }

    public constructor(private readonly propertiesMap: Y.Map<unknown>) {
        if (!propertiesMap.has("elements")) propertiesMap.set("elements", new Y.Array<ElementStyle>());
        if (!propertiesMap.has("relationships")) propertiesMap.set("relationships", new Y.Array<RelationshipStyle>());
    }

    public get elements(): Array<ElementStyle> { return this.elementsArray.map(element => Object.freeze(element)); }
    public get relationships(): Array<RelationshipStyle> { return this.relationshipsArray.map(relationship => Object.freeze(relationship)); }

    public fromSnapshot(styles: IStyles) {
        // TODO: implement the fromSnapshot method
    }

    public toSnapshot(): IStyles {
        return Object.freeze({
            elements: this.elements ?? [],
            relationships: this.relationships ?? []
        });
    }
}

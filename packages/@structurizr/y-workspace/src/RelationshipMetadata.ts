import { IRelationshipMetadata, ISupportSnapshot } from "@structurizr/dsl";
import * as Y from "yjs";

export class RelationshipMetadata implements ISupportSnapshot<IRelationshipMetadata> {
    constructor(
        private readonly propertiesMap: Y.Map<unknown>
    ) { }
    
    public get id(): string { return this.propertiesMap.get("id") as string; }
    public set id(value: string) { this.propertiesMap.set("id", value); }

    public get x(): number { return this.propertiesMap.get("x") as number; }
    public set x(value: number) { this.propertiesMap.set("x", value); }

    public get y(): number { return this.propertiesMap.get("y") as number; }
    public set y(value: number) { this.propertiesMap.set("y", value); }

    public fromSnapshot(relationship: IRelationshipMetadata) {
        this.id = relationship.id;
        this.x = relationship.x;
        this.y = relationship.y;
    }

    public toSnapshot(): IRelationshipMetadata {
        return Object.freeze({
            id: this.id,
            x: this.x,
            y: this.y,
        });
    }
}
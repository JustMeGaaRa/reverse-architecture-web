import { IElementMetadata, ISupportSnapshot } from "@structurizr/dsl";
import * as Y from "yjs";

export class ElementMetadata implements ISupportSnapshot<IElementMetadata> {
    constructor(
        private readonly propertiesMap: Y.Map<unknown>
    ) { }
    
    public get id(): string { return this.propertiesMap.get("id") as string; }
    public set id(value: string) { this.propertiesMap.set("id", value); }

    public get x(): number { return this.propertiesMap.get("x") as number; }
    public set x(value: number) { this.propertiesMap.set("x", value); }

    public get y(): number { return this.propertiesMap.get("y") as number; }
    public set y(value: number) { this.propertiesMap.set("y", value); }

    public get width(): number { return this.propertiesMap.get("width") as number; }
    public set width(value: number) { this.propertiesMap.set("width", value); }

    public get height(): number { return this.propertiesMap.get("height") as number; }
    public set height(value: number) { this.propertiesMap.set("height", value); }

    public fromSnapshot(element: IElementMetadata) {
        this.id = element.id;
        this.x = element.x;
        this.y = element.y;
        this.width = element.width;
        this.height = element.height;
    }

    public toSnapshot(): IElementMetadata {
        return Object.freeze({
            id: this.id,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        });
    }
}
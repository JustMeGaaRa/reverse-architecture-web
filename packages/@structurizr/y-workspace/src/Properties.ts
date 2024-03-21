import { IProperties } from "@structurizr/dsl";
import * as Y from "yjs";

export class Properties {
    constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get version(): number { return this.propertiesMap.get("version") as number; }
    public set version(value: number) { this.propertiesMap.set("version", value); }

    public get name(): string { return this.propertiesMap.get("name") as string; }
    public set name(value: string) { this.propertiesMap.set("name", value); }

    public get description(): string { return this.propertiesMap.get("description") as string; }
    public set description(value: string) { this.propertiesMap.set("description", value); }

    public get lastModifiedDate(): string { return new Date(this.propertiesMap.get("lastModifiedDate") as number).toUTCString(); }
    public set lastModifiedDate(value: string) { this.propertiesMap.set("lastModifiedDate", new Date(value).getDate()); }

    public fromSnapshot(properties: IProperties) {
        this.version = properties["version"];
        this.name = properties["name"];
        this.description = properties["description"];
        this.lastModifiedDate = properties["lastModifiedDate"];
    }

    public toSnapshot(): IProperties {
        return Object.freeze({
            version: this.version,
            name: this.name,
            description: this.description,
            lastModifiedDate: this.lastModifiedDate
        })
    }
}
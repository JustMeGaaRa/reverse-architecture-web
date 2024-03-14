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

    public get lastModifiedDate(): Date { return this.propertiesMap.get("lastModifiedDate") as Date; }
    public set lastModifiedDate(value: Date) { this.propertiesMap.set("lastModifiedDate", value); }

    public toSnapshot(): IProperties {
        return Object.freeze({
            version: this.version,
            name: this.name,
            description: this.description,
            lastModifiedDate: this.lastModifiedDate
        })
    }
}
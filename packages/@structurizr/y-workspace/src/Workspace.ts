import { IObservable, ISupportSnapshot, IWorkspaceSnapshot } from "@structurizr/dsl";
import * as Y from "yjs";
import { Properties } from "./Properties";
import { Model } from "./Model";
import { Views } from "./Views";

export class Workspace implements ISupportSnapshot<IWorkspaceSnapshot>, IObservable {
    private get modelMap(): Y.Map<unknown> { return this.document.getMap("model"); }
    private get viewsMap(): Y.Map<unknown> { return this.document.getMap("views"); }
    private get propertiesMap(): Y.Map<unknown> { return this.document.getMap("properties"); }

    constructor(private readonly document: Y.Doc) { }

    public get version(): number { return this.properties.version; }
    public set version(value: number) { this.properties.version = value; }

    public get name(): string { return this.properties.name; }
    public set name(value: string) { this.properties.name = value; }

    public get description(): string | undefined { return this.properties.description; }
    public set description(value: string | undefined) { this.properties.description = value; }

    public get lastModifiedDate(): Date { return this.properties.lastModifiedDate; }
    public set lastModifiedDate(value: Date) { this.properties.lastModifiedDate = value; }

    public get model(): Model { return new Model(this.modelMap); }
    public get views(): Views { return new Views(this.viewsMap); }
    public get properties(): Properties { return new Properties(this.propertiesMap); }

    public fromSnapshot(workspace: IWorkspaceSnapshot) {
        this.version = 1;
        this.name = workspace.name;
        this.description = workspace.description;
        this.lastModifiedDate = workspace.lastModifiedDate;
        this.model.fromSnapshot(workspace.model);
        this.views.fromSnapshot(workspace.views);
    }

    public toSnapshot(): IWorkspaceSnapshot {
        return Object.freeze({
            version: this.version,
            name: this.name,
            description: this.description,
            lastModifiedDate: this.lastModifiedDate,
            properties: this.properties.toSnapshot(),
            model: this.model.toSnapshot(),
            views: this.views.toSnapshot()
        })
    }

    public subscribe(observer: () => void): void {
        this.modelMap.observe(observer);
        this.viewsMap.observe(observer);
        this.propertiesMap.observe(observer);
    }

    public unsubscribe(observer: () => void): void {
        this.modelMap.unobserve(observer);
        this.viewsMap.unobserve(observer);
        this.propertiesMap.unobserve(observer);
    }
}
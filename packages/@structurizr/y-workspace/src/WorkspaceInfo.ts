import { ISupportSnapshot } from "@structurizr/dsl";
import * as Y from "yjs";

export type WorkspaceStatus = "public" | "private" | "shared" | "archived";

export type WorkspaceInfoStats = {
    used: number;
    bookmarked: number;
    liked: number;
}

export interface IWorkspaceInfo {
    workspaceId: string;
    name: string;
    description?: string;
    coverUrl: string;
    status: WorkspaceStatus;
    group?: string;
    createdBy: string;
    lastModifiedDate: string;
    lastModifiedBy: string;
    tags: Array<string>;
    statistics?: WorkspaceInfoStats;
}

export class WorkspaceInfo implements ISupportSnapshot<IWorkspaceInfo> {
    constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get workspaceId(): string { return this.propertiesMap.get("workspaceId") as string; }

    public get name(): string { return this.propertiesMap.get("name") as string; }
    public set name(value: string) {
        this.propertiesMap.set("name", value);
        this.propertiesMap.set("lastModifiedDate", Date.now());
    }

    public get description(): string | undefined { return this.propertiesMap.get("description") as string; }
    public set description(value: string | undefined) {
        this.propertiesMap.set("description", value);
        this.propertiesMap.set("lastModifiedDate", Date.now());
    }

    public get coverUrl(): string { return this.propertiesMap.get("coverUrl") as string; }
    public set coverUrl(value: string) {
        this.propertiesMap.set("coverUrl", value);
        this.propertiesMap.set("lastModifiedDate", Date.now());
    }

    public get status(): WorkspaceStatus { return this.propertiesMap.get("status") as WorkspaceStatus; }
    public set status(value: WorkspaceStatus) {
        this.propertiesMap.set("status", value);
        this.propertiesMap.set("lastModifiedDate", Date.now());
    }

    public get group(): string { return this.propertiesMap.get("group") as string; }
    public set group(value: string) {
        this.propertiesMap.set("group", value);
        this.propertiesMap.set("lastModifiedDate", Date.now());
    }

    public get createdBy(): string { return this.propertiesMap.get("createdBy") as string; }

    public get lastModifiedDate(): string { return new Date(this.propertiesMap.get("lastModifiedDate") as number).toUTCString(); }

    public get lastModifiedBy(): string { return this.propertiesMap.get("lastModifiedBy") as string; }

    public get tags(): Array<string> { return this.propertiesMap.get("tags") as Array<string>; }
    public set tags(value: Array<string>) {
        this.propertiesMap.set("tags", value);
        this.propertiesMap.set("lastModifiedDate", Date.now());
    }

    public toSnapshot(): IWorkspaceInfo {
        return Object.freeze({
            workspaceId: this.workspaceId,
            name: this.name,
            description: this.description,
            coverUrl: this.coverUrl,
            status: this.status,
            group: this.group,
            createdBy: this.createdBy,
            lastModifiedDate: this.lastModifiedDate,
            lastModifiedBy: this.lastModifiedBy,
            tags: this.tags
        })
    }
}
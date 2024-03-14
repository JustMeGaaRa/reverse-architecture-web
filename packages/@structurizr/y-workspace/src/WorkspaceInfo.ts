import * as Y from "yjs";

export type WorkspaceStatus = "private" | "shared" | "archived";

export class WorkspaceInfo {
    constructor(private readonly propertiesMap: Y.Map<unknown>) { }

    public get workspaceId(): string { return this.propertiesMap.get("workspaceId") as string; }
    public get name(): string { return this.propertiesMap.get("name") as string; }
    public get description(): string | undefined { return this.propertiesMap.get("description") as string; }
    public get coverUrl(): string { return this.propertiesMap.get("coverUrl") as string; }
    public get status(): WorkspaceStatus { return this.propertiesMap.get("status") as WorkspaceStatus;}
    public get group(): string { return this.propertiesMap.get("group") as string; }
    public get createdBy(): string { return this.propertiesMap.get("createdBy") as string; }
    public get lastModifiedDate(): string { return this.propertiesMap.get("lastModifiedDate") as string; }
    public get lastModifiedBy(): string { return this.propertiesMap.get("lastModifiedBy") as string; }
    public get tags(): Array<string> { return this.propertiesMap.get("tags") as Array<string>; }
}
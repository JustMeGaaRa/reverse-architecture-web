import { Properties } from "./model/Properties";
import { Model } from "./Model";
import { Views } from "./Views";

type WorkspaceParams = 
    Required<Pick<Workspace, "name" | "description">>
    & Partial<Omit<Workspace, "name" | "description">>;

export class Workspace {
    constructor(
        params: WorkspaceParams
    ) {
        this.name = params.name;
        this.description = params.description;
        this.lastModifiedDate = params.lastModifiedDate ?? new Date();
        this.properties = params.properties;
        this.model = new Model({});
        this.views = new Views({});
    }

    public readonly name?: string;
    public readonly description?: string;
    public readonly lastModifiedDate?: Date;
    public readonly properties?: Properties;
    public readonly model: Model;
    public readonly views: Views;

    public static Empty = new Workspace({
        name: "Empty Workspace",
        description: "An empty workspace."
    });
}
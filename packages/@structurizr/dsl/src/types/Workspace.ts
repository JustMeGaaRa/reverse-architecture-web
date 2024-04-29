import { ISupportSnapshot, IWorkspaceSnapshot, IWorkspaceMetadata } from "../interfaces";
import { Model } from "./Model";
import { Properties } from "./Properties";
import { Views } from "./Views";

export class Workspace implements ISupportSnapshot<IWorkspaceSnapshot> {
    constructor(params: IWorkspaceSnapshot) {
        this.version = params.version;
        this.name = params.name;
        this.description = params.description;
        this.lastModifiedDate = params.lastModifiedDate ?? new Date().toUTCString();
        // this.properties = new Properties(params.properties);
        this.model = new Model(params.model);
        this.views = new Views(params.views);
    }

    public readonly version: number;
    public readonly name?: string;
    public readonly description?: string;
    public readonly lastModifiedDate: string;
    public readonly properties?: Properties;
    public readonly model: Model;
    public readonly views: Views;

    public static Empty = new Workspace({
        version: 1,
        name: "Empty Workspace",
        description: "An empty workspace.",
        model: {
            people: [],
            softwareSystems: [],
            deploymentEnvironments: [],
            relationships: [],
            groups: []
        },
        views: {
            systemContexts: [],
            containers: [],
            components: [],
            // dynamics: [],
            deployments: [],
            // filtered: [],
            // custom: [],
            configuration: {
                styles: {
                    elements: [],
                    relationships: []
                },
                themes: []
            },
        }
    });

    public applyMetadata(metadata: IWorkspaceMetadata): Workspace {
        if (metadata === null || metadata === undefined) return this;
        
        if (metadata.views.systemLandscape) {
            this.views.systemLandscape.applyMetadata(metadata.views.systemLandscape);
        }
        metadata.views.systemContexts.forEach(view => {
            this.views.systemContexts.find(x => x.key === view.key)?.applyMetadata(view);
        })
        metadata.views.containers.forEach(view => {
            this.views.containers.find(x => x.key === view.key)?.applyMetadata(view);
        })
        metadata.views.components.forEach(view => {
            this.views.components.find(x => x.key === view.key)?.applyMetadata(view);
        })
        metadata.views.deployments.forEach(view => {
            this.views.deployments.find(x => x.key === view.key)?.applyMetadata(view);
        })
        return this;
    }

    public toSnapshot(): IWorkspaceSnapshot {
        return {
            version: this.version,
            name: this.name,
            description: this.description,
            lastModifiedDate: this.lastModifiedDate,
            properties: this.properties,
            model: this.model.toSnapshot(),
            views: this.views.toSnapshot()
        };
    }
}
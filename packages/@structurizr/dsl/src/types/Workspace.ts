import {
    IModel,
    Model,
    IViews,
    Views,
    Properties,
    ISupportImmutable,
    IWorkspaceMetadata,
} from "../";

export interface IWorkspace {
    name?: string;
    description?: string;
    lastModifiedDate?: Date;
    properties?: Properties;
    model: IModel;
    views: IViews;
}

export class Workspace implements ISupportImmutable<IWorkspace> {
    constructor(params: IWorkspace) {
        this.name = params.name;
        this.description = params.description;
        this.lastModifiedDate = params.lastModifiedDate ?? new Date();
        this.properties = params.properties;
        this.model = new Model(params.model);
        this.views = new Views(params.views);
    }

    public readonly name?: string;
    public readonly description?: string;
    public readonly lastModifiedDate?: Date;
    public readonly properties?: Properties;
    public readonly model: Model;
    public readonly views: Views;

    public static Empty = new Workspace({
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
            dynamics: [],
            deployments: [],
            filtered: [],
            custom: [],
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
        if (metadata.views.systemLandscape) {
            this.views.systemLandscape?.applyMetadata(metadata.views.systemLandscape);
        }
        metadata.views.systemContexts.forEach(view => {
            this.views.systemContexts.find(x => x.identifier === view.identifier)?.applyMetadata(view);
        })
        metadata.views.containers.forEach(view => {
            this.views.containers.find(x => x.identifier === view.identifier)?.applyMetadata(view);
        })
        metadata.views.components.forEach(view => {
            this.views.components.find(x => x.identifier === view.identifier)?.applyMetadata(view);
        })
        metadata.views.deployments.forEach(view => {
            this.views.deployments.find(x => x.identifier === view.identifier)?.applyMetadata(view);
        })
        return this;
    }

    public toObject(): IWorkspace {
        return {
            name: this.name,
            description: this.description,
            lastModifiedDate: this.lastModifiedDate,
            properties: this.properties,
            model: this.model.toObject(),
            views: this.views.toObject()
        };
    }
}
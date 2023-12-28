import { ISupportImmutable } from "../shared/ISupportImmutable";
import { Identifier } from "./model/Identifier";
import { Position } from "./views/Position";

export interface IElementPosition {
    id: string;
    x: number;
    y: number;
    height?: number;
    width?: number;
}

export interface IRelationshipPosition {
    id: string;
}

export interface IViewDefinitionMetadata {
    identifier: Identifier;
    key?: string;
    elements?: Array<IElementPosition>;
    relationships?: Array<IRelationshipPosition>;
}

export class ViewDefinitionMetadata implements ISupportImmutable<IViewDefinitionMetadata> {
    constructor(values: IViewDefinitionMetadata) {
        this.identifier = values.identifier;
        this.key = values.key;
        this.elements = values.elements ?? [];
        this.relationships = values.relationships ?? [];
    }

    public identifier: Identifier;
    public key?: string;
    public elements: Array<IElementPosition>;
    public relationships: Array<IRelationshipPosition>;

    public toObject(): IViewDefinitionMetadata {
        return {
            identifier: this.identifier,
            key: this.key,
            elements: this.elements,
            relationships: this.relationships
        };
    }

    public setElementPosition(elementId: string, position: Position) {
        this.elements = [
            ...this.elements.filter(x => x.id !== elementId),
            { id: elementId, x: position.x, y: position.y }
        ]
    }

    public setRelationshipPosition(relationshipId: string) {
        this.relationships = [
            ...this.relationships.filter(x => x.id !== relationshipId),
            { id: relationshipId }
        ]
    }
}

export interface IViewsMetadata {
    systemLandscape: IViewDefinitionMetadata;
    systemContexts: Array<IViewDefinitionMetadata>;
    containers: Array<IViewDefinitionMetadata>;
    components: Array<IViewDefinitionMetadata>;
    deployments: Array<IViewDefinitionMetadata>;
}

export class ViewsMetadata implements ISupportImmutable<IViewsMetadata> {
    constructor(values: IViewsMetadata) {
        this.systemLandscape = values.systemLandscape ? new ViewDefinitionMetadata(values.systemLandscape) : undefined;
        this.systemContexts = values.systemContexts.map(x => new ViewDefinitionMetadata(x));
        this.containers = values.containers.map(x => new ViewDefinitionMetadata(x));
        this.components = values.components.map(x => new ViewDefinitionMetadata(x));
        this.deployments = values.deployments.map(x => new ViewDefinitionMetadata(x));
    }
    
    public readonly systemLandscape?: ViewDefinitionMetadata;
    public readonly systemContexts: Array<ViewDefinitionMetadata>;
    public readonly containers: Array<ViewDefinitionMetadata>;
    public readonly components: Array<ViewDefinitionMetadata>;
    public readonly deployments: Array<ViewDefinitionMetadata>;

    public toObject(): IViewsMetadata {
        return {
            systemLandscape: this.systemLandscape?.toObject(),
            systemContexts: this.systemContexts.map(x => x.toObject()),
            containers: this.containers.map(x => x.toObject()),
            components: this.components.map(x => x.toObject()),
            deployments: this.deployments.map(x => x.toObject())
        };
    }
}

export interface IWorkspaceMetadata {
    name: string;
    lastModifiedDate: Date;
    views: IViewsMetadata;
}

export class WorkspaceMetadata implements ISupportImmutable<IWorkspaceMetadata> {
    constructor(values: IWorkspaceMetadata) {
        this.name = values.name;
        this.lastModifiedDate = values.lastModifiedDate;
        this.views = new ViewsMetadata(values.views);
    }

    public readonly name: string;
    public readonly lastModifiedDate: Date;
    public readonly views: ViewsMetadata;

    public static Empty = new WorkspaceMetadata({
        name: "",
        lastModifiedDate: new Date(),
        views: {
            systemLandscape: undefined,
            systemContexts: [],
            containers: [],
            components: [],
            deployments: []
        }
    });

    public toObject(): IWorkspaceMetadata {
        return {
            name: this.name,
            lastModifiedDate: this.lastModifiedDate,
            views: this.views.toObject()
        };
    }
}
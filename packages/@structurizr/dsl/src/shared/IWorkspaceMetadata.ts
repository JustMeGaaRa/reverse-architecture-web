import {
    ElementStyle,
    IViewMetadata,
    RelationshipStyle,
} from "..";

export interface IWorkspaceMetadata {
    name: string;
    lastModifiedDate: Date;
    views: {
        systemLandscape: IViewMetadata;
        systemContexts: Array<IViewMetadata>;
        containers: Array<IViewMetadata>;
        components: Array<IViewMetadata>;
        deployments: Array<IViewMetadata>;
    }
}

export interface IElementPosition {
    id: string;
    x: number;
    y: number;
}

export interface IRelationshipPosition {
    id: string;
}

export interface IWorkspaceTheme {
    name: string;
    description: string;
    lastModifiedDate: Date;
    elements: ElementStyle,
    relationships: RelationshipStyle;
}
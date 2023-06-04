import {
    defaultElementStyle,
    defaultRelationshipStyle,
    ElementStyle,
    IViewMetadata,
    RelationshipStyle,
    Tag,
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

export const defaultTheme: IWorkspaceTheme = {
    name: "Default",
    description: "Default theme defined in Structurizr specification",
    lastModifiedDate: new Date(),
    elements: [
        {
            tag: Tag.Element.name,
            ...defaultElementStyle
        }
    ],
    relationships: [
        {
            tag: Tag.Relationship.name,
            ...defaultRelationshipStyle
        }
    ]
}
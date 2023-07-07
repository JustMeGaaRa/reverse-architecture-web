import { defaultElementStyle, defaultRelationshipStyle, ElementStyle, RelationshipStyle, Tag } from "../..";

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
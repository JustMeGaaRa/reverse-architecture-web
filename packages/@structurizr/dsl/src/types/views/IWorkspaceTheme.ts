import {
    StructurizrElementTagDefaultStyle,
    StructurizrRelationshipTagDefaultStyle,
    ElementStyle,
    RelationshipStyle,
    Tag
} from "../..";

export interface IWorkspaceTheme {
    name: string;
    description: string;
    lastModifiedDate: Date;
    elements: ElementStyle,
    relationships: RelationshipStyle;
}

export const StructurizrDefaultTheme: IWorkspaceTheme = {
    name: "Structurizr Default Theme",
    description: "Default theme defined in Structurizr specification",
    lastModifiedDate: new Date(),
    elements: [
        {
            tag: Tag.Element.name,
            ...StructurizrElementTagDefaultStyle
        }
    ],
    relationships: [
        {
            tag: Tag.Relationship.name,
            ...StructurizrRelationshipTagDefaultStyle
        }
    ]
}
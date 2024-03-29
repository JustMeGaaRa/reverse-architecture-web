import {
    ElementStyleProperties,
    IWorkspaceTheme,
    LineStyle,
    RelationshipStyleProperties,
    RoutingStyle,
    ShapeType,
    Tag
} from "@structurizr/dsl";

export const ReverseArchitectureElementStyle: ElementStyleProperties = {
    shape: ShapeType.RoundedBox,
    icon: "",
    width: 200,
    height: 200,
    background: "#ffffff",
    stroke: "#ffffff",
    strokeWidth: 2,
    color: "#E8E8E8",
    fontSize: 24,
    border: LineStyle.Solid,
    opacity: 100,
    metadata: true,
    description: true,
    properties: new Map(),
}

export const ReverseArchitectureRelationshipStyle: RelationshipStyleProperties = {
    color: "#8A8B8C",
    fontSize: 24,
    opacity: 100,
    position: 50,
    routing: RoutingStyle.Direct,
    style: LineStyle.Dashed,
    thickness: 2,
    width: 200,
    properties: new Map(),
}

export const ReverseArchitectureTheme: IWorkspaceTheme = {
    name: "Reverse Architecture Theme",
    description: "Default theme for elements and relationships in Reverse Architecture application",
    lastModifiedDate: new Date(),
    elements: [
        {
            tag: Tag.Element.name,
            ...ReverseArchitectureElementStyle
        },
    ],
    relationships: [
        {
            tag: Tag.Relationship.name,
            ...ReverseArchitectureRelationshipStyle
        }
    ]
}
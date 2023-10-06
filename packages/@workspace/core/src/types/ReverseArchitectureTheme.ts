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
    thikness: 2,
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
        // {
        //     tag: Tag.Group.name,
        //     background: "#E8E8E8",
        //     color: "#ffffff",
        //     stroke: "#E8E8E8"
        // },
        // {
        //     tag: Tag.Person.name,
        //     background: "#FF453A",
        //     color: "#ffffff",
        //     stroke: "#FF453A"
        // },
        // {
        //     tag: Tag.SoftwareSystem.name,
        //     background: "#E3FB51",
        //     color: "#ffffff",
        //     stroke: "#E3FB51"
        // },
        // {
        //     tag: Tag.Container.name,
        //     background: "#0A84FF",
        //     color: "#ffffff",
        //     stroke: "#0A84FF"
        // },
        // {
        //     tag: Tag.Component.name,
        //     background: "#BF5AF2",
        //     color: "#ffffff",
        //     stroke: "#BF5AF2"
        // },
        // {
        //     tag: Tag.DeploymentNode.name,
        //     background: "#30D158",
        //     color: "#ffffff",
        //     stroke: "#30D158"
        // }
    ],
    relationships: [
        {
            tag: Tag.Relationship.name,
            ...ReverseArchitectureRelationshipStyle
        }
    ]
}
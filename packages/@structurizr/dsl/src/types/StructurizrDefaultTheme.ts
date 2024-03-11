import { IWorkspaceTheme } from "../interfaces"
import { ElementStyleProperties } from "./ElementStyleProperties"
import { LineStyle } from "./LineStyle"
import { RelationshipStyleProperties } from "./RelationshipStyleProperties"
import { RoutingStyle } from "./RoutingStyle"
import { ShapeType } from "./ShapeType"
import { Tag } from "./Tag"

export const StructurizrElementTagDefaultStyle: ElementStyleProperties = {
    shape: ShapeType.Box,
    icon: "",
    width: 450,
    height: 300,
    background: "#dddddd",
    stroke: "#c3c3c3",
    strokeWidth: 2,
    color: "#000000",
    fontSize: 24,
    border: LineStyle.Solid,
    opacity: 100,
    metadata: true,
    description: true,
    properties: new Map(),
}

export const StructurizrRelationshipTagDefaultStyle: RelationshipStyleProperties = {
    color: "#707070",
    fontSize: 24,
    opacity: 100,
    position: 50,
    properties: new Map(),
    routing: RoutingStyle.Direct,
    style: LineStyle.Dashed,
    thickness: 2,
    width: 200,
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
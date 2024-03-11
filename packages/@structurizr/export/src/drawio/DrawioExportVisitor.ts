import {
    MXGeometryAs,
    MXPointAs,
    MxObject,
} from "@justmegaara/mxgraph";
import {
    IElement,
    Tag,
    IElementVisitor,
    IViewDefinition,
    IElementPosition,
    IComponent,
    IContainer,
    IContainerInstance,
    IDeploymentNode,
    IInfrastructureNode,
    ISoftwareSystem,
    ISoftwareSystemInstance,
    IGroup,
    IPerson,
    IRelationship
} from "@structurizr/dsl";
import { ElementHtmlUtils } from "./utils";
import {
    EdgeArrowType,
    NodeHorizontalAlign,
    NodeVerticalAlign,
    NodeWhiteSpaceType
} from "./types";
import { DrawioDiagramBuilder } from "./DrawioDiagramBuilder";

export class DrawioExportVisitor implements IElementVisitor {
    constructor(
        private view: IViewDefinition,
        private parentId: string | undefined,
        private builder: DrawioDiagramBuilder
    ) {}

    visitGroup(group: IGroup, params?: { parentId?: string; }) {
        throw new Error("Method not implemented.");
    }

    visitPerson(person: IPerson, params?: { parentId?: string }) {
        const mxObject: MxObject = {
            _placeholders: "1",
            _c4Name: person.name,
            _c4Type: "Person",
            _c4Description: person.description,
            _label: ElementHtmlUtils.elementHtmlBuilder(person),
            _id: person.identifier,
            mxCell: {
                _parent: params?.parentId ?? this.parentId,
                _vertex: "1",
                _style: ElementHtmlUtils.formatNodeStyle({
                    align: NodeHorizontalAlign.Center,
                    dashed: false,
                    fontSize: 11,
                    fontColor: "#ffffff",
                    fillColor: this.isExternal(person) ? "#6C6477" : "#083F75",
                    html: true,
                    metaEdit: true,
                    points: `[
                        [0.5,0,0],[1,0.5,0],[1,0.75,0],
                        [0.75,1,0],[0.5,1,0],[0.25,1,0],
                        [0,0.75,0],[0,0.5,0]
                    ]`,
                    resizable: false,
                    shape: "mxgraph.c4.person2",
                    strokeColor: this.isExternal(person) ? "#4D4D4D" : "#06315C",
                    whiteSpace: NodeWhiteSpaceType.Wrap,
                }),
                mxGeometry: {
                    _x: this.view.elements.find(x => x.id === person.identifier)?.x.toString(),
                    _y: this.view.elements.find(x => x.id === person.identifier)?.y.toString(),
                    _width: "200",
                    _height: "180",
                    _as: MXGeometryAs.Geometry
                }
            }
        }
        this.builder.addMxObject(mxObject);
    }

    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string }) {
        const mxObject = this.fromElement(
            params?.parentId ?? this.parentId,
            softwareSystem,
            this.view.elements.find(x => x.id === softwareSystem.identifier),
            this.isExternal(softwareSystem) ? "#8C8496" : "#1061B0",
            this.isExternal(softwareSystem) ? "#736782" : "#0D5091"
        );
        this.builder.addMxObject(mxObject);
    }

    visitContainer(container: IContainer, params?: { parentId?: string }) {
        const mxObject = this.fromElement(
            params?.parentId ?? this.parentId,
            container,
            this.view.elements.find(x => x.id === container.identifier),
            "#23A2D9",
            "#0E7DAD"
        );
        this.builder.addMxObject(mxObject);
    }

    visitComponent(component: IComponent, params?: { parentId?: string }) {
        const mxObject = this.fromElement(
            params?.parentId ?? this.parentId,
            component,
            this.view.elements.find(x => x.id === component.identifier),
            "#63BEF2",
            "#2086C9"
        );
        this.builder.addMxObject(mxObject);
    }

    visitDeploymentNode(deploymentNode: IDeploymentNode, params?: { parentId?: string }) {
        const mxObject = this.fromElementScope(
            params?.parentId ?? this.parentId,
            deploymentNode,
            this.view.elements.find(x => x.id === deploymentNode.identifier)
        );
        this.builder.addMxObject(mxObject);
    }

    visitInfrastructureNode(infrastructureNode: IInfrastructureNode, params?: { parentId?: string; }) {
        throw new Error("Method not implemented.");
    }

    visitSoftwareSystemInstance(softwareSystemInstance: ISoftwareSystemInstance, params?: { parentId?: string; }) {
        throw new Error("Method not implemented.");
    }

    visitContainerInstance(containerInstance: IContainerInstance, params?: { parentId?: string; }) {
        throw new Error("Method not implemented.");
    }

    visitRelationship(relationship: IRelationship, params?: { parentId?: string }) {
        const mxObject: MxObject = {
            _placeholders: "1",
            _c4Type: "Relationship",
            _c4Technology: relationship.technology.join('/'),
            _c4Description: relationship.description,
            _label: ElementHtmlUtils.relationshipHtmlBuilder(relationship),
            _id: `${relationship.sourceIdentifier}_${relationship.targetIdentifier}`,
            mxCell: {
                _edge: "1",
                _parent: this.parentId,
                _source: relationship.sourceIdentifier,
                _target: relationship.targetIdentifier,
                _style: ElementHtmlUtils.formatEdgeStyle({
                    endArrow: EdgeArrowType.BlockThin,
                    endFill: 1,
                    elbow: "vertical",
                    endSize: 14,
                    fontSize: 10,
                    fontColor: "#404040",
                    html: true,
                    jumpStyle: "arc",
                    jumpSize: 16,
                    metaEdit: true,
                    rounded: false,
                    strokeWidth: 1,
                    strokeColor: "#828282",
                    startSize: 14
                }),
                mxGeometry: {
                    mxPoint: [
                        { _as: MXPointAs.SourcePoint },
                        { _as: MXPointAs.TargetPoint }
                    ],
                    _width: "240",
                    _relative: "1",
                    _as: MXGeometryAs.Geometry
                }
            }
        }
        this.builder.addMxObject(mxObject);
    }

    getMxObjects() {
        return [];
    }

    private isExternal(node: { tags: Tag[] }) {
        return node.tags.some(x => x.name === "External");
    }

    private fromElement(
        parent: string | undefined,
        node: IElement,
        position: IElementPosition | undefined,
        fillColor: string,
        strokeColor: string,
    ): MxObject {
        return {
            _placeholders: "1",
            _c4Name: node.name,
            _c4Type: node.tags[1].name,
            _c4Description: node.description,
            _c4Technology: node.technology.join(','),
            _label: ElementHtmlUtils.elementHtmlBuilder(node),
            _id: node.identifier,
            mxCell: {
                _parent: parent ?? "",
                _vertex: "1",
                _style: ElementHtmlUtils.formatNodeStyle({
                    align: NodeHorizontalAlign.Center,
                    arcSize: 10,
                    fontColor: "#ffffff",
                    fillColor: fillColor,
                    html: true,
                    labelBackgroundColor: "none",
                    metaEdit: true,
                    points: `[
                        [0.25,0,0],[0.5,0,0],[0.75,0,0],
                        [1,0.25,0],[1,0.5,0],[1,0.75,0],
                        [0.75,1,0],[0.5,1,0],[0.25,1,0],
                        [0,0.75,0],[0,0.5,0],[0,0.25,0]
                    ]`,
                    rounded: true,
                    resizable: false,
                    strokeColor: strokeColor,
                    whiteSpace: NodeWhiteSpaceType.Wrap
                }),
                mxGeometry: {
                    _x: position?.x.toString(),
                    _y: position?.y.toString(),
                    _width: "240",
                    _height: "120",
                    _as: MXGeometryAs.Geometry
                }
            }
        }
    }

    private fromElementScope(
        parent: string | undefined,
        node: IElement,
        position: IElementPosition | undefined
    ): MxObject {
        return {
            _placeholders: "1",
            _c4Name: node.name,
            _c4Type: "DeploymentNodeBoundary", // "ContainerScopeBoundary", "SystemScopeBoundary"
            _c4Application: node.tags[1].name,
            _c4Technology: node.technology.join(','),
            _label: ElementHtmlUtils.scopeHtmlBuilder(node),
            _id: node.identifier,
            mxCell: {
                _parent: parent ?? "",
                _vertex: "1",
                _style: ElementHtmlUtils.formatNodeStyle({
                    arcSize: 20,
                    align: NodeHorizontalAlign.Left,
                    allowArrows: false,
                    absoluteArcSize: 1,
                    connectable: false,
                    dashed: true,
                    dashPattern: "8 4",
                    expand: false,
                    editable: true,
                    fontSize: 11,
                    fillColor: "none",
                    fontColor: "#333333",
                    html: true,
                    labelBackgroundColor: "none",
                    labelBorderColor:"none",
                    labelPadding: 0,
                    metaEdit: true,
                    noLabel: false,
                    pointerEvents: false,
                    perimeter: "rectanglePerimeter",
                    points: `[
                        [0.25,0,0],[0.5,0,0],[0.75,0,0],
                        [1,0.25,0],[1,0.5,0],[1,0.75,0],
                        [0.75,1,0],[0.5,1,0],[0.25,1,0],
                        [0,0.75,0],[0,0.5,0],[0,0.25,0]
                    ]`,
                    rotatable: false,
                    recursiveResize: false,
                    rounded: true,
                    strokeColor: "#666666",
                    spacingTop: 0,
                    spacing: 10,
                    verticalAlign: NodeVerticalAlign.Bottom,
                    whiteSpace: NodeWhiteSpaceType.Wrap,
                }),
                mxGeometry: {
                    _x: position?.x.toString(),
                    _y: position?.y.toString(),
                    _width: position ? position["width"]?.toString() : undefined,
                    _height: position ? position["height"]?.toString() : undefined,
                    _as: MXGeometryAs.Geometry
                }
            }
        }
    }
}
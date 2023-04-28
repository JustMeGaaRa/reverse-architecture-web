import {
    MXGeometryAs,
    MXCell,
    MXPointAs,
    Drawio,
    MxObject,
    Diagram
} from "@justmegaara/mxgraph";
import {
    Element,
    Person,
    SoftwareSystem,
    Container,
    Component,
    DeploymentNode,
    Relationship,
    Workspace,
    SystemContextView,
    Layout,
    Tag,
    ComponentView,
    ContainerView,
    DeploymentView,
    IVisitor,
    IView,
    SystemContextViewStrategy,
    DeploymentViewStrategy,
    ComponentViewStrategy,
    ContainerViewStrategy
} from "@structurizr/dsl";
import { v4 } from "uuid";
import { XMLBuilder } from "fast-xml-parser";
import { ElementHtmlUtils } from "./utils";
import {
    EdgeArrowType,
    NodeHorizontalAlign,
    NodeVerticalAlign,
    NodeWhiteSpaceType
} from "./types";

export class MxGraphVisitor implements IVisitor {
    constructor(
        private workspace: Workspace,
        private view: IView,
        private parentId: string,
        private mxObjects: MxObject[] = [],
    ) {}

    visitPerson(person: Person) {
        const mxObject: MxObject = {
            _placeholders: "1",
            _c4Name: person.name,
            _c4Type: "Person",
            _c4Description: person.description,
            _label: ElementHtmlUtils.elementHtmlBuilder(person),
            _id: person.identifier,
            mxCell: {
                _parent: this.parentId,
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
                    _x: this.view.layout[person.identifier].x.toString(),
                    _y: this.view.layout[person.identifier].y.toString(),
                    _width: "200",
                    _height: "180",
                    _as: MXGeometryAs.Geometry
                }
            }
        }
        this.mxObjects.push(mxObject);
    }

    visitSoftwareSystem(softwareSystem: SoftwareSystem) {
        const mxObject = this.fromElement(
            this.parentId,
            softwareSystem,
            this.view.layout,
            this.isExternal(softwareSystem) ? "#8C8496" : "#1061B0",
            this.isExternal(softwareSystem) ? "#736782" : "#0D5091"
        );
        this.mxObjects.push(mxObject);
    }

    visitContainer(container: Container) {
        const mxObject = this.fromElement(
            this.parentId,
            container,
            this.view.layout,
            "#23A2D9",
            "#0E7DAD"
        );
        this.mxObjects.push(mxObject);
    }

    visitComponent(component: Component) {
        const mxObject = this.fromElement(
            this.parentId,
            component,
            this.view.layout,
            "#63BEF2",
            "#2086C9"
        );
        this.mxObjects.push(mxObject);
    }

    visitDeploymentNode(deploymentNode: DeploymentNode) {
        const mxObject = this.fromElementScope(this.parentId, deploymentNode, this.view.layout);
        this.mxObjects.push(mxObject);
    }

    visitRelationship(relationship: Relationship) {
        const mxObject: MxObject = {
            _placeholders: "1",
            _c4Type: "Relationship",
            _c4Technology: relationship.technology?.map(x => x.name).join('/'),
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
        this.mxObjects.push(mxObject);
    }

    getMxObjects() {
        return this.mxObjects;
    }

    private isExternal(node: { tags: Tag[] }) {
        return node.tags.some(x => x.name === "External");
    }

    private fromElement(
        parent: string,
        node: Element,
        layout: Layout,
        fillColor: string,
        strokeColor: string,
    ): MxObject {
        return {
            _placeholders: "1",
            _c4Name: node.name,
            _c4Type: node.tags[1].name,
            _c4Description: node.description,
            _c4Technology: node.technology?.map(x => x.name).join(','),
            _label: ElementHtmlUtils.elementHtmlBuilder(node),
            _id: node.identifier,
            mxCell: {
                _parent: parent,
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
                    _x: layout[node.identifier].x.toString(),
                    _y: layout[node.identifier].y.toString(),
                    _width: "240",
                    _height: "120",
                    _as: MXGeometryAs.Geometry
                }
            }
        }
    }

    private fromElementScope(
        parent: string,
        node: Element,
        layout: Layout
    ): MxObject {
        return {
            _placeholders: "1",
            _c4Name: node.name,
            _c4Type: "DeploymentNodeBoundary", // "ContainerScopeBoundary", "SystemScopeBoundary"
            _c4Application: node.tags[1].name,
            _c4Technology: node.technology?.map(x => x.name).join(','),
            _label: ElementHtmlUtils.scopeHtmlBuilder(node),
            _id: node.identifier,
            mxCell: {
                _parent: parent,
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
                    _x: layout[node.identifier].x.toString(),
                    _y: layout[node.identifier].y.toString(),
                    _width: layout[node.identifier].width.toString(),
                    _height: layout[node.identifier].height.toString(),
                    _as: MXGeometryAs.Geometry
                }
            }
        }
    }
}

const createDefaultDiagram = (
    view: IView,
    mxCells?: MXCell[],
    mxObjects?: MxObject[]
): Diagram => {

    return {
        _id: v4(),
        _name: `[${view.type}] ${view.title}`,
        mxGraphModel: {
            _grid: "1",
            _gridSize: "10",
            _guides: "1",
            _tooltips: "1",
            _connect: "1",
            _arrows: "1",
            _fold: "1",
            _page: "0",
            _pageScale: "1",
            _pageWidth: "1000",
            _pageHeight: "1000",
            _math: "0",
            _shadow: "0",
            root: {
                mxCell: mxCells ?? [],
                object: mxObjects ?? []
            }
        }
    };
}

const fromSystemContextView = (
    workspace: Workspace,
    view: SystemContextView
): Diagram => {
    const defaultParent: MXCell = {
        _id: v4()
    };
    const defaultParent1: MXCell = {
        _id: v4(),
        _parent: defaultParent._id
    };
    const visitor = new MxGraphVisitor(workspace, view, defaultParent1._id);
    const builder = new SystemContextViewStrategy(workspace, view);
    builder.accept(visitor);
    return createDefaultDiagram(view, [defaultParent, defaultParent1], visitor.getMxObjects());
}

const fromContainerView = (
    workspace: Workspace,
    view: ContainerView
): Diagram => {
    const defaultParent: MXCell = {
        _id: v4()
    };
    const defaultParent1: MXCell = {
        _id: v4(),
        _parent: defaultParent._id
    };
    const visitor = new MxGraphVisitor(workspace, view, defaultParent1._id);
    const builder = new ContainerViewStrategy(workspace, view);
    builder.accept(visitor);
    return createDefaultDiagram(view, [defaultParent, defaultParent1], visitor.getMxObjects());
}

const fromComponentView = (
    workspace: Workspace,
    view: ComponentView
): Diagram => {
    const defaultParent: MXCell = {
        _id: v4()
    };
    const defaultParent1: MXCell = {
        _id: v4(),
        _parent: defaultParent._id
    };
    const visitor = new MxGraphVisitor(workspace, view, defaultParent1._id);
    const builder = new ComponentViewStrategy(workspace, view);
    builder.accept(visitor);
    return createDefaultDiagram(view, [defaultParent, defaultParent1], visitor.getMxObjects());
}

const fromDeploymentView = (
    workspace: Workspace,
    view: DeploymentView
): Diagram => {
    const defaultParent: MXCell = {
        _id: v4()
    };
    const defaultParent1: MXCell = {
        _id: v4(),
        _parent: defaultParent._id
    };
    const visitor = new MxGraphVisitor(workspace, view, defaultParent1._id);
    const builder = new DeploymentViewStrategy(workspace, view, view["environment"]);
    builder.accept(visitor);
    return createDefaultDiagram(view, [defaultParent, defaultParent1], visitor.getMxObjects());
}

export function exportToDrawio(workspace: Workspace): File {
    const drawio: Drawio = {
        mxfile: {
            _modified: new Date(),
            _etag: v4(),
            _compressed: false,
            _pages: "1",
            _agent: "Reverse Architecture (Web)",
            _host: "reversearchitecture.io",
            _type: "browser",
            diagram: [
                ...workspace.views.systemContexts.map(view => fromSystemContextView(workspace, view)),
                ...workspace.views.containers.map(view => fromContainerView(workspace, view)),
                ...workspace.views.components.map(view => fromComponentView(workspace, view)),
                ...workspace.views.deployments.map(view => fromDeploymentView(workspace, view))
            ]
        }
    };

    const xmlBuilder = new XMLBuilder({
        ignoreAttributes: false,
        attributeNamePrefix: "_",
        format: true,
        suppressEmptyNode: true
    });
    
    const xml = xmlBuilder.build(drawio);
    const filename = workspace.name ?? "Workspace";
    return new File([xml], `${filename}.drawio`);
}

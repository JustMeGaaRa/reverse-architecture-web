export enum NodeHorizontalAlign {
    Left = "left",
    Center = "center",
    Right = "right"
}

export enum NodeVerticalAlign {
    Top = "top",
    Middle = "middle",
    Bottom = "bottom"
}

export enum NodeWhiteSpaceType {
    Wrap = "wrap"
}

export type NodeStyle = {
    labelBackgroundColor: string;
    rounded: boolean;
    whiteSpace: NodeWhiteSpaceType;
    html: boolean;
    fillColor: string;
    strokeColor: string;
    dashed: boolean;
    fontSize: number;
    fontColor: string;
    align: NodeHorizontalAlign;
    verticalAlign: NodeVerticalAlign;
    comic: boolean;
    resizable: boolean;
    shape: string;
    metaEdit: boolean;
    points: string | Array<[number, number, number]>;
    arcSize: number;
    labelBorderColor: string;
    spacingTop: number;
    spacing: number;
    dashPattern: string;
    rotatable: boolean;
    perimeter: string;
    noLabel: boolean;
    labelPadding: number;
    allowArrows: boolean;
    connectable: boolean;
    expand: boolean;
    recursiveResize: boolean;
    editable: boolean;
    pointerEvents: boolean;
    absoluteArcSize: number;
}

export enum EdgeArrowType {
    Classic = "classic",
    ClassicThin = "classicThin",
    Open = "open",
    OpenThin = "openThin",
    OpenAsync = "openAsync",
    Block = "block",
    BlockThin = "blockThin",
    Async = "async"
}

export enum EdgeStyleType {
    StraightEdgeStyle = "straightEdgeStyle",
    OrthogonalEdgeStyle = "orthogonalEdgeStyle",
    ElbowEdgeStyle = "elbowEdgeStyle",
    IsometricEdgeStyle = "isometricEdgeStyle"
}

export type EdgeStyle = {
    endArrow: EdgeArrowType;
    html: boolean;
    rounded: boolean;
    flowAnimation: boolean;
    labelBackgroundColor: string;
    dashed: boolean;
    edgeStyle: EdgeStyleType;
    curved: boolean;
    fontSize: number;
    fontColor: string;
    strokeWidth: number;
    endFill: number;
    strokeColor: string;
    elbow: string;
    metaEdit: boolean;
    endSize: number;
    startSize: number;
    jumpStyle: string;
    jumpSize: number;
}
export interface Drawio {
    mxfile: Mxfile;
}

export interface Mxfile {
    diagram: Diagram[];
    _host?: string;
    _modified: string;
    _agent?: string;
    _etag: string;
    _compressed: boolean;
    _version?: string;
    _type?: string;
    _pages: string;
}

export interface Diagram {
    mxGraphModel: MXGraphModel;
    _id: string;
    _name: string;
}

export interface MXGraphModel {
    root: Root;
    _dx?: string;
    _dy?: string;
    _grid: string;
    _gridSize: string;
    _guides: string;
    _tooltips: string;
    _connect: string;
    _arrows: string;
    _fold: string;
    _page: string;
    _pageScale: string;
    _pageWidth: string;
    _pageHeight: string;
    _math: string;
    _shadow: string;
}

export interface Root {
    mxCell: MXCell[];
}

export interface MXCell {
    mxGeometry?: MXGeometry;
    _id: string;
    _parent?: string;
    _value?: string;
    _style?: string;
    _vertex?: string;
    _connectable?: string;
    _source?: string;
    _target?: string;
    _edge?: string;
}

export interface MXGeometry {
    mxPoint?: MXPoint[];
    _x?: string;
    _y?: string;
    _width: string;
    _height: string;
    _as: MXGeometryAs;
    _relative?: string;
}

export enum MXGeometryAs {
    Geometry = "geometry"
}

export interface MXPoint {
    _x: string;
    _y?: string;
    _as: MXPointAs;
}

export enum MXPointAs {
    SourcePoint = "sourcePoint",
    TargetPoint = "targetPoint"
}

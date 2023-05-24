import { MxDiagram } from "./MxDiagram";

export interface Mxfile {
    diagram:     MxDiagram[];
    _compressed: boolean;
    _host:       string;
    _modified:   Date;
    _agent:      string;
    _version?:   string;
    _etag:       string;
    _type:       string;
    _pages:      string;
}

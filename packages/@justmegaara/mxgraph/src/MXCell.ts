import { MXGeometry } from "./MXGeometry";


export interface MXCell {
    mxGeometry?: MXGeometry;
    _id?: string;
    _parent?: string;
    _value?: string;
    _style?: string;
    _vertex?: string;
    _edge?: string;
    _connectable?: string;
    _source?: string;
    _target?: string;
}

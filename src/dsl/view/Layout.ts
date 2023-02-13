import { Identifier } from "../model/Identifier";
import { Dimension } from "./Dimension";


export interface Layout {
    [identifier: Identifier]: Dimension;
}

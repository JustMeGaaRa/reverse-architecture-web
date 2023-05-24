import { IVisitor } from "./IVisitor";

export interface ISupportVisitor {
    accept(visitor: IVisitor): void;
}
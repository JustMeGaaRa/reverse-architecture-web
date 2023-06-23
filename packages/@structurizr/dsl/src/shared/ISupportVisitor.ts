import { IElementVisitor } from "./IElementVisitor";

export interface ISupportVisitor {
    accept(visitor: IElementVisitor): void;
}
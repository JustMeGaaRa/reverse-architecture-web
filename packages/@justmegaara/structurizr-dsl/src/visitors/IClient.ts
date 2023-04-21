import { IVisitor } from "./IVisitor";

export interface IClient {
    accept: (visitor: IVisitor) => void;
}
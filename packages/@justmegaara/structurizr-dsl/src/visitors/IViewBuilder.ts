import { ViewPath } from "../view/ViewPath";
import { IVisitor } from "./IVisitor";

export interface ViewBuilderResult {
    viewPath: ViewPath;
}

export interface IViewBuilder {
    build: (visitor: IVisitor) => ViewBuilderResult;
}
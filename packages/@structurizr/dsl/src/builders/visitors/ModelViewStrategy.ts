import {
    IElementVisitor,
    ISupportVisitor,
    IModel
} from "../..";

export class ModelViewStrategy implements ISupportVisitor {
    constructor(
        private model: IModel,
    ) {}

    accept(visitor: IElementVisitor): void {
        // TODO: implement strategy for model
    }
}
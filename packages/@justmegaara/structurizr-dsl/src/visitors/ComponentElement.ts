import { Component } from "../model/Component";
import { IElement } from "./IElement";
import { IVisitor } from "./IVisitor";

export class ComponentElement implements IElement {
    constructor(
        private component: Component
    ) {}

    accept(visitor: IVisitor): void {
        visitor.visitComponent(this.component);
    }
}
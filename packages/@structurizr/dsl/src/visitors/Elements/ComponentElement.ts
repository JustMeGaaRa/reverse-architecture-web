import { Component } from "../../types/model/Component";
import { IElement } from "../../shared/IElement";
import { IVisitor } from "../../shared/IVisitor";

export class ComponentElement implements IElement {
    constructor(
        private component: Component,
        private parentId?: string
    ) {}

    accept(visitor: IVisitor): void {
        visitor.visitComponent(this.component, { parentId: this.parentId });
    }
}
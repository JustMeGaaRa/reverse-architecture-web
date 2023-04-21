import { Person } from "../model/Person";
import { IElement } from "./IElement";
import { IVisitor } from "./IVisitor";

export class PersonElement implements IElement {
    constructor(
        private person: Person
    ) {}

    accept(visitor: IVisitor): void {
        visitor.visitPerson(this.person);
    }
}
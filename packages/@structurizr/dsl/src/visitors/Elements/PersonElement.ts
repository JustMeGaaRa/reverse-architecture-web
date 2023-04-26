import { IElement } from "../../shared/IElement";
import { IVisitor } from "../../shared/IVisitor";
import { Person } from "../../types/model/Person";

export class PersonElement implements IElement {
    constructor(
        private person: Person
    ) {}

    accept(visitor: IVisitor): void {
        visitor.visitPerson(this.person);
    }
}
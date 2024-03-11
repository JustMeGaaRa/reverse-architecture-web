import {
    IViewDefinition,
    IElementVisitor,
    ISupportVisitor,
    IModel,
} from "../interfaces";
import { elementIncludedInView, getRelationships, relationshipExistsForElementsInView, relationshipExistsOverall } from "../utils";

export class SystemContextViewStrategy implements ISupportVisitor {
    constructor(
        private model: IModel,
        private view: IViewDefinition,
    ) {}

    accept(visitor: IElementVisitor): void {
        const elementsInView = [];
        const relationships = getRelationships(this.model, true);
        const people = this.model.groups
            .flatMap(x => x.people)
            .concat(this.model.people);
        const softwareSystems = this.model.groups
            .flatMap(x => x.softwareSystems)
            .concat(this.model.softwareSystems);

        softwareSystems
            .filter(softwareSystem => softwareSystem.identifier === this.view.identifier)
            .forEach(softwareSystem => {
                // 2.1.1. include the current software and all software systems
                visitor.visitSoftwareSystem(softwareSystem);
                elementsInView.push(softwareSystem.identifier);
                
                // 2.1.2. include all people that are directly connected to the current software system
                people
                    .filter(person => {
                        return relationshipExistsOverall(relationships, softwareSystem.identifier, person.identifier)
                            || elementIncludedInView(this.view, person.identifier)
                    })
                    .forEach(person => {
                        visitor.visitPerson(person);
                        elementsInView.push(person.identifier);
                    });
                
                // 2.1.3. include all software systems that are directly connected to the current container
                softwareSystems
                    .filter(softwareSystem => {
                        return relationshipExistsOverall(relationships, this.view.identifier, softwareSystem.identifier)
                            || elementIncludedInView(this.view, softwareSystem.identifier)
                    })
                    .forEach(softwareSystem => {
                        visitor.visitSoftwareSystem(softwareSystem);
                        elementsInView.push(softwareSystem.identifier);
                    });
            });

        relationships
            .filter(relationship => relationshipExistsForElementsInView(elementsInView, relationship))
            .forEach(relationship => visitor.visitRelationship(relationship));
    }
}
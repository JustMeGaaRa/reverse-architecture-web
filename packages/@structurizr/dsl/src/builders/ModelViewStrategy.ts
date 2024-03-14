import { IElementVisitor, IModel, ISupportVisitor } from "../interfaces";
import { RelationshipType } from "../types";

export class ModelViewStrategy implements ISupportVisitor {
    constructor(
        private model: IModel,
    ) {}

    accept(visitor: IElementVisitor): void {
        this.model.groups
            .flatMap(group => group.softwareSystems)
            .concat(this.model.softwareSystems)
            .forEach((softwareSystem, index) => {
                softwareSystem.groups
                    .flatMap(group => group.containers)
                    .concat(softwareSystem.containers)
                    .forEach((container, index) => {
                        container.groups
                            .flatMap(group => group.components)
                            .concat(container.components)
                            .forEach((component, index) => {
                                visitor.visitComponent(component)
                                visitor.visitRelationship({
                                    type: RelationshipType.Relationship,
                                    sourceIdentifier: container.identifier,
                                    targetIdentifier: component.identifier,
                                    tags: []
                                })
                            });
                        
                        visitor.visitContainer(container)
                        visitor.visitRelationship({
                            type: RelationshipType.Relationship,
                            sourceIdentifier: softwareSystem.identifier,
                            targetIdentifier: container.identifier,
                            tags: []
                        })
                    });
                
                visitor.visitSoftwareSystem(softwareSystem)
                visitor.visitRelationship({
                    type: RelationshipType.Relationship,
                    sourceIdentifier: "workspace",
                    targetIdentifier: softwareSystem.identifier,
                    tags: []
                })
            });
        
        this.model.people
            .forEach((person, index) => {    
                visitor.visitPerson(person)
                visitor.visitRelationship({
                    type: RelationshipType.Relationship,
                    sourceIdentifier: "workspace",
                    targetIdentifier: person.identifier,
                    tags: []
                })
            });
    }
}
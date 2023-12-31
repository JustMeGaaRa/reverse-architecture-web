import {
    IElementVisitor,
    ISupportVisitor,
    IModel,
    Relationship
} from "../..";

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
                                visitor.visitRelationship(
                                    new Relationship({
                                        sourceIdentifier: container.identifier,
                                        targetIdentifier: component.identifier,
                                    })
                                )
                            });
                        
                        visitor.visitContainer(container)
                        visitor.visitRelationship(
                            new Relationship({
                                sourceIdentifier: softwareSystem.identifier,
                                targetIdentifier: container.identifier,
                            })
                        )
                    });
                
                visitor.visitSoftwareSystem(softwareSystem)
                visitor.visitRelationship(
                    new Relationship({
                        sourceIdentifier: "workspace",
                        targetIdentifier: softwareSystem.identifier,
                    })
                )
            });
        
        this.model.people
            .forEach((person, index) => {    
                visitor.visitPerson(person)
                visitor.visitRelationship(
                    new Relationship({
                        sourceIdentifier: "workspace",
                        targetIdentifier: person.identifier,
                    })
                )
            });
    }
}
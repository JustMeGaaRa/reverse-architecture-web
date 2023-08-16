import {
    IViewDefinition,
    IElementVisitor,
    relationshipExists,
    ISupportVisitor,
    getRelationships,
    hasRelationship,
    IPerson,
    ISoftwareSystem,
    IModel
} from "../..";

export class SystemContextViewStrategy implements ISupportVisitor {
    constructor(
        private model: IModel,
        private view: IViewDefinition,
    ) {}

    accept(visitor: IElementVisitor): void {
        const relationships = getRelationships(this.model, true);

        const visitSoftwareSystem = (
            people: Array<IPerson>,
            softwareSystems: Array<ISoftwareSystem>,
            parentId?: string
        ) => {
            // 2.1. iterate over all software systems and find software system for the view
            softwareSystems
                .filter(softwareSystem => softwareSystem.identifier === this.view.identifier)
                .forEach(softwareSystem => {
                    // 2.1.1. include the current software and all software systems
                    visitor.visitSoftwareSystem(softwareSystem, { parentId });
                    
                    // 2.1.2. include all people that are directly connected to the current software system
                    people
                        .filter(person => relationshipExists(relationships, softwareSystem.identifier, person.identifier))
                        .forEach(person => visitor.visitPerson(person, { parentId }));
                    
                    // 2.1.3. include all software systems that are directly connected to the current container
                    softwareSystems
                        .filter(softwareSystem => relationshipExists(relationships, this.view.identifier, softwareSystem.identifier))
                        .forEach(softwareSystem => visitor.visitSoftwareSystem(softwareSystem, { parentId }));
                });
        }

        // 1.1. iterate over all groups and find software system for the view
        this.model.groups
            .forEach(group => {
                visitor.visitGroup(group);

                visitSoftwareSystem(
                    group.people.concat(this.model.people),
                    group.softwareSystems.concat(this.model.softwareSystems),
                    group.identifier
                );
            });

        // 1.2. iterate over all software systems and find software system for the view
        visitSoftwareSystem(
            this.model.people,
            this.model.softwareSystems
        );

        relationships
            .filter(relationship => hasRelationship(this.view, relationship.sourceIdentifier, relationship.targetIdentifier))
            .forEach(relationship => visitor.visitRelationship(relationship));
    }
}
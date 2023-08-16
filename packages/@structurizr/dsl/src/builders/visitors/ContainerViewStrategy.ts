import {
    IViewDefinition,
    IElementVisitor,
    relationshipExists,
    ISupportVisitor,
    getRelationships,
    hasRelationship,
    IPerson,
    ISoftwareSystem,
    IContainer,
    IModel
} from "../..";

export class ContainerViewStrategy implements ISupportVisitor {
    constructor(
        private model: IModel,
        private view: IViewDefinition,
    ) {}

    accept(visitor: IElementVisitor): void {
        const relationships = getRelationships(this.model, true);

        const visitContainer = (
            people: Array<IPerson>,
            softwareSystems: Array<ISoftwareSystem>,
            containers: Array<IContainer>,
            parentId?: string
        ) => {
            // 3.1. iterate over all containers and include them
            containers
                .forEach(container => {
                    // 3.1.1. include the container
                    visitor.visitContainer(container, { parentId });

                    // 3.1.2. include all people that are directly connected to the current container
                    people
                        .filter(person => relationshipExists(relationships, container.identifier, person.identifier))
                        .forEach(person => visitor.visitPerson(person));
                    
                    // 3.1.3. include all software systems that are directly connected to the current container
                    softwareSystems
                        .filter(softwareSystem => relationshipExists(relationships, container.identifier, softwareSystem.identifier))
                        .forEach(softwareSystem => visitor.visitSoftwareSystem(softwareSystem));
                })
        }

        const visitSoftwareSystem = (
            people: Array<IPerson>,
            softwareSystems: Array<ISoftwareSystem>,
            parentId?: string
        ) => {
            // 2.1. iterate over all software systems and find software system for the view
            softwareSystems
                .filter(softwareSystem => softwareSystem.identifier === this.view.identifier)
                .forEach(softwareSystem => {
                    // 2.1.1. include the software system as a boundary element
                    visitor.visitSoftwareSystem(softwareSystem);

                    // 2.1.2. iterate over all groups in the software system
                    softwareSystem.groups
                        .forEach(group => {
                            // 2.1.2.1 include the container group as a boundary element
                            visitor.visitGroup(group, { parentId: softwareSystem.identifier });
                            
                            // 2.1.2.2 include all containers in the group
                            visitContainer(
                                people,
                                softwareSystems,
                                group.containers,
                                group.identifier
                            );
                        });

                    // 2.1.3. include all containers in the software system
                    visitContainer(
                        people,
                        softwareSystems,
                        softwareSystem.containers,
                        softwareSystem.identifier
                    );
                })
        }

        // 1.1. iterate over all groups and find software system for the view
        this.model.groups
            .forEach(group => visitSoftwareSystem(
                group.people.concat(this.model.people),
                group.softwareSystems.concat(this.model.softwareSystems),
                group.identifier
            ));

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
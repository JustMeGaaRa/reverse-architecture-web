import {
    IContainer,
    IContainerView,
    IElementVisitor,
    IModel,
    IPerson,
    ISoftwareSystem,
    ISupportVisitor
} from "../interfaces";
import {
    elementIncludedInView,
    getRelationships,
    relationshipExistsForElementsInView,
    relationshipExistsOverall
} from "../utils";

export class ContainerViewStrategy implements ISupportVisitor {
    constructor(
        private model: IModel,
        private view: IContainerView,
    ) {}

    accept(visitor: IElementVisitor): void {

        const visitContainerArray = (
            people: Array<IPerson>,
            softwareSystems: Array<ISoftwareSystem>,
            containers: Array<IContainer>,
            parentId?: string
        ) => {
            // 3.1. iterate over all containers and include them
            containers.forEach(container => {
                // 3.1.1. include the container
                visitor.visitContainer(container, { parentId });
                visitedElements.add(container.identifier);

                // 3.1.2. include all people that are directly connected to the current container
                people
                    .filter(person => {
                        return relationshipExistsOverall(relationships, container.identifier, person.identifier)
                            || elementIncludedInView(this.view, person.identifier)
                    })
                    .filter(person => !visitedElements.has(person.identifier))
                    .forEach(person => {
                        visitor.visitPerson(person);
                        visitedElements.add(person.identifier);
                    });
                
                // 3.1.3. include all software systems that are directly connected to the current container
                softwareSystems
                    .filter(softwareSystem => {
                        return relationshipExistsOverall(relationships, container.identifier, softwareSystem.identifier)
                            || elementIncludedInView(this.view, softwareSystem.identifier)
                    })
                    .filter(softwareSystem => !visitedElements.has(softwareSystem.identifier))
                    .forEach(softwareSystem => {
                        visitor.visitSoftwareSystem(softwareSystem);
                        visitedElements.add(softwareSystem.identifier);
                    });
            });
        }
        
        const visitedElements = new Set<string>();
        const relationships = getRelationships(this.model, true);
        const people = this.model.groups
            .flatMap(x => x.people)
            .concat(this.model.people);
        const softwareSystems = this.model.groups
            .flatMap(x => x.softwareSystems)
            .concat(this.model.softwareSystems);

        // 2.1. iterate over all software systems and find software system for the view
        softwareSystems
            .filter(softwareSystem => softwareSystem.identifier === this.view.softwareSystemIdentifier)
            .forEach(softwareSystem => {
                // 2.1.1. include the software system as a boundary element
                visitor.visitSoftwareSystem(softwareSystem);
                visitedElements.add(softwareSystem.identifier);

                // 2.1.2. iterate over all groups in the software system
                softwareSystem.groups.forEach(group => {
                    // 2.1.2.1 include the container group as a boundary element
                    visitor.visitGroup(group, { parentId: softwareSystem.identifier });
                    visitedElements.add(group.identifier);
                    
                    // 2.1.2.2 include all containers in the group
                    visitContainerArray(
                        people,
                        softwareSystems,
                        group.containers,
                        group.identifier
                    );
                });

                // 2.1.3. include all containers in the software system
                visitContainerArray(
                    people,
                    softwareSystems,
                    softwareSystem.containers,
                    softwareSystem.identifier
                );
            })
        
        relationships
            .filter(relationship => relationshipExistsForElementsInView(Array.from(visitedElements), relationship))
            .forEach(relationship => visitor.visitRelationship(relationship));
    }
}
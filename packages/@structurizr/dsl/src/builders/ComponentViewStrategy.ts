import {
    IComponent,
    IComponentView,
    IContainer,
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

export class ComponentViewStrategy implements ISupportVisitor {
    constructor(
        private model: IModel,
        private view: IComponentView,
    ) {}

    accept(visitor: IElementVisitor): void {
        const visitComponent = (
            people: Array<IPerson>,
            softwareSystems: Array<ISoftwareSystem>,
            containers: Array<IContainer>,
            components: Array<IComponent>,
            parentId?: string
        ) => {
            // 4.1. iterate over all components and include them
            components.forEach(component => {
                // 4.1.1. include the component
                visitor.visitComponent(component, { parentId });
                visitedElements.add(component.identifier);
                
                // 4.1.2. include all people that are directly connected to the current component
                people
                    .filter(person => {
                        return relationshipExistsOverall(relationships, component.identifier, person.identifier)
                            || elementIncludedInView(this.view, person.identifier)
                    })
                    .filter(person => !visitedElements.has(person.identifier))
                    .forEach(person => {
                        visitor.visitPerson(person);
                        visitedElements.add(person.identifier);
                    });

                // 4.1.3. include all software systems that are directly connected to the current component
                softwareSystems
                    .filter(softwareSystem => {
                        return relationshipExistsOverall(relationships, component.identifier, softwareSystem.identifier)
                            || elementIncludedInView(this.view, softwareSystem.identifier)
                    })
                    .filter(softwareSystem => !visitedElements.has(softwareSystem.identifier))
                    .forEach(softwareSystem => {
                        visitor.visitSoftwareSystem(softwareSystem);
                        visitedElements.add(softwareSystem.identifier);
                    });

                // 4.1.4. include all containers that are directly connected to the current container
                containers
                    .filter(container => {
                        return relationshipExistsOverall(relationships, component.identifier, container.identifier)
                            || elementIncludedInView(this.view, container.identifier)
                    })
                    .filter(container => !visitedElements.has(container.identifier))
                    .forEach(container => {
                        visitor.visitContainer(container);
                        visitedElements.add(container.identifier);
                    });
            });
        }
        
        const visitedElements = new Set<string>();
        const relationships = getRelationships(this.model, true);
        const people = this.model.people
            .concat(this.model.groups.flatMap(x => x.people));
        const softwareSystems = this.model.softwareSystems
            .concat(this.model.groups.flatMap(x => x.softwareSystems));
        const containers = softwareSystems
            .flatMap(x => x.groups.flatMap(y => y.containers))
            .concat(softwareSystems.flatMap(x => x.containers));
        
        // 3.1. iterate over all containers to find the one for the view
        containers
            .filter(container => container.identifier === this.view.containerIdentifier)
            .forEach(container => {
                // 3.1.1. include the current container
                visitor.visitContainer(container);
                visitedElements.add(container.identifier);

                // 3.1.2. iterate over all groups in the container 
                container.groups.forEach(group => {
                    // 3.1.2.1. include the component group as a boundary element
                    visitor.visitGroup(group, { parentId: container.identifier });
                    visitedElements.add(group.identifier);

                    // 3.1.2.2. include all components in the group
                    visitComponent(
                        people,
                        softwareSystems,
                        containers,
                        group.components,
                        group.identifier
                    );
                });

                // 3.1.3. include all components in the container
                visitComponent(
                    people,
                    softwareSystems,
                    containers,
                    container.components,
                    container.identifier
                );
            })
        
        relationships
            .filter(relationship => relationshipExistsForElementsInView(Array.from(visitedElements), relationship))
            .forEach(relationship => visitor.visitRelationship(relationship));
    }
}
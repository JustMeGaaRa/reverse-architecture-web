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
    IComponent,
    IModel
} from "../..";

export class ComponentViewStrategy implements ISupportVisitor {
    constructor(
        private model: IModel,
        private view: IViewDefinition,
    ) {}

    accept(visitor: IElementVisitor): void {
        const relationships = getRelationships(this.model, true);

        const visitComponent = (
            people: Array<IPerson>,
            softwareSystems: Array<ISoftwareSystem>,
            containers: Array<IContainer>,
            components: Array<IComponent>,
            parentId?: string
        ) => {
            // 4.1. iterate over all components and include them
            components
                .forEach(component => {
                    // 4.1.1. include the component
                    visitor.visitComponent(component, { parentId });
                    
                    // 4.1.2. include all people that are directly connected to the current component
                    people
                        .filter(person => relationshipExists(relationships, component.identifier, person.identifier))
                        .forEach(person => visitor.visitPerson(person));

                    // 4.1.3. include all software systems that are directly connected to the current component
                    softwareSystems
                        .filter(softwareSystem => relationshipExists(relationships, component.identifier, softwareSystem.identifier))
                        .forEach(softwareSystem => visitor.visitSoftwareSystem(softwareSystem));

                    // 4.1.4. include all containers that are directly connected to the current container
                    containers
                        .filter(container => relationshipExists(relationships, component.identifier, container.identifier))
                        .forEach(container => visitor.visitContainer(container));
                });
        }

        const visitContainer = (
            people: Array<IPerson>,
            softwareSystems: Array<ISoftwareSystem>,
            containers: Array<IContainer>,
        ) => {
            // 3.1. iterate over all containers to find the one for the view
            containers
                .filter(container => container.identifier === this.view.identifier)
                .forEach(container => {
                    // 3.1.1. include the current container
                    visitor.visitContainer(container);

                    // 3.1.2. iterate over all groups in the container 
                    container.groups.forEach(group => {
                        // 3.1.2.1. include the component group as a boundary element
                        visitor.visitGroup(group, { parentId: container.identifier });

                        // 3.1.2.2. include all components in the group
                        visitComponent(
                            people,
                            softwareSystems,
                            containers,
                            group.components.concat(container.components),
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
        }

        const visitSoftwareSystem = (
            people: Array<IPerson>,
            softwareSystems: Array<ISoftwareSystem>
        ) => {
            // 2.1. iterate over all software systems
            softwareSystems.forEach(softwareSystem => {
                // 2.1.1. iterate over all groups in the software system
                softwareSystem.groups.forEach(group => {
                    visitContainer(
                        people,
                        softwareSystems,
                        group.containers.concat(softwareSystem.containers)
                    );
                });
                
                // 2.1.2. include all containers in the software systemZ
                visitContainer(
                    people,
                    softwareSystems,
                    softwareSystem.containers
                );
            });
        }

        // 1.1. iterate over all groups and find software system for the view
        this.model.groups.forEach(group => {
            visitSoftwareSystem(
                group.people.concat(this.model.people),
                group.softwareSystems.concat(this.model.softwareSystems)
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
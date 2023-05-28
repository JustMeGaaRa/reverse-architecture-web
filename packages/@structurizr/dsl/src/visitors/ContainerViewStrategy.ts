import {
    Container,
    Person,
    SoftwareSystem,
    IView,
    IVisitor,
    Workspace,
    relationshipExists,
    ISupportVisitor
} from "../";

export class ContainerViewStrategy implements ISupportVisitor {
    constructor(
        private workspace: Workspace,
        private view: IView,
    ) {}

    accept(visitor: IVisitor): void {
        const hasRelationship = (
            sourceIdentifier: string,
            targetIdentifier: string
        ) => {
            return this.view.elements.find(x => x.id === sourceIdentifier)
                && this.view.elements.find(x => x.id === targetIdentifier)
        }

        const visitContainer = (
            people: Array<Person>,
            softwareSystems: Array<SoftwareSystem>,
            containers: Array<Container>,
            parentId?: string
        ) => {
            // 3.1. iterate over all containers and include them
            containers
                .forEach(container => {
                    // 3.1.1. include the container
                    visitor.visitContainer(container, { parentId });

                    // 3.1.2. include all people that are directly connected to the current container
                    people
                        .filter(person => relationshipExists(this.workspace, container.identifier, person.identifier))
                        .forEach(person => visitor.visitPerson(person));
                    
                    // 3.1.3. include all software systems that are directly connected to the current container
                    softwareSystems
                        .filter(softwareSystem => relationshipExists(this.workspace, container.identifier, softwareSystem.identifier))
                        .forEach(softwareSystem => visitor.visitSoftwareSystem(softwareSystem));
                })
        }

        const visitSoftwareSystem = (
            people: Array<Person>,
            softwareSystems: Array<SoftwareSystem>
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
                                group.containers.concat(softwareSystem.containers),
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
        this.workspace.model.groups
            .forEach(group => visitSoftwareSystem(
                group.people.concat(this.workspace.model.people),
                group.softwareSystems.concat(this.workspace.model.softwareSystems)
            ));

        // 1.2. iterate over all software systems and find software system for the view
        visitSoftwareSystem(
            this.workspace.model.people,
            this.workspace.model.softwareSystems
        );
        
        this.workspace.model.relationships
            .filter(edge => hasRelationship(edge.sourceIdentifier, edge.targetIdentifier))
            .forEach(relationship => visitor.visitRelationship(relationship));
    }
}
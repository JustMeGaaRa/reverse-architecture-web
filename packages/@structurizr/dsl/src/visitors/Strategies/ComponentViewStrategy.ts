import { relationshipExists } from "../../utils/Formatting";
import {
    ComponentElement,
    ContainerElement,
    GroupElement,
    PersonElement,
    RelationshipElement,
    SoftwareSystemElement
} from "../Elements";
import {
    Person,
    SoftwareSystem,
    IView,
    IViewStrategy,
    IVisitor,
    ViewType,
    Workspace,
    Container,
    Component
} from "../../";

export class ComponentViewStrategy implements IViewStrategy {
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

        const visitComponent = (
            people: Array<Person>,
            softwareSystems: Array<SoftwareSystem>,
            containers: Array<Container>,
            components: Array<Component>
        ) => {
            // 4.1. iterate over all components and include them
            components
                .forEach(component => {
                    // 4.1.1. include the component
                    new ComponentElement(component).accept(visitor);
                    
                    // 4.1.2. include all people that are directly connected to the current component
                    people
                        .filter(person => relationshipExists(this.workspace, component.identifier, person.identifier))
                        .forEach(person => new PersonElement(person).accept(visitor));

                    // 4.1.3. include all software systems that are directly connected to the current component
                    softwareSystems
                        .filter(softwareSystem => relationshipExists(this.workspace, component.identifier, softwareSystem.identifier))
                        .forEach(softwareSystem => new SoftwareSystemElement(softwareSystem).accept(visitor));

                    // 4.1.4. include all containers that are directly connected to the current container
                    containers
                        .filter(container => relationshipExists(this.workspace, component.identifier, container.identifier))
                        .forEach(container => new ContainerElement(container).accept(visitor));
                });
        }

        const visitContainer = (
            people: Array<Person>,
            softwareSystems: Array<SoftwareSystem>,
            containers: Array<Container>,
        ) => {
            // 3.1. iterate over all containers to find the one for the view
            containers
                .filter(container => container.identifier === this.view.identifier)
                .forEach(container => {
                    // 3.1.1. include the current container
                    new ContainerElement(container).accept(visitor);

                    // 3.1.2. iterate over all groups in the container 
                    container.groups.forEach(group => {
                        // 3.1.2.1. include the component group as a boundary element
                        new GroupElement(group).accept(visitor);

                        // 3.1.2.2. include all components in the group
                        visitComponent(
                            people,
                            softwareSystems,
                            containers,
                            group.components.concat(container.components)
                        );
                    });

                    // 3.1.3. include all components in the container
                    visitComponent(
                        people,
                        softwareSystems,
                        containers,
                        container.components
                    );
                })
        }

        const visitSoftwareSystem = (
            people: Array<Person>,
            softwareSystems: Array<SoftwareSystem>
        ) => {
            // 2.1. iterate over all software systems
            softwareSystems
                .forEach(softwareSystem => {
                    // 2.1.1. iterate over all groups in the software system
                    softwareSystem.groups
                        .forEach(group => visitContainer(
                            people,
                            softwareSystems,
                            group.containers.concat(softwareSystem.containers)
                        ));
                    
                    // 2.1.2. include all containers in the software systemZ
                    visitContainer(
                        people,
                        softwareSystems,
                        softwareSystem.containers
                    );
                });
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
            .forEach(relationship => new RelationshipElement(relationship).accept(visitor));
    }

    getPath(): Array<IView> {
        for (let softwareSystem of this.workspace.model.softwareSystems) {
            for (let container of softwareSystem.containers) {
                if (container.identifier === this.view.identifier) {
                    return [
                        {
                            type: ViewType.SystemContext,
                            identifier: softwareSystem.identifier,
                            title: softwareSystem.name,
                            elements: []
                        },
                        {
                            type: ViewType.Container,
                            identifier: softwareSystem.identifier,
                            title: softwareSystem.name,
                            elements: []
                        },
                        {
                            type: ViewType.Component,
                            identifier: container.identifier,
                            title: container.name,
                            elements: []
                        }
                    ]
                }
            }
        }

        return [];
    }
}
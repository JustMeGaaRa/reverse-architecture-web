import {
    Person,
    SoftwareSystem,
    IView,
    IViewStrategy,
    IVisitor,
    ViewType,
    Workspace,
    relationshipExists
} from "../";

export class SystemContextViewStrategy implements IViewStrategy {
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

        const visitSoftwareSystem = (
            people: Array<Person>,
            softwareSystems: Array<SoftwareSystem>
        ) => {
            // 2.1. iterate over all software systems and find software system for the view
            softwareSystems
                .filter(softwareSystem => softwareSystem.identifier === this.view.identifier)
                .forEach(softwareSystem => {
                    // 2.1.1. include the current software and all software systems
                    visitor.visitSoftwareSystem(softwareSystem);
                    
                    // 2.1.2. include all people that are directly connected to the current software system
                    people
                        .filter(person => relationshipExists(this.workspace, softwareSystem.identifier, person.identifier))
                        .forEach(person => visitor.visitPerson(person));
                    
                    // 2.1.3. include all software systems that are directly connected to the current container
                    softwareSystems
                        .filter(softwareSystem => relationshipExists(this.workspace, this.view.identifier, softwareSystem.identifier))
                        .forEach(softwareSystem => visitor.visitSoftwareSystem(softwareSystem));
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
            .forEach(relationship => visitor.visitRelationship(relationship));
    }

    getPath(): Array<IView> {
        const softwareSystems = this.workspace.model.groups
            .flatMap(group => group.softwareSystems)
            .concat(this.workspace.model.softwareSystems);

        for (let softwareSystem of softwareSystems) {
            if (softwareSystem.identifier === this.view.identifier) {
                return [
                    {
                        type: ViewType.SystemContext,
                        identifier: softwareSystem.identifier,
                        title: softwareSystem.name,
                        elements: []
                    }
                ];
            }
        }

        return [];
    }
}
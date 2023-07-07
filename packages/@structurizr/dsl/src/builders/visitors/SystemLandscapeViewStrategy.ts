import {
    Person,
    SoftwareSystem,
    IViewDefinition,
    IElementVisitor,
    Workspace,
    ISupportVisitor
} from "../..";

export class SystemLandscapeViewStrategy implements ISupportVisitor {
    constructor(
        private workspace: Workspace,
        private view: IViewDefinition
    ) {}

    accept(visitor: IElementVisitor): void {
        const hasRelationship = (
            sourceIdentifier: string,
            targetIdentifier: string
        ) => {
            return this.view.elements.find(x => x.id === sourceIdentifier)
                && this.view.elements.find(x => x.id === targetIdentifier)
        }

        const visitSoftwareSystems = (
            people: Array<Person>,
            softwareSystems: Array<SoftwareSystem>,
            parentId?: string
        ) => {
            // 2.1. include all people
            people
                .forEach(person => visitor.visitPerson(person, { parentId }));

            // 2.1. include all software systems
            softwareSystems
                .forEach(softwareSystem => visitor.visitSoftwareSystem(softwareSystem, { parentId }));
        }

        // 1.1. iterate over all groups and find software system for the view
        this.workspace.model.groups
            .forEach(group => {
                // 1.1.1.1. include the software system group as a boundary element
                visitor.visitGroup(group);

                // 1.1.1.2. include people and software systems in the group
                visitSoftwareSystems(
                    group.people,
                    group.softwareSystems,
                    group.identifier
                );
            });

        // 1.2. iterate over all software systems and find software system for the view
        visitSoftwareSystems(
            this.workspace.model.people,
            this.workspace.model.softwareSystems
        );
        
        this.workspace.model.relationships
            .filter(edge => hasRelationship(edge.sourceIdentifier, edge.targetIdentifier))
            .forEach(relationship => visitor.visitRelationship(relationship));
    }
}
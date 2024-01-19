import {
    IViewDefinition,
    IElementVisitor,
    ISupportVisitor,
    relationshipExistsForElementsInView,
    getRelationships,
    IPerson,
    ISoftwareSystem,
    IModel
} from "../";

export class SystemLandscapeViewStrategy implements ISupportVisitor {
    constructor(
        private model: IModel,
        private view: IViewDefinition
    ) {}

    accept(visitor: IElementVisitor): void {
        const visitSoftwareSystems = (
            people: Array<IPerson>,
            softwareSystems: Array<ISoftwareSystem>,
            parentId?: string
        ) => {
            // 2.1. include all people
            people.forEach(person => {
                visitor.visitPerson(person, { parentId });
                elementsInView.push(person.identifier);
            });

            // 2.1. include all software systems
            softwareSystems.forEach(softwareSystem => {
                visitor.visitSoftwareSystem(softwareSystem, { parentId });
                elementsInView.push(softwareSystem.identifier);
            });
        }

        const elementsInView = [];
        const relationships = getRelationships(this.model, true);

        // 1.1. iterate over all groups and find software system for the view
        this.model.groups.forEach(group => {
            // 1.1.1.1. include the software system group as a boundary element
            visitor.visitGroup(group);
            elementsInView.push(group.identifier);

            // 1.1.1.2. include people and software systems in the group
            visitSoftwareSystems(
                group.people,
                group.softwareSystems,
                group.identifier
            );
        });

        // 1.2. iterate over all software systems and find software system for the view
        visitSoftwareSystems(
            this.model.people,
            this.model.softwareSystems
        );
        
        relationships
            .filter(relationship => relationshipExistsForElementsInView(elementsInView, relationship))
            .forEach(relationship => visitor.visitRelationship(relationship));
    }
}
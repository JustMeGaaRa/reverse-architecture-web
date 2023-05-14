import {
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
    Workspace
} from "../../";

export class SystemLandscapeViewStrategy implements IViewStrategy {
    constructor(
        private workspace: Workspace,
        private view: IView
    ) {}

    accept(visitor: IVisitor): void {
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
                .forEach(person => new PersonElement(person, parentId).accept(visitor));

            // 2.1. include all software systems
            softwareSystems
                .forEach(softwareSystem => new SoftwareSystemElement(softwareSystem, parentId).accept(visitor));
        }

        // 1.1. iterate over all groups and find software system for the view
        this.workspace.model.groups
            .forEach(group => {
                // 1.1.1.1. include the software system group as a boundary element
                new GroupElement(group).accept(visitor);

                // 1.1.1.2. include people and software systems in the group
                visitSoftwareSystems(
                    group.people,
                    group.softwareSystems,
                    group.identifier
                )
            });

        // 1.2. iterate over all software systems and find software system for the view
        visitSoftwareSystems(
            this.workspace.model.people,
            this.workspace.model.softwareSystems
        );
        
        this.workspace.model.relationships
            .filter(edge => hasRelationship(edge.sourceIdentifier, edge.targetIdentifier))
            .forEach(relationship => new RelationshipElement(relationship).accept(visitor));
    }

    getPath(): Array<IView> {
        return [{
            type: ViewType.SystemLandscape,
            identifier: this.workspace.name,
            title: this.workspace.name,
            elements: []
        }];
    }
}
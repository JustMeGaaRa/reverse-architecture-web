import {
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
            softwareSystems: Array<SoftwareSystem>
        ) => {
            // include all people that are directly connected to the current software system
            people
                .forEach(person => new PersonElement(person).accept(visitor));

            // include the current software and all software systems
            // that are directly connected to the current software system
            softwareSystems
                .forEach(softwareSystem => new SoftwareSystemElement(softwareSystem).accept(visitor));
        }

        this.workspace.model.groups
            .forEach(group => visitSoftwareSystems(
                group.people,
                group.softwareSystems
            ));

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
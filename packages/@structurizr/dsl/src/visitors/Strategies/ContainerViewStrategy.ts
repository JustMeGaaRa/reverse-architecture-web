import { relationshipExists } from "../../utils/Formatting";
import { Workspace } from "../../types/Workspace";
import { IVisitor } from "../../shared/IVisitor";
import {
    ContainerElement,
    PersonElement,
    RelationshipElement,
    SoftwareSystemElement
} from "../Elements";
import { ViewType } from "../../types/views/ViewType";
import { IViewStrategy } from "../../shared/IViewStrategy";
import { IView } from "../../shared/IView";

export class ContainerViewStrategy implements IViewStrategy {
    constructor(
        private workspace: Workspace,
        private view: IView,
    ) {}

    accept(visitor: IVisitor): void {
        this.workspace.model.softwareSystems
            .filter(softwareSystem => softwareSystem.identifier === this.view.identifier)
            .forEach(softwareSystem => {
                // include the current software system and all containers within it
                new SoftwareSystemElement(softwareSystem).accept(visitor);

                softwareSystem.containers.forEach(container => {
                    new ContainerElement(container).accept(visitor);

                    // include all people that are directly connected to the current container
                    this.workspace.model.people
                        .filter(person => relationshipExists(this.workspace, container.identifier, person.identifier))
                        .forEach(person => new PersonElement(person).accept(visitor));
                    
                    // include all software systems that are directly connected to the current container
                    this.workspace.model.softwareSystems
                        .filter(softwareSystem => relationshipExists(this.workspace, container.identifier, softwareSystem.identifier))
                        .forEach(softwareSystem => new SoftwareSystemElement(softwareSystem).accept(visitor));
                });
            });
        
        this.workspace.model.relationships
            .filter(edge => this.view.layout[edge.sourceIdentifier] && this.view.layout[edge.targetIdentifier])
            .forEach(relationship => new RelationshipElement(relationship).accept(visitor));
    }

    getPath(): Array<IView> {
        for (let softwareSystem of this.workspace.model.softwareSystems) {
            if (softwareSystem.identifier === this.view.identifier) {
                return [
                    {
                        type: ViewType.SystemContext,
                        identifier: softwareSystem.identifier,
                        title: softwareSystem.name,
                        layout: {}
                    },
                    {
                        type: ViewType.Container,
                        identifier: softwareSystem.identifier,
                        title: softwareSystem.name,
                        layout: {}
                    }
                ]
            }
        }

        return [];
    }
}
import { relationshipExists } from "../../utils/Formatting";
import { Workspace } from "../../types/Workspace";
import { IVisitor } from "../../shared/IVisitor";
import {
    PersonElement,
    RelationshipElement,
    SoftwareSystemElement
} from "../Elements";
import { ViewType } from "../../types/views/ViewType";
import { IViewStrategy } from "../../shared/IViewStrategy";
import { IView } from "../../shared/IView";

export class SystemContextViewStrategy implements IViewStrategy {
    constructor(
        private workspace: Workspace,
        private view: IView,
    ) {}

    accept(visitor: IVisitor): void {
        this.workspace.model.softwareSystems
            .filter(softwareSystem => softwareSystem.identifier === this.view.identifier)
            .forEach(softwareSystem => {
                // include the current software and all software systems
                // that are directly connected to the current software system
                new SoftwareSystemElement(softwareSystem).accept(visitor);

                // include all people that are directly connected to the current software system
                this.workspace.model.people
                    .filter(person => relationshipExists(this.workspace, softwareSystem.identifier, person.identifier))
                    .forEach(person => new PersonElement(person).accept(visitor));

                this.workspace.model.softwareSystems
                    .filter(softwareSystem => relationshipExists(this.workspace, this.view.identifier, softwareSystem.identifier))
                    .forEach(softwareSystem => new SoftwareSystemElement(softwareSystem).accept(visitor));
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
                    }
                ];
            }
        }

        return [];
    }
}
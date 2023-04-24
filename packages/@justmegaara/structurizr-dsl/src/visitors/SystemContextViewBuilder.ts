import { Workspace } from "../workspace/Workspace";
import { relationshipExists } from "../utils";
import { IViewBuilder, ViewBuilderResult } from "./IViewBuilder";
import { IVisitor } from "./IVisitor";
import { PersonElement } from "./PersonElement";
import { SoftwareSystemElement } from "./SoftwareSystemElement";
import { RelationshipElement } from "./RelationshipElement";
import { GenericView } from "../view/GenericView";

export class SystemContextViewBuilder implements IViewBuilder {
    constructor(
        private workspace: Workspace,
        private view: GenericView,
    ) {}

    build(visitor: IVisitor): ViewBuilderResult {
        const path = [];

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

                path.push({
                    type: "System Context",
                    identifier: softwareSystem.identifier,
                    title: softwareSystem.name
                });
            });

        this.workspace.model.relationships
            .filter(edge => this.view.layout[edge.sourceIdentifier] && this.view.layout[edge.targetIdentifier])
            .forEach(relationship => new RelationshipElement(relationship).accept(visitor));
        
        return {
            viewPath: { path }
        }
    }
}
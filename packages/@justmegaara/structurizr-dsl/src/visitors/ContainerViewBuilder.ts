import { relationshipExists } from "../utils";
import { GenericView } from "../view/GenericView";
import { Workspace } from "../workspace/Workspace";
import { ContainerElement } from "./ContainerElement";
import { IViewBuilder, ViewBuilderResult } from "./IViewBuilder";
import { IVisitor } from "./IVisitor";
import { PersonElement } from "./PersonElement";
import { RelationshipElement } from "./RelationshipElement";
import { SoftwareSystemElement } from "./SoftwareSystemElement";

export class ContainerViewBuilder implements IViewBuilder {
    constructor(
        private workspace: Workspace,
        private view: GenericView,
    ) {}

    build(visitor: IVisitor): ViewBuilderResult {
        const path = [];

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

                path.push({
                    type: "System Context",
                    identifier: softwareSystem.identifier,
                    title: softwareSystem.name
                });
                path.push({
                    type: "Container",
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
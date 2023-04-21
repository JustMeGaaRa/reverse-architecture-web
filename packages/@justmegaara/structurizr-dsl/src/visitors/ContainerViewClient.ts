import { relationshipExists } from "../utils";
import { Layout } from "../view/Layout";
import { Workspace } from "../workspace/Workspace";
import { ContainerElement } from "./ContainerElement";
import { IClient } from "./IClient";
import { IVisitor } from "./IVisitor";
import { PersonElement } from "./PersonElement";
import { RelationshipElement } from "./RelationshipElement";
import { SoftwareSystemElement } from "./SoftwareSystemElement";

export class ContainerViewClient implements IClient {
    constructor(
        private workspace: Workspace,
        private layout: Layout,
        private softwareSystemIdentifier: string
    ) {}

    accept(visitor: IVisitor): void {
        this.workspace.model.softwareSystems
            .filter(softwareSystem => softwareSystem.identifier === this.softwareSystemIdentifier)
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
            .filter(edge => this.layout[edge.sourceIdentifier] && this.layout[edge.targetIdentifier])
            .forEach(relationship => new RelationshipElement(relationship).accept(visitor));
    }
}
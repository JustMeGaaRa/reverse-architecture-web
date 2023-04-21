import { Workspace } from "../workspace/Workspace";
import { relationshipExists } from "../utils";
import { IClient } from "./IClient";
import { IVisitor } from "./IVisitor";
import { PersonElement } from "./PersonElement";
import { SoftwareSystemElement } from "./SoftwareSystemElement";
import { RelationshipElement } from "./RelationshipElement";
import { Layout } from "../view/Layout";

export class SystemContextViewClient implements IClient {
    constructor(
        private workspace: Workspace,
        private layout: Layout,
        private softwareSystemIdentifier: string
    ) {}

    accept(visitor: IVisitor): void {
        // include all people that are directly connected to the current software system
        this.workspace.model.people
            .filter(person => relationshipExists(this.workspace, this.softwareSystemIdentifier, person.identifier))
            .forEach(person => new PersonElement(person).accept(visitor));

        // include the current software and all software systems
        // that are directly connected to the current software system
        this.workspace.model.softwareSystems
            .filter(softwareSystem => softwareSystem.identifier === this.softwareSystemIdentifier
                || relationshipExists(this.workspace, this.softwareSystemIdentifier, softwareSystem.identifier))
            .forEach(softwareSystem => new SoftwareSystemElement(softwareSystem).accept(visitor));
        
        this.workspace.model.relationships
            .filter(edge => this.layout[edge.sourceIdentifier] && this.layout[edge.targetIdentifier])
            .forEach(relationship => new RelationshipElement(relationship).accept(visitor));
    }
}
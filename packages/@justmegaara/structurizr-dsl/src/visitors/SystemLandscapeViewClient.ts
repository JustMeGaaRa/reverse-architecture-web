import { Layout } from "../view/Layout";
import { Workspace } from "../workspace/Workspace";
import { IClient } from "./IClient";
import { IVisitor } from "./IVisitor";
import { PersonElement } from "./PersonElement";
import { RelationshipElement } from "./RelationshipElement";
import { SoftwareSystemElement } from "./SoftwareSystemElement";

export class SystemLandscapeViewClient implements IClient {
    constructor(
        private workspace: Workspace,
        private layout: Layout
    ) {}

    accept(visitor: IVisitor): void {
        // include all people that are directly connected to the current software system
        this.workspace.model.people
            .forEach(person => new PersonElement(person).accept(visitor));

        // include the current software and all software systems
        // that are directly connected to the current software system
        this.workspace.model.softwareSystems
            .forEach(softwareSystem => new SoftwareSystemElement(softwareSystem).accept(visitor));
        
        this.workspace.model.relationships
            .filter(edge => this.layout[edge.sourceIdentifier] && this.layout[edge.targetIdentifier])
            .forEach(relationship => new RelationshipElement(relationship).accept(visitor));
    }
}
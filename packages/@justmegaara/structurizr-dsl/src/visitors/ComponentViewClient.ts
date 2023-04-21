import { relationshipExists } from "../utils";
import { Layout } from "../view/Layout";
import { Workspace } from "../workspace/Workspace";
import { ComponentElement } from "./ComponentElement";
import { ContainerElement } from "./ContainerElement";
import { IClient } from "./IClient";
import { IVisitor } from "./IVisitor";
import { PersonElement } from "./PersonElement";
import { RelationshipElement } from "./RelationshipElement";
import { SoftwareSystemElement } from "./SoftwareSystemElement";

export class ComponentViewClient implements IClient {
    constructor(
        private workspace: Workspace,
        private layout: Layout,
        private containerIdentifier: string
    ) {}

    accept(visitor: IVisitor): void {        
        this.workspace.model.softwareSystems.forEach(softwareSystem => {
            softwareSystem.containers
                .filter(container => container.identifier === this.containerIdentifier)
                .forEach(container => {
                    // include the current container and all components within it
                    new ContainerElement(container).accept(visitor);

                    container.components.forEach(component => {
                        new ComponentElement(component).accept(visitor);
                        
                        // include all people that are directly connected to the current component
                        this.workspace.model.people
                            .filter(person => relationshipExists(this.workspace, component.identifier, person.identifier))
                            .forEach(person => new PersonElement(person).accept(visitor));

                        // include all software systems that are directly connected to the current component
                        this.workspace.model.softwareSystems
                            .filter(softwareSystem => relationshipExists(this.workspace, component.identifier, softwareSystem.identifier))
                            .forEach(softwareSystem => new SoftwareSystemElement(softwareSystem).accept(visitor));

                        // include all containers that are directly connected to the current container
                        softwareSystem.containers
                            .filter(container => relationshipExists(this.workspace, component.identifier, container.identifier))
                            .forEach(container => new ContainerElement(container).accept(visitor));
                    });
                });
        });
        
        this.workspace.model.relationships
            .filter(edge => this.layout[edge.sourceIdentifier] && this.layout[edge.targetIdentifier])
            .forEach(relationship => new RelationshipElement(relationship).accept(visitor));
    }
}
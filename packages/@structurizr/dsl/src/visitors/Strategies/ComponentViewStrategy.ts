import { relationshipExists } from "../../utils/Formatting";
import { Workspace } from "../../types/Workspace";
import { IVisitor } from "../../shared/IVisitor";
import {
    ComponentElement,
    ContainerElement,
    PersonElement,
    RelationshipElement,
    SoftwareSystemElement
} from "../Elements";
import { ViewType } from "../../types/views/ViewType";
import { IViewStrategy } from "../../shared/IViewStrategy";
import { IView } from "../../shared/IView";

export class ComponentViewStrategy implements IViewStrategy {
    constructor(
        private workspace: Workspace,
        private view: IView,
    ) {}

    accept(visitor: IVisitor): void {
        this.workspace.model.softwareSystems
            .forEach(softwareSystem => {
                softwareSystem.containers
                    .filter(container => container.identifier === this.view.identifier)
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
            .filter(edge => this.view.layout[edge.sourceIdentifier] && this.view.layout[edge.targetIdentifier])
            .forEach(relationship => new RelationshipElement(relationship).accept(visitor));
    }

    getPath(): Array<IView> {
        for (let softwareSystem of this.workspace.model.softwareSystems) {
            for (let container of softwareSystem.containers) {
                if (container.identifier === this.view.identifier) {
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
                        },
                        {
                            type: ViewType.Component,
                            identifier: container.identifier,
                            title: container.name,
                            layout: {}
                        }
                    ]
                }
            }
        }

        return [];
    }
}
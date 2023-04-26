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

export class SystemLandscapeViewStrategy implements IViewStrategy {
    constructor(
        private workspace: Workspace,
        private view: IView
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
            .filter(edge => this.view.layout[edge.sourceIdentifier] && this.view.layout[edge.targetIdentifier])
            .forEach(relationship => new RelationshipElement(relationship).accept(visitor));
    }

    getPath(): Array<IView> {
        return [{
            type: ViewType.SystemLandscape,
            identifier: this.workspace.name,
            title: this.workspace.name,
            layout: {}
        }];
    }
}